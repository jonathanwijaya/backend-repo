import { Router } from "express";
import { fetchUserData, updateUserData } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/update-user-data", authMiddleware, updateUserData);
router.get("/fetch-user-data", authMiddleware, fetchUserData);

export default router;