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
  handleGetEntries: () => void;
  setVisable: any;
  visable: Boolean;
  setCurrCard: any;
}

export interface ContentProps {
  currTitle: string;
  currContent: string;
  setCurrTitle: (title: string) => any;
  setCurrContent: (title: string) => any;
}
