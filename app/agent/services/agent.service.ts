import connection from "../../connections/mysql.connection";

export default class AgentService {

    public topup(data:any, callback:any){

        let query = `
                    INSERT INTO topup (
                        user_request,
                        user_confirm,
                        value,
                        created_date
                    ) VALUES (
                        `+data.user_request+`,
                        `+data.user_confirm+`,
                        `+data.value+`,
                        NOW()
                    )
                    `;

        connection.dbcoin.query(query, function (error, results, fields) {
            if(error)
                callback({status: false, error: error.sqlMessage});
            else
                callback({status: true, results: results});
        });
    }

    public cek_level(data:any, callback:any){

        let query = `
                    SELECT
                        u.user_id,
                        level,
                        coin_value
                    FROM
                        USER u
                    JOIN dompet_coin d ON d.user_id = u.user_id
                    WHERE
                        u.user_id = `+data.user_confirm+`
                    AND u.level = "master"
                    `;

        connection.dbcoin.query(query, function (error, results, fields) {
            if(error)
                callback({status: false, error: error.sqlMessage});
            else
                callback({status: true, results: results});
        });
    }

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

        let cek_dompet = `
                            SELECT
                            IF (
                                d.coin_value > t.value,
                                'true',
                                'false'
                            ) AS status
                            FROM
                                dompet_coin d
                            JOIN topup t ON d.user_id = t.user_confirm
                            WHERE
                                d.user_id = `+data.user_id;

        connection.dbcoin.query(cek_dompet, function (error, results, fields) {
            if(error)
                callback({status: false, error: error.sqlMessage});
            else{
                if(results[0].status == 'true') {
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
                }else{
                    callback({status: false, msg: 'saldo anda tidak mencukupi, silahkan topup ke master agent.'});
                }
                
                
            }
        });

        
    }
}