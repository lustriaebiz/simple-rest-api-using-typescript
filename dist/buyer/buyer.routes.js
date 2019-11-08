"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var secret_1 = __importDefault(require("../config/secret"));
var buyer_controller_1 = __importDefault(require("./controllers/buyer.controller"));
var bodyParser = __importStar(require("body-parser"));
var router = express_1.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var buyer = new buyer_controller_1.default();
// middleware
router.use(function (req, res, next) {
    var jwt = require('jsonwebtoken');
    var token = req.headers['token'];
    if (!token) {
        res.send({ status: false, msg: 'no token provided.' });
        return;
    }
    jwt.verify(token, secret_1.default.secret, function (err, decoded) {
        if (err) {
            res.send({ status: false, msg: 'invalid token' });
            return;
        }
        if (decoded.level != 'buyer') {
            res.send({ status: false, msg: 'invalid token buyer' });
            return;
        }
        next();
    });
});
// 
router.get('/', function (req, res) {
    console.log('buyer routes');
    res.send('buyer routes');
});
router.post('/buy-coin', function (req, res) {
    var jwt = require('jsonwebtoken');
    var token = req.headers['token'];
    jwt.verify(token, secret_1.default.secret, function (err, decoded) {
        buyer.buy_coin(req, decoded.user_id, function (i) {
            res.send(i);
        });
    });
});
exports.buyerRoutes = router;
