import connection from "../../connections/mysql.connection";

export default class BuyerService {

    public buy(data:any, callback:any){

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
                    AND u.level = "agent"
                    `;

        connection.dbcoin.query(query, function (error, results, fields) {
            if(error)
                callback({status: false, error: error.sqlMessage});
            else
                callback({status: true, results: results});
        });
    }
}