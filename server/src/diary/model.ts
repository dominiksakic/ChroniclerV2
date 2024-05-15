import { connectToDatabase } from "../db";
import { ObjectId } from "mongodb";

interface EntryUpdateRequest {
  title?: string;
  content?: string;
}

export async function getEntries(id: string): Promise<string> {
  const db = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(id) }, { entries: 1 });
  return user?.entries || [];
}

export async function postEntry(
  newEntry: Object,
  email: string
): Promise<string> {
  const db = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOneAndUpdate(
      { email: email },
      { $push: { entries: newEntry } },
      { returnDocument: "after" }
    );

  return user?.entries || [];
}

export async function deleteEntry(
  userId: string,
  entryId: string
): Promise<string> {
  const db = await connectToDatabase();
  const deletedEntry = await db
    .collection("users")
    .findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $pull: { entries: { _id: new ObjectId(entryId) } } },
      { returnDocument: "after" }
    );

  return deletedEntry || "not found";
}
export async function updateEntry(
  userId: string,
  entryToUpdate: string,
  updates: EntryUpdateRequest
): Promise<any> {
  const db = await connectToDatabase();
  const user = await db.collection("users").findOne(
    {
      _id: new ObjectId(userId),
      "entries._id": new ObjectId(entryToUpdate),
    },
    {
      projection: {
        "entries.$": 1,
      },
    }
  );

  const updatedEntry = {
    title: updates.title !== undefined ? updates.title : user.entries[0].title,
    content:
      updates.content !== undefined ? updates.content : user.entries[0].content,
    updatedAt: new Date(),
    _id: new ObjectId(entryToUpdate),
  };

  const result = await db.collection("users").findOneAndUpdate(
    {
      _id: new ObjectId(userId),
      "entries._id": new ObjectId(entryToUpdate),
    },
    {
      $set: {
        "entries.$": updatedEntry,
      },
    },
    {
      returnDocument: "after",
    }
  );

  return result || "not found";
}
