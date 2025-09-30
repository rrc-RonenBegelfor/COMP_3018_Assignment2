import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeService from "../services/employeeService";
 import { Employee } from "../../../data/employees";

 export const getAllEmployees = async (
     req: Request,
     res: Response,
     next: NextFunction
 ): Promise<void> => {
     try {
         const employees: Employee[] = await employeeService.getAllEmployees();
         res.status(HTTP_STATUS.OK).json({
             message: "Employees retrieved successfully",
             data: employees,
         });
     } catch (error: unknown) {
         next(error);
     }
 };
 
 export const createEmployee = async (
     req: Request,
     res: Response,
     next: NextFunction
 ): Promise<void> => {
     try {
        if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee name is required",
            });
        } else if (!req.body.position) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee position is required",
            });
        } else if (!req.body.department) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee department is required",
            });
        } else if (!req.body.email) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee email is required",
            });
        } else if (!req.body.phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee phone is required",
            });
        } else if (!req.body.branchId) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee branchId is required",
            });
        } else {
            const { name, position, department, email, phone, branchId} = req.body;
 
            const newEmployee: Employee = await employeeService.createEmployee({ name, position, department, email, phone, branchId});
            res.status(HTTP_STATUS.CREATED).json({
                message: "Employee successfully added",
                data: newEmployee,
            });
         }
     } catch (error: unknown) {
         next(error);
     }
 };
 
 export const getEmployeeById = async (
     req: Request,
     res: Response,
     next: NextFunction
 ): Promise<void> => {
     try {
         const { id } = req.params;
         const parsedId = parseInt( id, 10);
 
         const employee = await employeeService.getEmployeeById(parsedId);
 
         if (!employee) {
             res.status(HTTP_STATUS.NOT_FOUND).json({
                 message: "Employee not found"
             });
         } else {
             res.status(HTTP_STATUS.OK).json({
                 message: "Employee fetched",
                 data: employee,
             });
         }
     } catch (error: unknown) {
         next(error);
     }
 };
 
 export const updateEmployee = async (
     req: Request,
     res: Response,
     next: NextFunction
 ): Promise<void> => {
     try {
         const { id } = req.params;
         const parsedId = parseInt( id, 10);
 
         const { name, address, phone} = req.body;
 
         const updatedEmployee: Employee = await employeeService.updateEmployee(parsedId, { name, address, phone});
 
         res.status(HTTP_STATUS.OK).json({
             message: "Employee updated successfully",
             data: updatedEmployee,
         });
     } catch (error: unknown) {
         next(error);
     }
 };
 
 export const deleteEmployee = async (
     req: Request,
     res: Response,
     next: NextFunction
 ): Promise<void> => {
     try {
         const id: string = req.params.id;
 
         await employeeService.deleteEmployee(id);
 
         res.status(HTTP_STATUS.OK).json({
             message: "Employee deleted successfully",
         });
     } catch (error: unknown) {
         next(error);
     }
 };