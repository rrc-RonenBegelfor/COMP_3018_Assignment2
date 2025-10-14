import { logRequest } from "../src/api/v1/middleware/logRequest";
import { Request, Response, NextFunction } from "express";

describe("logRequest middleware", () => {
    it("should log request details and then call next", () => {
        // Arrange
        const mockRequest = {
            method: "POST",
        } as Request;

        const mockResponse = {} as Response;
        const mockNext: NextFunction = jest.fn();

        // Act
        logRequest(mockRequest, mockResponse, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
});