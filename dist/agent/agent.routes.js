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
var agent_controller_1 = __importDefault(require("./controllers/agent.controller"));
var bodyParser = __importStar(require("body-parser"));
var router = express_1.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var agent = new agent_controller_1.default();
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
        if (decoded.level != 'agent') {
            res.send({ status: false, msg: 'invalid token agent' });
            return;
        }
        next();
    });
});
// 
router.get('/', function (req, res) {
    console.log('agent routes');
    res.send('agent routes');
});
router.post('/topup-coin', function (req, res) {
    var jwt = require('jsonwebtoken');
    var token = req.headers['token'];
    jwt.verify(token, secret_1.default.secret, function (err, decoded) {
        agent.topup(req, decoded.user_id, function (i) {
            res.send(i);
        });
    });
});
router.get('/list-topup', function (req, res) {
    var jwt = require('jsonwebtoken');
    var token = req.headers['token'];
    jwt.verify(token, secret_1.default.secret, function (err, decoded) {
        agent.list_topup(decoded.user_id, function (i) {
            res.send(i);
        });
    });
});
router.post('/confirm-topup', function (req, res) {
    var jwt = require('jsonwebtoken');
    var token = req.headers['token'];
    jwt.verify(token, secret_1.default.secret, function (err, decoded) {
        agent.confirm_topup(req, decoded.user_id, function (i) {
            res.send(i);
        });
    });
});
exports.agentRoutes = router;
