"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var secret_1 = __importDefault(require("../../config/secret"));
var register_service_1 = __importDefault(require("../services/register.service"));
var moment_1 = __importDefault(require("moment"));
var Register = /** @class */ (function () {
    function Register() {
        this.registerService = new register_service_1.default();
    }
    Register.prototype.tambah = function (req, callback) {
        var jwt = require('jsonwebtoken');
        var bcrypt = require('bcryptjs');
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        var data = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            level: req.body.level,
            created_date: moment_1.default().format('YYYY-MM-DD HH:mm:ss')
        };
        this.registerService.create_user(data, function (i) {
            if (!i.status) {
                callback(i);
                return;
            }
            delete data['password'];
            Object.assign(data, { user_id: i.results.insertId });
            var token = jwt.sign(data, secret_1.default.secret, {
                expiresIn: 86400
            });
            callback({ status: true, token: token });
        });
    };
    return Register;
}());
exports.default = Register;
