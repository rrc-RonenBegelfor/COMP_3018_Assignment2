import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";
import { Branch } from "../src/data/branches";
// import { mock } from "node:test";

jest.mock("../src/api/v1/services/branchService");

describe("Branch Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();

        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe("getAllBranches", () => {
        it("should handle a successful operation", async () => {
            // Arrange
            const mockBranch: Branch[] = [
                {
                    id: 1,
                    name: "Test Location",
                    address: "Test Address",
                    phone: "Test Phone"
                },
            ];

            (branchService.getAllBranches as jest.Mock).mockReturnValue(mockBranch);

            // Act
            await branchController.getAllBranches(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branches retrieved successfully",
                data: mockBranch,
            });
        });

        it("should handle an error while also calling next", async () => {
            // Arrange
            const mockError = new Error("Mock error");

            (branchService.getAllBranches as jest.Mock).mockRejectedValue(mockError);

            // Act
            await branchController.getAllBranches(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe("createBranch", () => {
        it("should handle a successful creation", async () => {
            // Arrange
            const mockBody = {
                name: "Test",
                address: "Test",
                phone: "Test",
            };

            const mockBranch: Branch = {
                id: 1,
                ...mockBody
            };

            mockReq.body = mockBody;
            (branchService.createBranch as jest.Mock).mockReturnValue(mockBranch);

            // Act
            await branchController.createBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch created successfully",
                data: mockBranch,
            });
        });

        describe("should return a bad request and the reason when missing parameters", () => {
            it("should prompt that name is missing", async () => {
                // Arrange
                const mockBodyNoName = {
                    address: "Test",
                    phone: "Test",
                };

                mockReq.body = mockBodyNoName;

                // Act
                await branchController.createBranch(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext as NextFunction
                );

                // Assert
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    message: "Branch name is required",
                });
            });
                
            it("should prompt that address is missing", async () => {
                // Arrange
                const mockBodyNoAddress = {
                    name: "Test",
                    phone: "Test",
                };

                mockReq.body = mockBodyNoAddress

                // Act
                await branchController.createBranch(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext as NextFunction
                );

                // Assert
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    message: "Branch address is required",
                });
            });

            it("should prompt that phone is missing", async () => { 
                // Arrange
                const mockBodyNoPhone = {
                    name: "Test",
                    address: "Test",
                };

                mockReq.body = mockBodyNoPhone

                // Act
                await branchController.createBranch(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext as NextFunction
                );

                // Assert
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    message: "Branch phone is required",
                });
            }); 
        });
    });

    describe("updateBranch", () => {
        it("should update a branch successfully", async () => {
            // Arrange
            const mockBody = {
                name: "Test",
            };

            const mockId: string = "1";
            const mockBranch: Branch = {
                id: 1,
                name: "Test",
                address: "Test",
                phone: "Test",
            };

            mockReq.params = { id: mockId };
            mockReq.body = mockBody;
            (branchService.updateBranch as jest.Mock).mockReturnValue(mockBranch);

            // Act
            await branchController.updateBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch updated successfully",
                data: mockBranch,
            });
        });

        it("should handle an error while also calling next", async () => {
            // Arrange
            const mockError = new Error("Mock error");

            (branchService.updateBranch as jest.Mock).mockRejectedValue(mockError);

            // Act
            await branchController.updateBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext as NextFunction
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });
});