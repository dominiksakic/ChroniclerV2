const dotenv = require("dotenv");
import { connectToDatabase } from "./db";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  res.send("Cool server!");
});

//to run TS without compiling it before: npx ts-node src/index.ts
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
