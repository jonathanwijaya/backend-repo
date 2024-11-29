import { Router } from "express";
import { fetchUserData, updateUserData } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { updateUserDataSchema } from "../validation/updateUserData";

const router = Router();

/**
 * @swagger
 * /users/update-user-data/{id}:
 *   patch:
 *     summary: Fetch user by ID
 *     description: Retrieves details of a user by their unique identifier.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: fN9r085qX1yfH9Rosdl5
 *         description: The unique identifier of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               age:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       200:
 *         description: User data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User data updated successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid user data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Authentication token missing or invalid
 */
router.patch(
  "/update-user-data/:id",
  authMiddleware,
  validateRequest(updateUserDataSchema),
  updateUserData
);

/**
 * @swagger
 * /users/fetch-user-data:
 *   get:
 *     summary: Fetch user data
 *     description: Retrieves a list of users with their details in a consistent response format.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: string
 *                   example: "200"
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier for the user
 *                         example: fN9r085qX1yfH9Rosdl5
 *                       name:
 *                         type: string
 *                         description: Full name of the user
 *                         example: Jonathan Wijaya
 *                       email:
 *                         type: string
 *                         format: email
 *                         description: Email address of the user
 *                         example: jonathanwijaya961@gmail.com
 *                       age:
 *                         type: integer
 *                         description: Age of the user
 *                         example: 28
 *       401:
 *         description: Unauthorized error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: string
 *                   example: "401"
 *                 message:
 *                   type: string
 *                   example: "Error"
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Unauthorized"
 */
router.get("/fetch-user-data", authMiddleware, fetchUserData);

export default router;
