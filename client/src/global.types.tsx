import { ObjectId } from "mongodb";

export interface DiaryEntry {
  _id: ObjectId;
  title: string;
  content: string;
  updatedAt: Date;
}

export interface CardProps extends DiaryEntry {
  setCurrTitle: (title: string) => void;
  setCurrContent: (title: string) => void;
}
