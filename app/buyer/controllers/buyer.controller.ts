import BuyerService from '../services/buyer.service';

export default class Buyer{
    public buyerService:any;

    constructor() {
        this.buyerService = new BuyerService();
    }

    public buy_coin(req:any, data:any, callback:any) {

        let insert = {
            user_request: data,
            user_confirm: req.body.agent_id,
            value: req.body.coin
        }

        this.buyerService.cek_level(insert, (i:any) => {
            if(!i.status){
                callback(i);
                return;
            }

            if(i.results.length < 1){
                callback({status: false, msg: 'data agent tidak ditemukan.'});
                return;
            }

            this.buyerService.buy(insert, (i:any) => {
                if(!i.status){
                    callback(i);
                    return;
                }
    
                callback({status: true, msg: 'topup successfully!'});
            })
                
        })


        
    }
}