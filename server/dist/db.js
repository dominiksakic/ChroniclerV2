"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const { MongoClient, Db } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.CONNECTION_STRING;
const dbName = process.env.DB_NAME;
let db;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (db)
            return db;
        const client = yield MongoClient.connect(uri);
        db = client.db(dbName);
        yield db.collection("users").createIndex({ email: 1 }, { unique: true });
        return db;
    });
}
exports.connectToDatabase = connectToDatabase;
