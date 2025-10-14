import Joi from "joi";
import { BranchRequestModel } from "../models/branchRequestModel";

export const branchSchemas = {
    create: {
        body: Joi.object<BranchRequestModel>({
            name: Joi.string().required().min(3).messages({
                "string.base": "Branch name must be a type of string",
                "string.empty": "Branch name cannot be empty",
                "string.min": `Branch name should have a minimum length of 3`,
                "any.required": "Brach name is required",
            }),
            address: Joi.string().required().min(3).messages({
                "string.base": "Branch address must be a type of string",
                "string.empty": "Branch address cannot be empty",
                "string.min": `Branch address should have a minimum length of 3`,
                "any.required": "Brach address is required",
            }),
            phone: Joi.string().required().min(3).messages({
                "string.base": "Branch phone must be a type of string",
                "string.empty": "Branch phone cannot be empty",
                "string.min": `Branch phone should have a minimum length of 3`,
                "any.required": "Brach phone is required",
            }),
        }),
    },
    update: {
        body: Joi.object<BranchRequestModel>({
            name: Joi.string().required().min(3).messages({
                "string.base": "Branch name must be a type of string",
                "string.empty": "Branch name cannot be empty",
                "string.min": `Branch name should have a minimum length of 3`,
                "any.required": "Brach name is required",
            }),
            address: Joi.string().required().min(3).messages({
                "string.base": "Branch address must be a type of string",
                "string.empty": "Branch address cannot be empty",
                "string.min": `Branch address should have a minimum length of 3`,
                "any.required": "Brach address is required",
            }),
            phone: Joi.string().required().min(3).messages({
                "string.base": "Branch phone must be a type of string",
                "string.empty": "Branch phone cannot be empty",
                "string.min": `Branch phone should have a minimum length of 3`,
                "any.required": "Brach phone is required",
            }),
        }).min(1),
    },
};