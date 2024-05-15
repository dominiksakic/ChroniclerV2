import { ObjectId } from "mongodb";

export interface DiaryEntry {
    _id: ObjectId;
    title: string;
    content: string;
    updatedAt: Date;
  }