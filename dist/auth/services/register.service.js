"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_connection_1 = __importDefault(require("../../connections/mysql.connection"));
var RegisterService = /** @class */ (function () {
    function RegisterService() {
    }
    RegisterService.prototype.create_user = function (data, callback) {
        var query = "\n                    INSERT INTO user \n                        (\n                            username, \n                            password, \n                            email, \n                            level, \n                            created_date\n                        )\n                    VALUES \n                        (\n                            \"" + data.username + "\",\n                            \"" + data.password + "\",\n                            \"" + data.email + "\",\n                            \"" + data.level + "\",\n                            \"" + data.created_date + "\"\n                        )\n                    ";
        mysql_connection_1.default.dbcoin.query(query, function (error, results, fields) {
            if (error)
                callback({ status: false, error: error.sqlMessage });
            else
                callback({ status: true, results: results });
        });
    };
    return RegisterService;
}());
exports.default = RegisterService;
