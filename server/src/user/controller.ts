import { ObjectId } from "mongodb";
import { createUser } from "./model";
import { Request, Response } from "express";

interface UserCreation {
  email: string;
  userName: string;
  password: string;
}

export async function postUsersController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { email, userName, password }: UserCreation = req.body;
    const newUser = {
      user_name: userName,
      email: email,
      password,
      _id: new ObjectId(),
      entries: [],
    };

    const user = await createUser(newUser);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error creating Account" });
  }
}
