import { Request, Response } from "express";
import db from "../config/firebaseConfig";
import { User } from "../entities/types";

const userDb = "users";

export const updateUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, age }: User = req.body;
  const { id } = req.params;

  try {
    const userRef = db.collection(userDb).doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      res.status(400).json({ error: "User with said ID doesn't exist" });
    }

    await userRef.set({ name, email, age }, { merge: true });

    const updatedDoc = (await userRef.get()).data();

    res.status(200).json(updatedDoc);
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
