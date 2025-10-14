import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";
import { Employee } from "../src/api/v1/models/employeeModel";

jest.mock("../src/api/v1/services/employeeService");

describe("Employee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        
        /*
        * I am using getAllEmployees to query, so I had to ensure I mock the query for employeeController.
        */
        mockReq = { params: {}, body: {}, query: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe("getAllEmployees", () => {
        it("should handle a successful operation", async () => {
            // Arrange
            const mockEmployee: Employee[] = [
                {
                    id: "1",
                    name: "Test Name",
                    position: "Test Position",
                    department: "Test Department",
                    email: "Test Email",
                    phone: "Test Phone",
                    branchId: 1,
                },
            ];

            (employeeService.getAllEmployees as jest.Mock).mockReturnValue(mockEmployee);

            // Act
            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees retrieved successfully",
                data: mockEmployee,
            });
        });

        it("should handle a successful operation if department queried", async () => {
            // Arrange
            const mockEmployee: Employee[] = [
                {
                    id: "1",
                    name: "Test Name",
                    position: "Test Position",
                    department: "Test Department",
                    email: "Test Email",
                    phone: "Test Phone",
                    branchId: 1,
                },
            ];

            mockReq.query = { department: "Test Department" };

            (employeeService.getAllEmployeesForDepartment as jest.Mock).mockResolvedValue(mockEmployee);

            // Act
            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees retrieved successfully",
                data: mockEmployee,
            });
        });

        it("should handle an error while also calling next", async () => {
            // Arrange
            const mockError: Error = new Error("Mock error");

            (employeeService.getAllEmployees as jest.Mock).mockRejectedValue(mockError);

            // Act
            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe("createEmployee", () => {
        it("should handle a successful creation", async () => {
            // Arrange
            const mockBody = {
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "testemail@gmail.com",
                phone: "Test Phone",
                branchId: 1,
            };

            const mockEmployee: Employee = {
                id: "1",
                ...mockBody
            };

            mockReq.body = mockBody;
            (employeeService.createEmployee as jest.Mock).mockReturnValue(mockEmployee);

            // Act
            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                data: "Employee Created",
                message: undefined,
                status: "success",
            });
        });

        describe("should return a bad request and the reason when missing parameters", () => {
            it("should prompt that name is missing", async () => {
                // Arrange
                const mockBodyNoName = {};

                mockReq.body = mockBodyNoName;

                // Act
                await employeeController.createEmployee(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext as NextFunction
                );

                // Assert
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    details: [
                        "Employee name is required",
                        "Employee position is required",
                        "Employee department is required",
                        "Employee email is required",
                        "Employee phone is required",
                        "Employee branchId is required",
                    ],
                    message: "Validation failed",
                });
            });
        });
    });

    describe("updateEmployee", () => {
        it("should update a employee successfully", async () => {
            // Arrange
            const mockBody = {
                name: "Test Name Update",
            };

            const mockId: string = "1";
            const mockEmployee: Employee = {
                id: "1",
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: 1,
            };

            mockReq.params = { id: mockId };
            mockReq.body = mockBody;
            (employeeService.updateEmployee as jest.Mock).mockReturnValue(mockEmployee);

            // Act
            await employeeController.updateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                data: {
                    "branchId": 1,
                    "department": "Test Department",
                    "email": "Test Email",
                    "id": "1",
                    "name": "Test Name",
                    "phone": "Test Phone",
                    "position": "Test Position",
                },
                message: "Employee successfully updated",
                status: "success",
            });
        });

        it("should handle an error while also calling next", async () => {
            // Arrange
            const mockError: Error = new Error("Mock error");

            (employeeService.updateEmployee as jest.Mock).mockRejectedValue(mockError);

            // Act
            await employeeController.updateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe("deleteEmployee", () => {
        it("should successfully delete mock data", async () => {
            // Arrange
            const mockId: string =  "1";
            mockReq.params = { id: mockId };

            (employeeService.deleteEmployee as jest.Mock).mockReturnValue(undefined);

            // Act
            await employeeController.deleteEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                data: "Employee successfully deleted",
                message: undefined,
                status: "success",
            });
        });

        it("should handle an error while also calling next", async () => {
            // Arrange
            const mockError: Error = new Error("Mock error");

            (employeeService.deleteEmployee as jest.Mock).mockRejectedValue(mockError);

            // Act
            await employeeController.deleteEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe("getEmployeeById", () => {
        it("should fetch employe based on id", async () => {
            // Arrange
            const mockId: string = "1";
            const mockEmployee: Employee = {
                id: "1",
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: 1,
            };

            mockReq.params = { id: mockId };

            (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(mockEmployee);

            // Act
            await employeeController.getEmployeeById(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee fetched",
                data: mockEmployee,
            });
        });

        it("should return message that employe was not found", async () => {
            // Arrange
            const mockId: string = "1";

            mockReq.params = { id: mockId};

            (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(undefined);

            // Act
            await employeeController.getEmployeeById(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee not found",
            });
        });
    });

    describe("getEmployeeForBranch", () => {
        it("should fetch employe based on id", async () => {
            // Arrange
            const mockId: string = "1";
            const mockEmployee: Employee[] = [{
                id: "1",
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: 1,
            }];

            mockReq.params = { branchId: mockId };

            (employeeService.getAllEmployeesForBranch as jest.Mock).mockResolvedValue(mockEmployee);

            // Act
            await employeeController.getAllEmployeesForBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: `Fetched all employees from requested branch, branch ID ${mockId}`,
                data: mockEmployee,
            });
        });

        it("should handle an error while also calling next", async () => {
            // Arrange
            const mockError: Error = new Error("Mock error");

            (employeeService.getAllEmployeesForBranch as jest.Mock).mockRejectedValue(mockError);

            // Act
            await employeeController.getAllEmployeesForBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });
    describe("Joi employee schema validation", () => {
        it("should return what is missing", async () => {
            // Arrange
            const mockBody = {
                name: "",
                position: "Te",
                department: "Test",
                email: "Test",
                phone: "",
                branchId: 1,
            };

            const mockEmployee: Employee = {
                id: "1",
                ...mockBody
            };

            mockReq.body = mockBody;
            (employeeService.createEmployee as jest.Mock).mockReturnValue(mockEmployee);

            // Act
            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                details: [
                    "Employee name cannot be empty",
                    "Employee position should have a minimum length of 3",
                    "Employee email must be a valid email",
                    "Employee phone cannot be empty",
                ],
                message: "Validation failed",
            }); 
        });
    });
});