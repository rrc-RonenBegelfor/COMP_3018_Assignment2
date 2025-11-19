import Joi, { ObjectSchema } from "joi";
import { EmployeeRequestModel } from "../models/employeeRequestModel";

/**
 * @openapi
 * components:
 *   schemas:
 *     EmployeeRequest:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           description: Full name of the employee
 *           example: "John Smith"
 *         position:
 *           type: string
 *           minLength: 3
 *           description: Job position of the employee
 *           example: "Senior Developer"
 *         department:
 *           type: string
 *           minLength: 3
 *           description: Department of the employee
 *           example: "Engineering"
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the employee
 *           example: "john.smith@company.com"
 *         phone:
 *           type: string
 *           minLength: 3
 *           description: Phone number of the employee
 *           example: "+1-555-0123"
 *         branchId:
 *           type: number
 *           description: ID of the branch the employee belongs to
 *           example: 1
 *     Employee:
 *       allOf:
 *         - $ref: '#/components/schemas/EmployeeRequest'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Unique identifier for the employee
 *               example: "emp_123abc"
 *           required:
 *             - id
 *     ValidationError:
 *       type: object
 *       required:
 *         - error
 *         - message
 *       properties:
 *         error:
 *           type: string
 *           description: Error type or code
 *           example: "VALIDATION_ERROR"
 *         message:
 *           type: string
 *           description: Human-readable error message
 *           example: "Validation failed"
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "email"
 *               issue:
 *                 type: string
 *                 example: "Employee email must be a valid email"
 *           description: Detailed validation errors
 */
export const employeeSchemas: {
    create: {
        body: ObjectSchema<EmployeeRequestModel>;
    };
    update: {
            body: ObjectSchema<EmployeeRequestModel>;
    };
} = {
    create: {
        body: Joi.object<EmployeeRequestModel>({
            name: Joi.string().trim().required().min(3).messages({
                "string.base": "Employee name must be a type of string",
                "string.empty": "Employee name cannot be empty",
                "string.min": "Employee name should have a minimum length of 3",
                "any.required": "Employee name is required",
            }),
            position: Joi.string().trim().required().min(3).messages({
                "string.base": "Employee position must be a type of string",
                "string.empty": "Employee position cannot be empty",
                "string.min": "Employee position should have a minimum length of 3",
                "any.required": "Employee position is required",
            }),
            department: Joi.string().trim().required().min(3).messages({
                "string.base": "Employee department must be a type of string",
                "string.empty": "Employee department cannot be empty",
                "string.min": "Employee department should have a minimum length of 3",
                "any.required": "Employee department is required",
            }),
            email: Joi.string().trim().required().email().messages({
                "string.base": "Employee email must be a type of string",
                "string.empty": "Employee email cannot be empty",
                "string.email": "Employee email must be a valid email",
                "any.required": "Employee email is required",
            }),
            phone: Joi.string().trim().required().min(3).messages({
                "string.base": "Employee phone must be a type of string",
                "string.empty": "Employee phone cannot be empty",
                "string.min": "Employee phone should have a minimum length of 3",
                "any.required": "Employee phone is required",
            }),
            branchId: Joi.number().greater(0).required().messages({
                "number.base": "Employee branchId must be a number",
                "number.empty": "Employee branchId cannot be empty",
                "any.required": "Employee branchId is required",
            }),
        }),
    },
    update: {
        body: Joi.object<EmployeeRequestModel>({
            name: Joi.string().trim().min(3).messages({
                "string.base": "Employee name must be a type of string",
                "string.empty": "Employee name cannot be empty",
                "string.min": "Employee name should have a minimum length of 3",
            }),
            position: Joi.string().trim().min(3).messages({
                "string.base": "Employee position must be a type of string",
                "string.empty": "Employee position cannot be empty",
                "string.min": "Employee position should have a minimum length of 3",
            }),
            department: Joi.string().trim().min(3).messages({
                "string.base": "Employee department must be a type of string",
                "string.empty": "Employee department cannot be empty",
                "string.min": "Employee department should have a minimum length of 3",
            }),
            email: Joi.string().trim().email().messages({
                "string.base": "Employee email must be a type of string",
                "string.empty": "Employee email cannot be empty",
                "string.email": "Employee email must be a valid email",
            }),
            phone: Joi.string().trim().min(3).messages({
                "string.base": "Employee phone must be a type of string",
                "string.empty": "Employee phone cannot be empty",
                "string.min": "Employee phone should have a minimum length of 3",
            }),
            branchId: Joi.number().greater(0).messages({
                "number.base": "Employee branchId must be a number",
                "number.empty": "Employee branchId cannot be empty",
            }),
        }).min(1).required().messages({
                "object.min": "At least one attribute must be changed when updating",
        }),
    },
};