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
        
        // https://stackoverflow.com/questions/49835264/how-to-properly-make-mock-throw-an-error-in-jest
        it("should call getAllEmployees and handle failure", async () => {

            (employeeController.getAllEmployees as jest.Mock).mockImplementation((req, res) => {
               return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({}); 
            });

            const response = await request(app).get("/api/v1/employees/");
            expect(response.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
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

        it("should call createEmployee and handle failure", async () => {

            (employeeController.createEmployee as jest.Mock).mockImplementation((req, res) => {
               return res.status(HTTP_STATUS.BAD_REQUEST).send({}); 
            });

            // Could add an empty array/object and send as an empty body, both would return '400'.
            const response = await request(app).post("/api/v1/employees/");
            expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
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

        it("should call updateEmployee and handle failure", async () => {

            (employeeController.updateEmployee as jest.Mock).mockImplementation((req, res) => {
               return res.status(HTTP_STATUS.NOT_FOUND).send({}); 
            });

            const response = await request(app).put("/api/v1/employees/-1");
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        });
    });

    describe("DELETE /api/v1/employees/:id", () => {
        it("should call deleteEmployee controller for the valid ID", async () => {
            await request(app).delete("/api/v1/employees/1");
            expect(employeeController.deleteEmployee).toHaveBeenCalled();
        });

        it("should call deleteEmployee and handle failure", async () => {

            (employeeController.deleteEmployee as jest.Mock).mockImplementation((req, res) => {
               return res.status(HTTP_STATUS.NOT_FOUND).send({}); 
            });

            const response = await request(app).put("/api/v1/employees/-1");
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        });
    });

    describe("GET /api/v1/employees/:id", () => {
        it("shoud call getEmployeeById controller with provided ID", async () => {
            await request(app).get("/api/v1/employees/1");
            expect(employeeController.getEmployeeById).toHaveBeenCalled();
        });

        it("should call getEmployeeById and handle failure", async () => {

            (employeeController.getEmployeeById as jest.Mock).mockImplementation((req, res) => {
               return res.status(HTTP_STATUS.NOT_FOUND).send({}); 
            });

            const response = await request(app).put("/api/v1/employees/-1");
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        });
    });

    describe("GET /api/v1/employees?department=", () => {
        it("should call getAllEmployees controller has a department query", async () => {
            await request(app).get("/api/v1/employees?department=test");
            expect(employeeController.getAllEmployees).toHaveBeenCalled();
        });

        it("should call getAllEmployees with department query and handle failure", async () => {

            (employeeController.getAllEmployees as jest.Mock).mockImplementation((req, res) => {
               return res.status(HTTP_STATUS.NOT_FOUND).send({}); 
            });

            const response = await request(app).put("/api/v1/employees?department=test");
            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
        });
    });
});

