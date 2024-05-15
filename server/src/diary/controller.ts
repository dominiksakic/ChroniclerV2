import { ObjectId } from "mongodb";
import { getEntries, postEntry, deleteEntry, updateEntry } from "./model";
import { Request, Response } from "express";
import Anthropic from "@anthropic-ai/sdk";

interface EntryUpdateRequest {
  title?: string;
  content?: string;
}

export async function getDiariesController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id: string = req.params.id;
    const entries = await getEntries(id);
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

export async function getSummariesController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const anthropic = new Anthropic({
      apiKey: "my_api_key", // defaults to process.env["ANTHROPIC_API_KEY"]
    });

    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0,
      system:
        "Please Summarize the Diary entries in one or two sentences. \nOrganize the summaries by Date.\nPlease start your response with the dates. Dont have any preface saying/writting something.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Monday: I learned about chat gpt and how cool it is. I laughed so much \n\nTuesday: I learned about endpoints and the magic. \n\nWednesday: I learned about what love and live is about.",
            },
          ],
        },
      ],
    });
    console.log(msg);
    res.status(200).json({ Summaries });
  } catch (error) {
    res.status(500).json({ error: "Error fetching Summaries" });
  }
}
