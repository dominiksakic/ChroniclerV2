import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

function App() {
  const [user, setUser] = useState<string>(" ");

  useEffect(() => {
    handleUserFetch();
  }, []);

  //handler
  async function handleUserFetch() {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    const userName: string = data.username;

    setUser(userName);
  }

  return (
    <>
      <h2>{user}'s, Chronicler</h2>
    </>
  );
}

export default App;
