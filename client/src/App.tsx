import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState<string>(" ");

  useEffect(() => {
    handleUserFetch();
  }, []);

  //handler
  async function handleUserFetch() {
    const response = await fetch("http://localhost:3000/diaries");
    const data = await response.json();

    setUser(data);
  }

  return (
    <>
      <h2>{user}'s, Chronicler</h2>
    </>
  );
}

export default App;
