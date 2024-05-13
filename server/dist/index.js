"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./diary/controller");
const cors_1 = __importDefault(require("cors"));
const dotenv = require("dotenv");
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//MIDLEWARE
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//TEST ENDPOINT
app.get("/", (req, res) => {
    res.send("Chronicler V2!");
});
//DIARY
app.get("/diaries", controller_1.getDiariesController);
//to run TS without compiling it before: npx ts-node src/index.ts
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
