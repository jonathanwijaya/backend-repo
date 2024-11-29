import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";
import { User } from "../entities/types";

export const authMiddleware = async (
  req: Request & { user?: User },
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined =
    req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
  }

  try {
    if (typeof token === "string") {
      const decodedToken = await admin.auth().verifyIdToken(token);
      // Continue with the decodedToken
      const user: User = {
        id: decodedToken.uid, // Firebase `uid` maps to your `id`
        name: decodedToken.name , // You may get the `name` from your DB or Firebase profile
        age: decodedToken.age, // Example: If `age` is not in Firebase token, assign a default or fetch from DB
        email: decodedToken.email || "janedoe@gmail.com",
      };
      req.user = user;
      next();
    } else {
      // Handle the case where token is undefined or not a string
      console.log("Invalid token");
    }
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
