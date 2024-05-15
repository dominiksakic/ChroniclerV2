import { useEffect, useState } from "react";
import Card from "./components/Card";
import { DiaryEntry } from "./global.types";
import "./App.css";
import Content from "./components/Content";

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
      <h1>Dominik's', Chronicle</h1>
      <button className="button-58">🪶 Make an Entry</button>
      <button className="button-58">AI MODE</button>
      <div className="main-container">
        <div className="card-container">
          {entries.map((entry, index) => {
            return (
              <Card
                key={index}
                {...entry}
                setCurrTitle={setCurrTitle}
                setCurrContent={setCurrContent}
                handleGetEntries={handleGetEntries}
              />
            );
          })}
        </div>
        <Content currTitle={currTitle} currContent={currContent} />
      </div>
    </>
  );
}

export default App;
