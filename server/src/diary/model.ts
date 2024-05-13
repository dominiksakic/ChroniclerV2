import { connectToDatabase } from "../db";

export async function getEntries(): Promise<string> {
  const db = await connectToDatabase();
  const user = await db
    .collection("user")
    .findOne({ user_email: "dominik.sakic@yahoo.com" }, { entires: 1 }); //change the user_email to a unique identifier

  return user?.entries || [];
}
