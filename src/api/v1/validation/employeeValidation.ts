import Joi from "joi";
import { EmployeeRequestModel } from "../models/employeeRequestModel";

export const employeeSchemas = {
    create: {
        body: Joi.object<EmployeeRequestModel>({
            name: Joi.string().required().min(3).messages({
                "string.base": "Employee name must be a type of string",
                "string.empty": "Employee name cannot be empty",
                "string.min": `Employee name should have a minimum length of 3`,
                "any.required": "Employee name is required",
            }),
            position: Joi.string().required().min(3).messages({
                "string.base": "Employee position must be a type of string",
                "string.empty": "Employee position cannot be empty",
                "string.min": `Employee position should have a minimum length of 3`,
                "any.required": "Employee position is required",
            }),
            department: Joi.string().required().min(3).messages({
                "string.base": "Employee department must be a type of string",
                "string.empty": "Employee department cannot be empty",
                "string.min": `Employee department should have a minimum length of 3`,
                "any.required": "Employee department is required",
            }),
            email: Joi.string().required().email().messages({
                "string.base": "Employee email must be a type of string",
                "string.empty": "Employee email cannot be empty",
                "string.email": "Employee email must be a valid email",
                "any.required": "Employee email is required",
            }),
            phone: Joi.string().required().min(3).messages({
                "string.base": "Employee phone must be a type of string",
                "string.empty": "Employee phone cannot be empty",
                "string.min": `Employee phone should have a minimum length of 3`,
                "any.required": "Employee phone is required",
            }),
            branchId: Joi.number().required().messages({
                "number.base": "Employee branchId must be a number",
                "number.empty": "Employee branchId cannot be empty",
                "any.required": "Employee branchId is required",
            }),
        }),
    },
};