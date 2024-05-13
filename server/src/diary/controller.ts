import { getEntries } from "./model";
import { Request, Response } from "express";

export async function getDiariesController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const entries = await getEntries();
    res.status(200).json({ entries });
  } catch (error) {
    res.status(500).json({ error: "Error fetching entries" });
  }
}
