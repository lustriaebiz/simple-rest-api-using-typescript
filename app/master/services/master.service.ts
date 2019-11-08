import connection from "../../connections/mysql.connection";

export default class MasterService {

    public list_topup(data:any, callback:any){

        let query = `
                    SELECT
                        *
                    FROM
                        topup
                    WHERE
                        user_confirm = `+data;

        connection.dbcoin.query(query, function (error, results, fields) {
            if(error)
                callback({status: false, error: error.sqlMessage});
            else
                callback({status: true, results: results});
        });
    }

    public confirm_topup(data:any, callback:any){

        let query = `
                    UPDATE topup
                    SET status = "`+data.status+`"
                    WHERE
                        user_confirm = `+data.user_id+`
                    AND topup_id = `+data.topup_id;

        connection.dbcoin.query(query, function (error, results, fields) {
            if(error)
                callback({status: false, error: error.sqlMessage});
            else
                callback({status: true, results: results});
        });
    }
}