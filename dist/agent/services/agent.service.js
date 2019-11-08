"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_connection_1 = __importDefault(require("../../connections/mysql.connection"));
var AgentService = /** @class */ (function () {
    function AgentService() {
    }
    AgentService.prototype.topup = function (data, callback) {
        var query = "\n                    INSERT INTO topup (\n                        user_request,\n                        user_confirm,\n                        value,\n                        created_date\n                    ) VALUES (\n                        " + data.user_request + ",\n                        " + data.user_confirm + ",\n                        " + data.value + ",\n                        NOW()\n                    )\n                    ";
        mysql_connection_1.default.dbcoin.query(query, function (error, results, fields) {
            if (error)
                callback({ status: false, error: error.sqlMessage });
            else
                callback({ status: true, results: results });
        });
    };
    AgentService.prototype.cek_level = function (data, callback) {
        var query = "\n                    SELECT\n                        u.user_id,\n                        level,\n                        coin_value\n                    FROM\n                        USER u\n                    JOIN dompet_coin d ON d.user_id = u.user_id\n                    WHERE\n                        u.user_id = " + data.user_confirm + "\n                    AND u.level = \"master\"\n                    ";
        mysql_connection_1.default.dbcoin.query(query, function (error, results, fields) {
            if (error)
                callback({ status: false, error: error.sqlMessage });
            else
                callback({ status: true, results: results });
        });
    };
    AgentService.prototype.list_topup = function (data, callback) {
        var query = "\n                    SELECT\n                        *\n                    FROM\n                        topup\n                    WHERE\n                        user_confirm = " + data;
        mysql_connection_1.default.dbcoin.query(query, function (error, results, fields) {
            if (error)
                callback({ status: false, error: error.sqlMessage });
            else
                callback({ status: true, results: results });
        });
    };
    AgentService.prototype.confirm_topup = function (data, callback) {
        var cek_dompet = "\n                            SELECT\n                            IF (\n                                d.coin_value > t.value,\n                                'true',\n                                'false'\n                            ) AS status\n                            FROM\n                                dompet_coin d\n                            JOIN topup t ON d.user_id = t.user_confirm\n                            WHERE\n                                d.user_id = " + data.user_id;
        mysql_connection_1.default.dbcoin.query(cek_dompet, function (error, results, fields) {
            if (error)
                callback({ status: false, error: error.sqlMessage });
            else {
                if (results[0].status == 'true') {
                    var query = "\n                            UPDATE topup\n                            SET status = \"" + data.status + "\"\n                            WHERE\n                                user_confirm = " + data.user_id + "\n                            AND topup_id = " + data.topup_id;
                    mysql_connection_1.default.dbcoin.query(query, function (error, results, fields) {
                        if (error)
                            callback({ status: false, error: error.sqlMessage });
                        else
                            callback({ status: true, results: results });
                    });
                }
                else {
                    callback({ status: false, msg: 'saldo anda tidak mencukupi, silahkan topup ke master agent.' });
                }
            }
        });
    };
    return AgentService;
}());
exports.default = AgentService;
