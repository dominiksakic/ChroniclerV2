import express, { Express, Request, Response } from "express";
import { postUsersController } from "./user/controller";
import {
  getDiariesController,
  postDiariesController,
  deleteDiariesController,
  patchDiariesController,
  getSummariesController,
} from "./diary/controller";
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

//MIDLEWARE
app.use(cors({ Origin: process.env.CLIENT_URL }));
app.use(express.json());

//TEST ENDPOINT
app.get("/", (req: Request, res: Response) => {
  res.send("Chronicler V2!");
});

//USER
app.post("/users", postUsersController);

//DIARY
app.get("/diaries/:id", getDiariesController);
app.get("/summaries/:id", getSummariesController);
app.patch("/diaries/:entryId/:userId", patchDiariesController);
app.post("/diaries", postDiariesController);
app.delete("/diaries/:id", deleteDiariesController);

//to run TS without compiling it before: npx ts-node src/index.ts
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
