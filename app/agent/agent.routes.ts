import { Router, Request, Response } from 'express';
import config from '../config/secret'; 
import Agent  from './controllers/agent.controller';
import * as bodyParser from "body-parser";

const router: Router = Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const agent = new Agent();

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

        if(decoded.level != 'agent'){
            res.send({status: false, msg: 'invalid token agent'});
            return;
        }

        next();
        
    });        
        
});
// 

router.get('/', (req: Request, res: Response) => {
    console.log('agent routes');
    
    res.send('agent routes');
});

router.post('/topup-coin', (req: Request, res: Response) => {
    const jwt = require('jsonwebtoken');
    let token = req.headers['token'];

    jwt.verify(token, config.secret, function(err:any, decoded:any) {
        
        agent.topup(req,decoded.user_id, (i:any) => {
            res.send(i);
        })
        
    }); 
    
});

router.get('/list-topup', (req: Request, res: Response) => {
    const jwt = require('jsonwebtoken');
    let token = req.headers['token'];

    jwt.verify(token, config.secret, function(err:any, decoded:any) {
        
        agent.list_topup(decoded.user_id, (i:any) => {
            res.send(i);
        })
        
    }); 
    
});

router.post('/confirm-topup', (req: Request, res: Response) => {
    const jwt = require('jsonwebtoken');
    let token = req.headers['token'];

    jwt.verify(token, config.secret, function(err:any, decoded:any) {
        
        agent.confirm_topup(req, decoded.user_id, (i:any) => {
            res.send(i);
        })
        
    }); 
});

export const agentRoutes: Router = router;