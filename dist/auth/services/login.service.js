"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_connection_1 = __importDefault(require("../../connections/mysql.connection"));
var LoginService = /** @class */ (function () {
    function LoginService() {
    }
    LoginService.prototype.get_user = function (data, callback) {
        var query = "\n                    SELECT * FROM user WHERE username = \"" + data + "\" LIMIT 1\n                    ";
        mysql_connection_1.default.dbcoin.query(query, function (error, results, fields) {
            if (error)
                callback({ status: false, error: error.sqlMessage });
            else
                callback({ status: true, results: results });
        });
    };
    return LoginService;
}());
exports.default = LoginService;
