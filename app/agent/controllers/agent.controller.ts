
import AgentService from '../services/agent.service';

export default class Buyer{
    public agentService:any;

    constructor() {
        this.agentService = new AgentService();
    }

    public topup(req:any, data:any, callback:any) {
        let insert = {
            user_request: data,
            user_confirm: req.body.master_id,
            value: req.body.coin
        }

        this.agentService.cek_level(insert, (i:any) => {
            if(!i.status){
                callback(i);
                return;
            }

            if(i.results.length < 1){
                callback({status: false, msg: 'master agent tidak ditemukan.'});
                return;
            }

            this.agentService.topup(insert, (i:any) => {
                if(!i.status){
                    callback(i);
                    return;
                }
                
                callback({status: true, msg: 'topup successfully!'});
            })
                
        })
        
    }

    public list_topup(data:any, callback:any) {
        this.agentService.list_topup(data, (i:any) => {
            if(!i.status){
                callback(i);
                return;
            }

            callback({status: true, data: i.results});
        })
        
    }

    public confirm_topup(req:any, data:any, callback:any) {
        let update = {
            user_id : data,
            topup_id : req.body.topup_id,
            status : req.body.status
        }

        let status = ["true", "false"];
        if(status.indexOf(req.body.status) < 0) {
            callback({status: false, msg: 'status tidak valid, pilih status true atau false'});
            return;
        }

        this.agentService.confirm_topup(update, (i:any) => {
            console.log(i);
            
            if(!i.status){
                callback(i);
                return;
            }

            if(i.results.changedRows < 1){
                callback({status: false, msg: 'tidak ada row yang diupdate.'});
                return;
            }

            if(req.body.status == 'true')
                callback({status: true, msg: 'confirm top up successfully!'});
            if(req.body.status == 'false')
                callback({status: true, msg: 'cancel top up successfully!'});
        })
        
    }
}