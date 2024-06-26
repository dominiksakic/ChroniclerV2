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
  const [visable, setVisable] = useState<Boolean>(false);
  const [currCard, setCurrCard] = useState<Number>(-1);

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

  const handleAIMode = async () => {
    const response: Response = await fetch(
      `${BASE_URL}/summaries/6642f5d10fe1de34eab81d12`,
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
    const data = await response.json();
    setCurrTitle("Yoda Mode!");
    setCurrContent(data.msg.content[0].text);
  };

  const handleVisable = async () => {
    setCurrTitle("Whats on your mind?");
    setCurrContent("Write here ...");
    setVisable(true);
    setCurrCard(-1);
  };

  const handleSaveEdit = async () => {
    const update = currCard;
    const newTitle = currTitle;
    const newContent = currContent;

    if (typeof update === "number") {
      await fetch(`${BASE_URL}/diaries/`, {
        method: "POST",
        headers: {
          Origin: `${CLIENT_URL}`,
          "Access-Control-Request-Headers": "Content-Type",
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "POST",
        },
        body: JSON.stringify({
          email: "dominik.shintaku@yahoo.com",
          title: newTitle,
          content: newContent,
        }),
      });
    } else {
      await fetch(`${BASE_URL}/diaries/${update}/6642f5d10fe1de34eab81d12`, {
        method: "PATCH",
        headers: {
          Origin: `${CLIENT_URL}`,
          "Access-Control-Request-Headers": "Content-Type",
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "PATCH",
        },
        body: JSON.stringify({
          update: {
            title: newTitle,
            content: newContent,
          },
        }),
      });
    }
    handleGetEntries();
  };

  return (
    <>
      <h1>Dominik's', Chronicle</h1>
      <button className="button-58" onClick={handleVisable}>
        🪶 Make an Entry
      </button>
      <button className="button-58" onClick={handleAIMode}>
        AI MODE
      </button>
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
                setVisable={setVisable}
                visable={visable}
                setCurrCard={setCurrCard}
              />
            );
          })}
        </div>
        {visable ? (
          <div>
            <Content
              currTitle={currTitle}
              currContent={currContent}
              setCurrTitle={setCurrTitle}
              setCurrContent={setCurrContent}
            />
            <button className="button-58" onClick={handleSaveEdit}>
              Save/Edit
            </button>
          </div>
        ) : (
          <div className="invisible"></div>
        )}
      </div>
    </>
  );
}

export default App;
