"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_connection_1 = __importDefault(require("../../connections/mysql.connection"));
var MasterService = /** @class */ (function () {
    function MasterService() {
    }
    MasterService.prototype.list_topup = function (data, callback) {
        var query = "\n                    SELECT\n                        *\n                    FROM\n                        topup\n                    WHERE\n                        user_confirm = " + data;
        mysql_connection_1.default.dbcoin.query(query, function (error, results, fields) {
            if (error)
                callback({ status: false, error: error.sqlMessage });
            else
                callback({ status: true, results: results });
        });
    };
    MasterService.prototype.confirm_topup = function (data, callback) {
        var query = "\n                    UPDATE topup\n                    SET status = \"" + data.status + "\"\n                    WHERE\n                        user_confirm = " + data.user_id + "\n                    AND topup_id = " + data.topup_id;
        mysql_connection_1.default.dbcoin.query(query, function (error, results, fields) {
            if (error)
                callback({ status: false, error: error.sqlMessage });
            else
                callback({ status: true, results: results });
        });
    };
    return MasterService;
}());
exports.default = MasterService;
