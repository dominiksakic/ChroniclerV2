import { useEffect, useState, createContext } from "react";
import Card from "./components/Card";
import { DiaryEntry } from "./global.types";
import "./App.css";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const CLIENT_URL: string = import.meta.env.VITE_CLIENT_URL;

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [currTitle, setCurrTitle] = useState<string>("");
  const [currContent, setCurrContent] = useState<string>("");

  useEffect(() => {
    handleGetEntries();
  }, []);

  const handleGetEntries = async () => {
    const response: Response = await fetch(
      `${BASE_URL}/diaries/6642f5d10fe1de34eab81d12`,
      {
        method: "GET",
        headers: {
          Origin: `${CLIENT_URL}`,
          "Access-Control-Request-Headers": "Content-Type",
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "GET",
        },
      }
    );
    const { entries }: { entries: DiaryEntry[] } = await response.json();
    setEntries(entries);
  };

  return (
    <>
      <h1>'s', Chronicler</h1>
      {entries.map((entry, index) => {
        return (
          <Card
            key={index}
            {...entry}
            setCurrTitle={setCurrTitle}
            setCurrContent={setCurrContent}
          />
        );
      })}
      <div className="write-space">
        <input
          type="text"
          maxLength={32}
          placeholder="Title"
          value={currTitle}
        />
        <textarea
          maxLength={1000}
          placeholder="Click note to edit or click + to create new note"
          rows={10}
          cols={50}
          value={currContent}
        />
      </div>
    </>
  );
}

export default App;
