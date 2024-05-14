import { ObjectId } from "mongodb";
import { getEntries, postEntry, deleteEntry, updateEntry } from "./model";
import { Request, Response } from "express";

interface EntryUpdateRequest {
  title?: string;
  content?: string;
}

export async function getDiariesController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const email: string = req.body.email;
    const entries = await getEntries(email);
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
    const { title, content, email } = req.body;
    const newObjectId = new ObjectId();
    const updatedAt: Date = new Date();

    const newEntry = {
      title: title,
      content: content,
      _id: newObjectId,
      updatedAt: updatedAt,
    };

    const entries = await postEntry(newEntry, email);
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
    const email: string = req.body.email;
    const deletedEntry = await deleteEntry(entryToDelete, email);
    res.status(200).json({ deletedEntry });
  } catch (error) {
    res.status(500).json({ error: "Error deleting entry" });
  }
}

export async function patchDiariesController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const entryToUpdate = req.params.entryId;
    const userId = req.params.userId;
    const updates: EntryUpdateRequest = req.body;

    const updatedEntry = await updateEntry(userId, entryToUpdate, updates);
    res.status(200).json({ updatedEntry });
  } catch (error) {
    res.status(500).json({ error: "Error updating entry" });
  }
}
