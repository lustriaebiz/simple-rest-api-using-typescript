import MasterService from '../services/master.service';

export default class Master{
    public masterService:any;

    constructor() {
        this.masterService = new MasterService();
    }

    public list_topup(data:any, callback:any) {
        this.masterService.list_topup(data, (i:any) => {
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

        this.masterService.confirm_topup(update, (i:any) => {
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