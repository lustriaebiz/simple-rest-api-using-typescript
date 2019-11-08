import { Router, Request, Response } from 'express';
import config from '../config/secret'; 
import Buyer  from './controllers/buyer.controller';
import * as bodyParser from "body-parser";

const router: Router = Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const buyer = new Buyer();

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

        if(decoded.level != 'buyer'){
            res.send({status: false, msg: 'invalid token buyer'});
            return;
        }

        next();
        
    });        
        
});
// 

router.get('/', (req: Request, res: Response) => {
    console.log('buyer routes');
    res.send('buyer routes');
    
});

router.post('/buy-coin', (req: Request, res: Response) => {
    const jwt = require('jsonwebtoken');
    let token = req.headers['token'];

    jwt.verify(token, config.secret, function(err:any, decoded:any) {
        
        buyer.buy_coin(req,decoded.user_id, (i:any) => {
            res.send(i);
        })
        
    }); 
    
});

export const buyerRoutes: Router = router;