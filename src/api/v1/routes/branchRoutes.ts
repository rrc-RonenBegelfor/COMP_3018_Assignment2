import express, { Router} from "express";
import * as branchController from "../controllers/branchController";

const router: Router = express.Router();

/**
 * @openapi
 * /branches:
 *   post:
 *     tags:
 *       - Branches
 *     summary: Create a new branch
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BranchRequest'
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Invalid request body
 */
router.post("/", branchController.createBranch);

/**
 * @openapi
 * /branches:
 *   get:
 *     tags:
 *       - Branches
 *     summary: Retrieve a list of branches
 *     responses:
 *       200:
 *         description: A JSON array of branch objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get("/", branchController.getAllBranches);

/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     tags:
 *       - Branches
 *     summary: Get a branch by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *     responses:
 *       200:
 *         description: Branch object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 */
router.get("/:id", branchController.getBranchById);

/**
 * @openapi
 * /branches/{id}:
 *   put:
 *     tags:
 *       - Branches
 *     summary: Update a branch by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BranchRequest'
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Branch not found
 *       400:
 *         description: Invalid request body
 */
router.put("/:id", branchController.updateBranch);

/**
 * @openapi
 * /branches/{id}:
 *   delete:
 *     tags:
 *       - Branches
 *     summary: Delete a branch by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Branch not found
 */
router.delete("/:id", branchController.deleteBranch);

export default router;