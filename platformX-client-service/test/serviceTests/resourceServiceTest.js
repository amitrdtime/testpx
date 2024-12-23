import { expect } from "chai";
import sinon from "sinon";
import axios from "axios";
import resourceService from "../../services/resourceService.js";
import resource from "../../domain/models/resource.js";

describe("ClientService", () => {
    let axiosGetStub;

    // Mock Resources data setup
    const resources = [
        {
            OdataEtag: "W/\"JzE5OzQ3NTYwMzI2NDAyNTIxNzQyMjAxOzAwOyc=\"",
            No: "INNR000002",
            Name: "Asha",
            Name_2: "",
            Type: "Person",
            Base_Unit_of_Measure: "HOUR"
        },
        {
            OdataEtag: "W/\"JzE5OzQ3NTYwMzI2NDAyNTIxNzQyMjAxOzAwOyc=\"",
            No: "INNR000002",
            Name: "Ashish",
            Name_2: "",
            Type: "Person",
            Base_Unit_of_Measure: "HOUR"
        }
    ];

    const mokeResourcesList = resources.map(r => new resource(r));

    beforeEach(() => {
        // Stub the axios.get method
        axiosGetStub = sinon.stub(resourceService.d365API, "get");
    });

    afterEach(() => {
        // Restore the original methods
        axiosGetStub.restore();
        sinon.restore();
    });

    describe("Get Resources", () => {

        it('should return a list of resources when API call is successful', async () => {
            const mockResponse = { data: { value: mokeResourcesList } };
            axiosGetStub.resolves(mockResponse);

            const resources = await resourceService.getResources();

            expect(resources).to.be.an('array');
            expect(resources).to.have.lengthOf(2);
            expect(resources[0]).to.have.property('No', 'INNR000002');
            expect(resources[0]).to.have.property('Name', 'Asha');
            expect(axiosGetStub.calledOnce).to.be.true;
        });

        it('should log and throw an error when the API call fails', async () => {
            // Arrange
            const error = new Error('API request failed');
            axiosGetStub.rejects(error);

            // Act and Assert
            try {
                await resourceService.getResources();
                // If no error is thrown, this test will fail
                throw new Error('Expected getResources to throw');
            } catch (err) {
                // Ensure the error is the same as the one thrown
                expect(err).to.equal(error);
            }
        });
    });
});

