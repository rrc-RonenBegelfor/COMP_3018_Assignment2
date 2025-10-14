import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeService from "../services/employeeService";
import { Employee } from "../models/employeeModel";

/**
 * Controller to get all employees.
 * Responds with a list of all employee objects.
 * 
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 * 
 * Added functionality to filter by department if a query parameter is provided.
*/
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { department } = req.query;

        let employees: Employee[];
        
        if (typeof department === "string") {
            employees = await employeeService.getAllEmployeesForDepartment(department);

            // Had to add this in so my route test would work properly.
            if (employees.length === 0) {
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    department: department,
                    data: [],
                });
            }
        } else {    
            employees = await employeeService.getAllEmployees();
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Employees retrieved successfully",
            data: employees,
        });
    } catch (error: unknown) {
        next(error);
    }
};
 
/**
 * Controller to create a new employee.
 * Validates request body and creates an employee if valid.
 * 
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
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
                message: "Employee created successfully",
                data: newEmployee,
            });
        }
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Controller to get an employee by their ID.
 * Responds with the employee object if found.
 * 
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const parsedId: number = parseInt(id, 10);
 
        const employee: Employee | undefined = await employeeService.getEmployeeById(parsedId);
 
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

/**
 * Controller to update an employee by their ID.
 * Updates employee details and responds with the updated object.
 * 
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const parsedId: number = parseInt(id, 10);

        const { name, position, department, email, phone, branchId } = req.body;

        const updatedEmployee: Employee = await employeeService.updateEmployee(parsedId, { name, position, department, email, phone, branchId });

        res.status(HTTP_STATUS.OK).json({
            message: "Employee updated successfully",
            data: updatedEmployee,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Controller to delete an employee by their ID.
 * Responds with the deleted employee object.
 * 
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const  { id } = req.params;
        const parsedId: number = parseInt(id, 10);

        const deletedEmployee: Employee | undefined = await employeeService.getEmployeeById(parsedId);  

        await employeeService.deleteEmployee(parsedId);       

        res.status(HTTP_STATUS.OK).json({
            message: "Employee deleted successfully",
            data: deletedEmployee,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Controller to get all employees for a specific branch.
 * Responds with a list of employees belonging to the branch.
 * 
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllEmployeesForBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { branchId } = req.params;
        const parsedId: number = parseInt(branchId, 10);
        
        const employees = await employeeService.getAllEmployeesForBranch(parsedId);

        res.status(HTTP_STATUS.OK).json({
            message: `Fetched all employees from requested branch, branch ID ${parsedId}`,
            data: employees,
        });
    } catch (error: unknown) {
        next(error);
    }
};