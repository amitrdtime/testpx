import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import Models from "../../domain/models/clientMockDataModel.js"; // Import the default export object

const { Client } = Models;
const { Project } = Models;

class MockRepository {
    constructor() {
        if (MockRepository.instance) {
            return MockRepository.instance;
        }

        // Get the current file's directory
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        // Path to the JSON file
        this.filePath = path.join(__dirname, '../mockData/clients.json');

        // Initialize the data and clients properties
        this.data = null;
        this.clients = [];

        // Initialize the instance
        this.init();

        MockRepository.instance = this;
    }

    async init() {
        try {
            await this.loadData();
            this.dataDetails = this.data;
            this.clients = (this.data || []).map(clientData => new Client(clientData.Client));
        } catch (error) {
            console.error('Error initializing MockRepository:', error);
        }
    }

    async loadData() {
        try {
            const fileContent = await fs.readFile(this.filePath, 'utf8');
            this.data = JSON.parse(fileContent);
        } catch (error) {
            console.error('Error loading data:', error);
            this.data = {}; // Ensure this.data is initialized even if reading fails
        }
    }

    saveData() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    }

    async getClients() {
        if (this.clients.length === 0) {
            await this.init(); // Ensure data is loaded and clients are mapped
        }
        return this.clients;
    }

    async getClientById(id) {
        if (this.clients.length === 0) {
            await this.init(); // Ensure data is loaded and clients are mapped
        }
        return this.clients.find(client => client.id === id);
    }

    async addClient(newClient) {
        const id = newClient.id || uuidv4();
        const number = newClient.number || (await this.getNextClientNumber()).toString();
        const etag = this.generateEtag();

        const clientData = { ...newClient, id, number, odataEtag: etag };

        this.clients.push(new Client(clientData));
        this.data.push(clientData); // Also update the data store

        // this.saveData(); // Save the updated data
        return clientData;
    }

    async updateClient(id, updates) {
        // Ensure initialization is complete
        if (this.clients.length === 0) {
            await this.init(); // Ensure data is loaded and clients are mapped
        }

        // Find client by id
        const clientIndex = this.data.findIndex(client => client.id === id);

        if (clientIndex === -1) {
            return null; // Client not found
        }

        // Update the client in the data store
        this.data[clientIndex] = { ...this.data[clientIndex], ...updates };

        // Update the client in the in-memory store
        const clientToUpdate = this.clients.find(client => client.id === id);
        Object.assign(clientToUpdate, updates);

        // this.saveData(); // Save changes to file
        return this.data[clientIndex];
    }

    async getNextClientNumber() {
        if (this.clients.length === 0) {
            await this.init(); // Ensure data is loaded and clients are mapped
        }
        if (!this.clients.length) return 1;

        const highestNumber = Math.max(...this.clients.map(client => parseInt(client.number, 10)));
        return highestNumber + 1;
    }

    generateEtag() {
        const hash = crypto.createHash('sha1');
        hash.update(uuidv4());
        return `W/"${hash.digest('base64')}"`;
    }

    async getProjectByProjectNo(clientno, sowno, projectno) {
        let projectData = new Project();

        if (this.data === null || this.data.length === 0) {
            await this.init();
        }

        let client = this.data
            .flatMap(dataDetail => dataDetail.Client)
            .filter(client => client.number === clientno);

        if (client) {
            const sow = client[0].sows.filter(sow => sow.sowNo === sowno);

            if (sow) {
                const project = sow[0].projects.filter(p => p.projectNo === projectno);
                projectData = project.map(projectData => new Project(projectData));                
                }
            }
            return projectData;
        }
    }
    
    export default new MockRepository(); // Export a single instance
    