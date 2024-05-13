import { ObjectId, Timestamp } from "mongodb";

interface DiaryEntry {
  _id: ObjectId;
  title: string;
  summary: string;
  content: string;
  creationDate: Timestamp;
}

interface CardProps {
  entry: DiaryEntry;
}

const Card = ({ entry }: CardProps) => {
  return (
    <div className="diary-entry">
      <p>{entry.title}</p>
      <p>{entry.summary}</p>
      <p>{entry.content}</p>
    </div>
  );
};

export default Card;
