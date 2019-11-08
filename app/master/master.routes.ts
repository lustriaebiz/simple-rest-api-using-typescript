import { Router, Request, Response } from 'express';
import config from '../config/secret'; 
import Master  from './controllers/master.controller';
import * as bodyParser from "body-parser";

const router: Router = Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const master = new Master();

// middleware
router.use(function(req, res, next) {
    const jwt = require('jsonwebtoken');

    var token = req.headers['token'];

    if(!token){
        res.send({status: false, msg: 'no token provided.'});
        return;
    }

    jwt.verify(token, config.secret, function(err:any, decoded:any) {

        if(err){
            res.send({status: false, msg: 'invalid token'});
            return;
        }

        if(decoded.level != 'master'){
            res.send({status: false, msg: 'invalid token master'});
            return;
        }

        next();
        
    });        
        
});
// 

router.get('/', (req: Request, res: Response) => {
    console.log('master agent routes');
    res.send('master routes');
    
});

router.get('/list-topup', (req: Request, res: Response) => {
    const jwt = require('jsonwebtoken');
    let token = req.headers['token'];

    jwt.verify(token, config.secret, function(err:any, decoded:any) {
        
        master.list_topup(decoded.user_id, (i:any) => {
            res.send(i);
        })
        
    }); 
    
});

router.post('/confirm-topup', (req: Request, res: Response) => {
    const jwt = require('jsonwebtoken');
    let token = req.headers['token'];

    jwt.verify(token, config.secret, function(err:any, decoded:any) {
        
        master.confirm_topup(req, decoded.user_id, (i:any) => {
            res.send(i);
        })
        
    }); 
});

export const masterRoutes: Router = router;