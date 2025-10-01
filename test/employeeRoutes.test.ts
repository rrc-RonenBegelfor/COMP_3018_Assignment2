import request from "supertest";
import app from "../src/app";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

jest.mock("../src/api/v1/controllers/employeeController", () => ({
    getAllEmployees: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    updateEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getEmployeeById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getAllEmployeesForBranch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send())
}));

describe("Employee Routs", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/employees/", () => {
        it("should call getAllEmployees controller", async () => {
            await request(app).get("/api/v1/employees/");
            expect(employeeController.getAllEmployees).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/employees/", () => {
        it("should call createEmployee controller with valid data", async () => {
            const mockEmployee = {
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
            };

            await request(app).post("/api/v1/employees/").send(mockEmployee);
            expect(employeeController.createEmployee).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/employees/:id", () => {
        it("should call updateEmployee controller with valid data", async () => {
            const mockEmployeeUpdate = {
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
            };

            await request(app).put("/api/v1/employees/1").send(mockEmployeeUpdate);
            expect(employeeController.updateEmployee).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/employees/:id", () => {
        it("should call deleteEmployee controller for the valid ID", async () => {
            await request(app).delete("/api/v1/employees/1");
            expect(employeeController.deleteEmployee).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees/:id", () => {
        it("shoud call getEmployeeById controller with provided ID", async () => {
            await request(app).get("/api/v1/employees/1");
            expect(employeeController.getEmployeeById).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees?department=", () => {
        it("should call getAllEmployees controller has a department query", async () => {
            await request(app).get("/api/v1/employees?department=test");
            expect(employeeController.getAllEmployees).toHaveBeenCalled();
        });
    });
});

