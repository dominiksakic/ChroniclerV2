import { getUsername } from "./model";
import { Request, Response } from "express";

export async function getUsernameController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const email: string = req.body.email;
    const username = await getUsername(email);
    res.status(200).json({ username });
  } catch (error) {
    res.status(500).json({ error: "Error fetching username" });
  }
}
