
import config from '../../config/secret';  
import LoginService from '../services/login.service';
import moment from 'moment';

export default class Register{
    public loginService:any;

    constructor() {
        this.loginService = new LoginService();
    }

    public signin(req:any, callback:any) {
        
        const jwt = require('jsonwebtoken');
        const bcrypt = require('bcryptjs');

        let username = req.body.username;
        let password = req.body.password;

        this.loginService.get_user(username, (i:any) => {
            
            if(!i.status){
                callback(i);
                return;
            }

            let result = i.results[0];

            var passwordIsValid = bcrypt.compareSync(password, result.password);
            
            if(!passwordIsValid){
                callback({status: false, token: null});
                return;
            }

            let data = {
                username: result.username,
                email: result.email,
                level: result.level,
                user_id: result.user_id
            }
            
            let token = jwt.sign(data, config.secret, {
                expiresIn: 86400 
            });

            callback({status: true, token: token});
            
        })
        
    }

    public signout (callback:any) {
        callback({status: true, token: null});
        // set null token di client
    }
}