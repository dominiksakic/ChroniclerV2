import { ObjectId } from "mongodb";
import { getEntries, postEntry, deleteEntry, updateEntry } from "./model";
import { Request, Response } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { format, isWithinInterval, subWeeks } from "date-fns";

const dotenv = require("dotenv");

dotenv.config();

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
    const userId = req.params.userId;
    const entryId = req.params.entryId;
    const deletedEntry = await deleteEntry(userId, entryId);
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
    const id: string = req.params.id;
    const data: any = await getEntries(id);
    let summary = "";
    const lastWeek = subWeeks(new Date(), 1);

    data.map((entry: any) => {
      const { content, title, updatedAt } = entry;
      const entryDate = new Date(updatedAt);

      if (isWithinInterval(entryDate, { start: lastWeek, end: new Date() })) {
        summary += title;
        summary += format(entryDate, "yyyy-MM-dd");
        summary += content;
      }
    });
    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE,
    });

    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0,
      system:
        "Please Summarize the Diary entries in Yoda English. \nOrganize the summaries by Weekdays and onlu displaying the Weekdays.\nPlease start your response with the dates. Dont have any preface saying/writting something.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: summary,
            },
          ],
        },
      ],
    });

    res.status(200).json({ msg });
  } catch (error) {
    res.status(500).json({ error: "Error fetching Summaries" });
  }
}
