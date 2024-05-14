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
app.use(cors());
app.use(express_1.default.json());
//TEST ENDPOINT
app.get("/", (req, res) => {
    res.send("Chronicler V2!");
});
//USER
app.post("/users", controller_1.postUsersController);
//DIARY
app.get("/diaries", controller_2.getDiariesController);
app.post("/diaries", controller_2.postDiariesController);
app.delete("/diaries/:id", controller_2.deleteDiariesController);
// app.patch("/diaries", patchDiariesController);
//to run TS without compiling it before: npx ts-node src/index.ts
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
