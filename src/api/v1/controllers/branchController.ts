import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as branchService from "../services/branchService";
import { Branch } from "../models/branchModel";
import { branchSchemas } from "../validation/branchValidation";
import { successResponse } from "../models/responseModel";

/**
 * Controller to get all branches.
 * Responds with a list of all branch objects.
 * 
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = await branchService.getAllBranches();
        res.status(HTTP_STATUS.OK).json({
            message: "Branches retrieved successfully",
            data: branches,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Controller to create a new branch.
 * Validates request body and creates a branch if valid.
 * 
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { error, value } = branchSchemas.create.body.validate(req.body, { abortEarly: false});

        if (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Validation failed",
            details: error.details.map(d => d.message),
            });
            
            return;
        }

        const branch: Branch = value;

        await branchService.createBranch({ ...branch });
        res.status(HTTP_STATUS.OK).json(successResponse("Branch Created"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Controller to get a branch by its ID.
 * Responds with the branch object if found.
 * 
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const parsedId: number = parseInt(id, 10);

        const branch: Branch | undefined = await branchService.getBranchById(parsedId);

        if (!branch) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Branch not found"
            });
        } else {
            res.status(HTTP_STATUS.OK).json({
                message: "Branch fetched",
                data: branch,
            });
        }
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Controller to update a branch by its ID.
 * Updates branch details and responds with the updated object.
 * 
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const parsedId = parseInt(id, 10);

        const { name, address, phone } = req.body;

        const updatedBranch: Branch = await branchService.updateBranch(parsedId, { name, address, phone });

        res.status(HTTP_STATUS.OK).json({
            message: "Branch updated successfully",
            data: updatedBranch,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Controller to delete a branch by its ID.
 * Responds with the deleted branch object.
 * 
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const parsedId: number = parseInt(id, 10);

        const deletedBranch: Branch | undefined = await branchService.getBranchById(parsedId);

        await branchService.deleteBranch(parsedId);

        res.status(HTTP_STATUS.OK).json({
            message: "Branch deleted successfully",
            data: deletedBranch,
        });
    } catch (error: unknown) {
        next(error);
    }
};