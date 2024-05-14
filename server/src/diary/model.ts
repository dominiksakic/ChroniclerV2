import { connectToDatabase } from "../db";

export async function getEntries(): Promise<string> {
  const db = await connectToDatabase();
  const user = await db
    .collection("user")
    .findOne({ user_email: "dominik.sakic@yahoo.com" }, { entires: 1 }); //change the user_email to a unique identifier

  return user?.entries || [];
}

export async function postEntry(newEntry: Object): Promise<string> {
  const db = await connectToDatabase();
  const user = await db.collection("user").findOneAndUpdate(
    { user_email: "dominik.sakic@yahoo.com" },
    { $push: { entries: newEntry } }, //change the user_email to a unique identifier
    { returnDocument: "after" }
  );

  return user?.entries || [];
}
