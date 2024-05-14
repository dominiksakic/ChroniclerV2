import { connectToDatabase } from "../db";

export async function createUser(newUser: Object): Promise<string | null> {
  try {
    const db = await connectToDatabase();
    const user = await db.collection("users").insertOne(newUser);
    return user;
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate email error
      console.error("Email already exists");
      return null;
    } else {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}
