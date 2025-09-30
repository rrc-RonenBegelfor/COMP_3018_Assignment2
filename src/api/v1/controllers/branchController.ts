import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as branchService from "../services/branchService";
import { Branch } from "../../../data/branches";
import { json } from "stream/consumers";

export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = await branchService.getAllBranches();
        res.status(HTTP_STATUS.OK).json({
            message: "Items retrieved successfully",
            data: branches,
        });
    } catch (error: unknown) {
        next(error);
    }
};

export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Branch name is required",
            });
        } else if (!req.body.address) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Branch address is required",
            });
        } else if (!req.body.phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Branch phone is required",
            });
        } else {
            const { name, address, phone} = req.body;

            const newBranch: Branch = await branchService.createBranch({ name, address, phone});
            res.status(HTTP_STATUS.CREATED).json({
                message: "Branch created successfully",
                data: newBranch,
            });
        }
    } catch (error: unknown) {
        next(error);
    }
};

export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const parsedId = parseInt( id, 10);

        const branch = await branchService.getBranchById(parsedId);

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

export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const parsedId = parseInt( id, 10);

        const { name, address, phone} = req.body;

        const updatedBranch: Branch = await branchService.updateBranch(parsedId, { name, address, phone});

        res.status(HTTP_STATUS.OK).json({
            message: "Branch updated successfully",
            data: updatedBranch,
        });
    } catch (error: unknown) {
        next(error);
    }
};

export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await branchService.deleteBranch(id);

        res.status(HTTP_STATUS.OK).json({
            message: "Branch deleted successfully",
        });
    } catch (error: unknown) {
        next(error);
    }
};

export const getAllEmployeesForBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const parsedId = parseInt( id, 10);
        
        const employees = await branchService.getAllEmployeesForBranch(parsedId);

        res.status(HTTP_STATUS.OK).json({
            message: "Fetched all employees in requested branch",
            data: employees,
        });
    } catch (error: unknown) {
        next(error);
    }
};