import { expect } from "chai";
import request from "supertest";
import express from "express";
import resourceRoutes from "../../routes/resourceRoute.js";
import resourceService from "../../services/resourceService.js";
import sinon from "sinon";
import camelcaseConverter from "../../helper/camelcaseConverter.js";
import resource from "../../domain/models/resource.js";

const app = express();
app.use(express.json());
app.use("/api/resources", resourceRoutes);

describe("resourceController", () => {

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

    let resourceStub;

    afterEach(() => {
        // Restore the original method after each test
        if (resourceStub) {
            resourceStub.restore();
        }
    });

    describe("GET /api/resources", () => {
        it("should return resources when they are found", async () => {

            resourceStub = sinon.stub(resourceService, "getResources").resolves(mokeResourcesList);

            const res = await request(app).get("/api/resources");
            const expectedResponse =
                camelcaseConverter.keysToCamelCase(mokeResourcesList);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
            expect(res.body).to.deep.equal(expectedResponse);
        });

        it("should return 404 when no resources are found", async () => {
            resourceStub = sinon.stub(resourceService, "getResources").resolves([]);

            const res = await request(app).get("/api/resources");

            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ error: "No resources found" });
        });

        it("should return 500 for internal server error", async () => {
            const error = new Error("Internal Server Error");
            resourceStub = sinon.stub(resourceService, "getResources").rejects(error);

            const res = await request(app).get("/api/resources");

            expect(res.status).to.equal(500);
            expect(res.body).to.deep.equal({ error: "Internal Server Error" });
        });
    });
});

