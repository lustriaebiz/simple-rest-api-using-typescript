"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var dbcoin = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shwetech_coin_ebiz",
    port: 3308
});
exports.default = {
    dbcoin: dbcoin
};
