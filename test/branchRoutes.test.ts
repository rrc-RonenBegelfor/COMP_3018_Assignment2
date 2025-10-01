import request from "supertest";
import response from "supertest";
import app from "../src/app";
import * as branchController from "../src/api/v1/controllers/branchController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { Branch } from "../src/data/branches";

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
            // Arrange
            await request(app).get("/api/v1/branches/");

            // Act & Assert
            expect(branchController.getAllBranches).toHaveBeenCalled();
        });

        it("should call getAllBranches and handle failure", async () => {
            // Arrange
            (branchController.getAllBranches as jest.Mock).mockImplementation((req, res) => {
               return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({}); 
            });

            // Act & Assert
            const response: response.Response = await request(app).get("/api/v1/branches/");
            expect(response.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        });
    });

    describe("POST /api/v1/branches/", () => {
        it("should call createBranch controller with valid data", async () => {
            // Arrange
            const mockBranch: Branch = {
                id: 1,
                name: "Test Name",
                address: "Test Address",
                phone: "Test Phone",
            };

            await request(app).post("/api/v1/branches/").send(mockBranch);

            // Act & Assert
            expect(branchController.createBranch).toHaveBeenCalled();
        });

        it("should call createBranch and handle failure", async () => {
            // Arrange
            (branchController.createBranch as jest.Mock).mockImplementation((req, res) => {
               return res.status(HTTP_STATUS.BAD_REQUEST).send({}); 
            });

            const response: response.Response = await request(app).post("/api/v1/branches/");

            // Act & Assert
            expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
        });
    });

    describe("PUT /api/v1/branches/:id", () => {
        it("should call updateBranch controller with valid data", async () => {
            // Arrange
            const mockBranchUpdate: Branch = {
                id: 1,
                name: "Test Name",
                address: "Test Address",
                phone: "Test Phone",
            };

            await request(app).put("/api/v1/branches/1").send(mockBranchUpdate);

            // Act & Assert
            expect(branchController.updateBranch).toHaveBeenCalled();
        });

        it("should call updateBranch and handle failure", async () => {
            // Arrange
            (branchController.updateBranch as jest.Mock).mockImplementation((req, res) => {
               return res.status(HTTP_STATUS.NOT_FOUND).send({}); 
            });

            const response: response.Response = await request(app).put("/api/v1/branches/-1");

            // Act & Assert
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        });
    });

    describe("DELETE /api/v1/branches/:id", () => {
        it("should call deleteBranch controller for the valid ID", async () => {
            // Arrange
            await request(app).delete("/api/v1/branches/1");

            // Act & Assert
            expect(branchController.deleteBranch).toHaveBeenCalled();
        });

        it("should call deleteBranch and handle failure", async () => {
            // Arrange
            (branchController.updateBranch as jest.Mock).mockImplementation((req, res) => {
               return res.status(HTTP_STATUS.NOT_FOUND).send({}); 
            });

            const response: response.Response = await request(app).put("/api/v1/branches/-1");

            // Act & Assert
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        });
    });

    describe("GET /api/v1/branches/:id", () => {
        it("shoud call getBranchById controller with provided ID", async () => {
            // Arrange
            await request(app).get("/api/v1/branches/1");

            // Act & Assert
            expect(branchController.getBranchById).toHaveBeenCalled();
        });

        it("should call getBranchById and handle failure", async () => {
            // Arrange
            (branchController.getBranchById as jest.Mock).mockImplementation((req, res) => {
               return res.status(HTTP_STATUS.NOT_FOUND).send({}); 
            });

            // Act & Assert
            const response: response.Response = await request(app).get("/api/v1/branches/-1");
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        });
    });
});

