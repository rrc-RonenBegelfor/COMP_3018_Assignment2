import Joi, { ObjectSchema } from "joi";
import { BranchRequestModel } from "../models/branchRequestModel";

/**
 * @openapi
 * components:
 *   schemas:
 *     BranchRequest:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           description: Name of the branch
 *           example: "Toronto Branch"
 *         address:
 *           type: string
 *           minLength: 3
 *           description: Physical address of the branch
 *           example: "440 Queen St W, Toronto, ON, M5V 2A8"
 *         phone:
 *           type: string
 *           minLength: 3
 *           description: Phone number of the branch
 *           example: "+1-416-980-2500"
 *     Branch:
 *       allOf:
 *         - $ref: '#/components/schemas/BranchRequest'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Unique identifier for the branch
 *               example: "branch_456def"
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
 *                 example: "address"
 *               issue:
 *                 type: string
 *                 example: "Branch address should have a minimum length of 3"
 *           description: Detailed validation errors
 */
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