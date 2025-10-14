import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeService from "../services/employeeService";
import { Employee } from "../models/employeeModel";
import { employeeSchemas } from "../validation/employeeValidation";
import { successResponse } from "../models/responseModel";

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
            employees = await employeeService.getAllEmployeesForDepartment(department.toLocaleLowerCase());

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
        const { error, value } = employeeSchemas.create.body.validate(req.body, { abortEarly: false});

        if (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Validation failed",
            details: error.details.map(d => d.message),
            });
            
            return;
        }

        const employee: Employee = value;

        await employeeService.createEmployee({ ...employee });
        res.status(HTTP_STATUS.OK).json(successResponse("Employee Created"));
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
   
        const employee: Employee | undefined = await employeeService.getEmployeeById(id);
 
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
        
        const { name, position, department, email, phone, branchId} = req.body;

        const updatedEmployee: Employee = await employeeService.updateEmployee(id, {
            name,
            position,
            department,
            email,
            phone,
            branchId,
        });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedEmployee, "Employee successfully updated"),
        );
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
        const id: string = req.params.id;

        await employeeService.deleteEmployee(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse("Employee successfully deleted")
        );
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