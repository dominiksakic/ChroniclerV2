import express, { Express, Request, Response } from "express";
import { getUsernameController } from "./user/controller";
import {
  getDiariesController,
  postDiariesController,
  // deleteDiariesController,
  // patchDiariesController,
} from "./diary/controller";
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

//MIDLEWARE
app.use(cors());
app.use(express.json());

//TEST ENDPOINT
app.get("/", (req: Request, res: Response) => {
  res.send("Chronicler V2!");
});

//DIARY
app.get("/diaries", getDiariesController);
app.post("/diaries", postDiariesController);
// app.delete("/diaries/:id", deleteDiariesController);
// app.patch("/diaries", patchDiariesController);

//to run TS without compiling it before: npx ts-node src/index.ts
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
