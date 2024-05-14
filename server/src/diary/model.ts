import { connectToDatabase } from "../db";
import { ObjectId } from "mongodb";

export async function getEntries(email: string): Promise<string> {
  const db = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne({ email: email }, { entries: 1 });
  console.log(user);
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
  entryToDelete: string,
  email: string
): Promise<string> {
  const db = await connectToDatabase();
  const deletedEntry = await db
    .collection("users")
    .findOneAndUpdate(
      { email: email },
      { $pull: { entries: { _id: new ObjectId(entryToDelete) } } },
      { returnDocument: "after" }
    );

  return deletedEntry || "not found";
}
