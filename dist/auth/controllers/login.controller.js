"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var secret_1 = __importDefault(require("../../config/secret"));
var login_service_1 = __importDefault(require("../services/login.service"));
var Register = /** @class */ (function () {
    function Register() {
        this.loginService = new login_service_1.default();
    }
    Register.prototype.signin = function (req, callback) {
        var jwt = require('jsonwebtoken');
        var bcrypt = require('bcryptjs');
        var username = req.body.username;
        var password = req.body.password;
        this.loginService.get_user(username, function (i) {
            if (!i.status) {
                callback(i);
                return;
            }
            var result = i.results[0];
            var passwordIsValid = bcrypt.compareSync(password, result.password);
            if (!passwordIsValid) {
                callback({ status: false, token: null });
                return;
            }
            var data = {
                username: result.username,
                email: result.email,
                level: result.level,
                user_id: result.user_id
            };
            var token = jwt.sign(data, secret_1.default.secret, {
                expiresIn: 86400
            });
            callback({ status: true, token: token });
        });
    };
    Register.prototype.signout = function (callback) {
        callback({ status: true, token: null });
        // set null token di client
    };
    return Register;
}());
exports.default = Register;
