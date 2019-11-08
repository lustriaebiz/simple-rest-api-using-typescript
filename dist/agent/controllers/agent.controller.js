"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var agent_service_1 = __importDefault(require("../services/agent.service"));
var Buyer = /** @class */ (function () {
    function Buyer() {
        this.agentService = new agent_service_1.default();
    }
    Buyer.prototype.topup = function (req, data, callback) {
        var _this = this;
        var insert = {
            user_request: data,
            user_confirm: req.body.master_id,
            value: req.body.coin
        };
        this.agentService.cek_level(insert, function (i) {
            if (!i.status) {
                callback(i);
                return;
            }
            if (i.results.length < 1) {
                callback({ status: false, msg: 'master agent tidak ditemukan.' });
                return;
            }
            _this.agentService.topup(insert, function (i) {
                if (!i.status) {
                    callback(i);
                    return;
                }
                callback({ status: true, msg: 'topup successfully!' });
            });
        });
    };
    Buyer.prototype.list_topup = function (data, callback) {
        this.agentService.list_topup(data, function (i) {
            if (!i.status) {
                callback(i);
                return;
            }
            callback({ status: true, data: i.results });
        });
    };
    Buyer.prototype.confirm_topup = function (req, data, callback) {
        var update = {
            user_id: data,
            topup_id: req.body.topup_id,
            status: req.body.status
        };
        var status = ["true", "false"];
        if (status.indexOf(req.body.status) < 0) {
            callback({ status: false, msg: 'status tidak valid, pilih status true atau false' });
            return;
        }
        this.agentService.confirm_topup(update, function (i) {
            console.log(i);
            if (!i.status) {
                callback(i);
                return;
            }
            if (i.results.changedRows < 1) {
                callback({ status: false, msg: 'tidak ada row yang diupdate.' });
                return;
            }
            if (req.body.status == 'true')
                callback({ status: true, msg: 'confirm top up successfully!' });
            if (req.body.status == 'false')
                callback({ status: true, msg: 'cancel top up successfully!' });
        });
    };
    return Buyer;
}());
exports.default = Buyer;
