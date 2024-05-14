import { ObjectId } from "mongodb";
import { getEntries, postEntry, deleteEntry } from "./model";
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

export async function postDiariesController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    //building blocks for the new Entry;
    const { title, content } = req.body;
    const newObjectId = new ObjectId();
    const updatedAt: Date = new Date();

    const newEntry = {
      title: title,
      content: content,
      _id: newObjectId,
      updatedAt: updatedAt,
    };

    const entries = await postEntry(newEntry);
    res.status(200).json({ entries });
  } catch (error) {
    res.status(500).json({ error: "Error posting new entry" });
  }
}

export async function deleteDiariesController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const entryToDelete = req.params.id;
    const deletedEntry = await deleteEntry(entryToDelete);
    res.status(200).json({ deletedEntry });
  } catch (error) {
    res.status(500).json({ error: "Error deleting entry" });
  }
}
