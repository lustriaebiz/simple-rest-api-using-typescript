"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var master_service_1 = __importDefault(require("../services/master.service"));
var Master = /** @class */ (function () {
    function Master() {
        this.masterService = new master_service_1.default();
    }
    Master.prototype.list_topup = function (data, callback) {
        this.masterService.list_topup(data, function (i) {
            if (!i.status) {
                callback(i);
                return;
            }
            callback({ status: true, data: i.results });
        });
    };
    Master.prototype.confirm_topup = function (req, data, callback) {
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
        this.masterService.confirm_topup(update, function (i) {
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
    return Master;
}());
exports.default = Master;
