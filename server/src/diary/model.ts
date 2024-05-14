import { connectToDatabase } from "../db";
import { ObjectId } from "mongodb";

export async function getEntries(): Promise<string> {
  const db = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne({ user_email: "dominik.sakic@yahoo.com" }, { entires: 1 }); //change the user_email to a unique identifier

  return user?.entries || [];
}

export async function postEntry(newEntry: Object): Promise<string> {
  const db = await connectToDatabase();
  const user = await db.collection("users").findOneAndUpdate(
    { user_email: "dominik.sakic@yahoo.com" },
    { $push: { entries: newEntry } }, //change the user_email to a unique identifier
    { returnDocument: "after" }
  );

  return user?.entries || [];
}

export async function deleteEntry(entryToDelete: string): Promise<string> {
  const db = await connectToDatabase();
  const deletedEntry = await db.collection("users").findOneAndDelete(
    { user_email: "dominik.sakic@yahoo.com" },
    { $pull: { entries: { _id: new ObjectId(entryToDelete) } } } // did I jsut delete everything?
  );

  return deletedEntry || "not found";
}
