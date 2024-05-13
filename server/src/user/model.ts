import { connectToDatabase } from "../db";

export async function getUsername(email: string): Promise<string> {
  const db = await connectToDatabase();
  const user = await db
    .collection("user")
    .findOne({ user_email: email }, { user_name: 1 });
  return user?.user_name || "User dosent exist!";
}
