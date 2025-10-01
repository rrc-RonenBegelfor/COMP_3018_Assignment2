import request from "supertest";
import app from "../src/app";
import * as branchController from "../src/api/v1/controllers/branchController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

jest.mock("../src/api/v1/controllers/branchController", () => ({
    getAllBranches: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createBranch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    updateBranch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteBranch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getBranchById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Branch Routs", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/branches/", () => {
        it("should call getAllBranches controller", async () => {
            await request(app).get("/api/v1/branches/");
            expect(branchController.getAllBranches).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/branches/", () => {
        it("should call createBranch controller with valid data", async () => {
            const mockBranch = {
                name: "Test Name",
                address: "Test Address",
                phone: "Test Phone",
            };

            await request(app).post("/api/v1/branches/").send(mockBranch);
            expect(branchController.createBranch).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/branches/:id", () => {
        it("should call updateBranch controller with valid data", async () => {
            const mockBranchUpdate = {
                name: "Test Name",
                address: "Test Address",
                phone: "Test Phone",
            };

            await request(app).put("/api/v1/branches/1").send(mockBranchUpdate);
            expect(branchController.updateBranch).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/branches/:id", () => {
        it("should call deleteBranch controller for the valid ID", async () => {
            await request(app).delete("/api/v1/branches/1");
            expect(branchController.deleteBranch).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/branches/:id", () => {
        it("shoud call getBranchById controller with provided ID", async () => {
            await request(app).get("/api/v1/branches/1");
            expect(branchController.getBranchById).toHaveBeenCalled();
        });
    });
});

