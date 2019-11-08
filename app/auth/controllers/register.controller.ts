
import config from '../../config/secret';  
import RegisterService from '../services/register.service';
import moment from 'moment';

export default class Register{
    public registerService:any;

    constructor() {
        this.registerService = new RegisterService();
    }

    public tambah(req:any, callback:any) {
        
        const jwt = require('jsonwebtoken');
        const bcrypt = require('bcryptjs');

        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
            
        let data = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            level: req.body.level,
            created_date: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        this.registerService.create_user(data, (i:any) => {
            if(!i.status){
                callback(i);
                return;
            }
                
            delete data['password'];
            Object.assign(data, { user_id: i.results.insertId});

            let token = jwt.sign(data, config.secret, {
                expiresIn: 86400 
            });

            callback({status: true, token: token});
            
        })
        
    }
}