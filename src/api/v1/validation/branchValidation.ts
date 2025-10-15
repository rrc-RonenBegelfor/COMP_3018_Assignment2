import Joi, { ObjectSchema } from "joi";
import { BranchRequestModel } from "../models/branchRequestModel";

export const branchSchemas: {
    create: {
        body: ObjectSchema<BranchRequestModel>;
    };
    update: {
        body: ObjectSchema<BranchRequestModel>;
    };
} = {
    create: {
        body: Joi.object<BranchRequestModel>({
            name: Joi.string().trim().required().min(3).messages({
                "string.base": "Branch name must be a type of string",
                "string.empty": "Branch name cannot be empty",
                "string.min": "Branch name should have a minimum length of 3",
                "any.required": "Branch name is required",
            }),
            address: Joi.string().trim().required().min(3).messages({
                "string.base": "Branch address must be a type of string",
                "string.empty": "Branch address cannot be empty",
                "string.min": "Branch address should have a minimum length of 3",
                "any.required": "Branch address is required",
            }),
            phone: Joi.string().trim().required().min(3).messages({
                "string.base": "Branch phone must be a type of string",
                "string.empty": "Branch phone cannot be empty",
                "string.min": "Branch phone should have a minimum length of 3",
                "any.required": "Branch phone is required",
            }),
        }),
    },
    update: {
        body: Joi.object<BranchRequestModel>({
            name: Joi.string().trim().min(3).messages({
                "string.base": "Branch name must be a type of string",
                "string.empty": "Branch phone cannot be empty",
                "string.min": "Branch name should have a minimum length of 3",
            }),
            address: Joi.string().trim().min(3).messages({
                "string.base": "Branch address must be a type of string",
                "string.empty": "Branch phone cannot be empty",
                "string.min": "Branch address should have a minimum length of 3",
            }),
            phone: Joi.string().trim().min(3).messages({
                "string.base": "Branch phone must be a type of string",
                "string.empty": "Branch phone cannot be empty",
                "string.min": "Branch phone should have a minimum length of 3",
            }),
        }).min(1).required().messages({
                "object.min": "At least one attribute must be changed when updating",
        }),
    },
};