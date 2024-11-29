import { Request, Response } from "express";
import db from "../config/firebase";
import { User } from "../types/types";

const userDb = "users";

export const updateUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, name, email, age }: User = req.body;

  if (!id || !name || !email || !age) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const userRef = db.collection(userDb).doc(id);
    await userRef.set({ name, email, age }, { merge: true });

    res.status(200).json({ message: "User data updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user data" });
  }
};

export const fetchUserData = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const snapshot = await db.collection(userDb).get();
    const users: User[] = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as User)
    );


    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};
