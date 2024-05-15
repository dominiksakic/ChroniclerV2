import { useEffect, useState, createContext } from "react";
import Card from "./components/Card";
import { DiaryEntry } from "./global.types";
import "./App.css";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const CLIENT_URL: string = import.meta.env.VITE_CLIENT_URL;

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    handleGetEntries();
  }, []);

  const handleGetEntries = async () => {
    const response = await fetch(
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
    const data: any = await response.json();
    const entries: DiaryEntry[] = [data];
    setEntries(entries);
  };

  return (
    <>
      <h1>'s', Chronicler</h1>
      {entries.map((entry, index) => {
        return <Card key={index} {...entry} />;
      })}
    </>
  );
}

export default App;
