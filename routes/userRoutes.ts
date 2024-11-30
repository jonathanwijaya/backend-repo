import { Router } from "express";
import { fetchSingleUserData, fetchUserData, updateUserData } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { updateUserDataSchema } from "../validation/updateUserData";

const router = Router();

/**
 * @swagger
 * $ref: './swagger.yaml#/paths/users/update-user-data/{id}/patch'
 */
router.patch(
  "/update-user-data/:id",
  authMiddleware,
  validateRequest(updateUserDataSchema),
  updateUserData
);

/**
 * @swagger
 * $ref: './swagger.yaml#/paths/users/fetch-user-data/get'
 */
router.get("/fetch-user-data", authMiddleware, fetchUserData);

/**
 * @swagger
 * $ref: './swagger.yaml#/paths/users/fetch-user-data/{id}/get'
 */
router.get("/fetch-user-data/:id", authMiddleware, fetchSingleUserData);

export default router;
