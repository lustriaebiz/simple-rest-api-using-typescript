"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_connection_1 = __importDefault(require("../../connections/mysql.connection"));
var BuyerService = /** @class */ (function () {
    function BuyerService() {
    }
    BuyerService.prototype.buy = function (data, callback) {
        var query = "\n                    INSERT INTO topup (\n                        user_request,\n                        user_confirm,\n                        value,\n                        created_date\n                    ) VALUES (\n                        " + data.user_request + ",\n                        " + data.user_confirm + ",\n                        " + data.value + ",\n                        NOW()\n                    )\n                    ";
        mysql_connection_1.default.dbcoin.query(query, function (error, results, fields) {
            if (error)
                callback({ status: false, error: error.sqlMessage });
            else
                callback({ status: true, results: results });
        });
    };
    BuyerService.prototype.cek_level = function (data, callback) {
        var query = "\n                    SELECT\n                        u.user_id,\n                        level,\n                        coin_value\n                    FROM\n                        USER u\n                    JOIN dompet_coin d ON d.user_id = u.user_id\n                    WHERE\n                        u.user_id = " + data.user_confirm + "\n                    AND u.level = \"agent\"\n                    ";
        mysql_connection_1.default.dbcoin.query(query, function (error, results, fields) {
            if (error)
                callback({ status: false, error: error.sqlMessage });
            else
                callback({ status: true, results: results });
        });
    };
    return BuyerService;
}());
exports.default = BuyerService;
