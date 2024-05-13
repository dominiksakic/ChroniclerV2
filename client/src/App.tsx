import { useEffect, useState } from "react";
import { ObjectId, Timestamp } from "mongodb";
import Card from "./components/Card";
import "./App.css";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

interface DiaryEntry {
  _id: ObjectId;
  title: string;
  summary: string;
  content: string;
  creationDate: Timestamp;
}

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    handleCardData();
  }, []);

  async function handleCardData(): Promise<void> {
    const response = await fetch(`${BASE_URL}/diaries`);
    const data = await response.json();
    const entries = data.entries;
    setEntries(entries);
  }

  return (
    <>
      <h2>'s', Chronicler</h2>
      {entries.map((entry, index) => {
        return <Card key={index} entry={entry} />;
      })}
    </>
  );
}

export default App;
