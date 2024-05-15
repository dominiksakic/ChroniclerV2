"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./user/controller");
const controller_2 = require("./diary/controller");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//MIDLEWARE
app.use(cors({ Origin: process.env.CLIENT_URL }));
app.use(express_1.default.json());
//TEST ENDPOINT
app.get("/", (req, res) => {
    res.send("Chronicler V2!");
});
//USER
app.post("/users", controller_1.postUsersController);
//DIARY
app.get("/diaries/:id", controller_2.getDiariesController);
app.get("/summaries/:id", controller_2.getSummariesController);
app.patch("/diaries/:entryId/:userId", controller_2.patchDiariesController);
app.post("/diaries", controller_2.postDiariesController);
app.delete("/diaries/:userId/:entryId", controller_2.deleteDiariesController);
//to run TS without compiling it before: npx ts-node src/index.ts
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
