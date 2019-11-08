"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var buyer_service_1 = __importDefault(require("../services/buyer.service"));
var Buyer = /** @class */ (function () {
    function Buyer() {
        this.buyerService = new buyer_service_1.default();
    }
    Buyer.prototype.buy_coin = function (req, data, callback) {
        var _this = this;
        var insert = {
            user_request: data,
            user_confirm: req.body.agent_id,
            value: req.body.coin
        };
        this.buyerService.cek_level(insert, function (i) {
            if (!i.status) {
                callback(i);
                return;
            }
            if (i.results.length < 1) {
                callback({ status: false, msg: 'data agent tidak ditemukan.' });
                return;
            }
            _this.buyerService.buy(insert, function (i) {
                if (!i.status) {
                    callback(i);
                    return;
                }
                callback({ status: true, msg: 'topup successfully!' });
            });
        });
    };
    return Buyer;
}());
exports.default = Buyer;
