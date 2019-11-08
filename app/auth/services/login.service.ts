import connection from "../../connections/mysql.connection";

export default class LoginService {

    public get_user(data:any, callback:any){

        let query = `
                    SELECT * FROM user WHERE username = "`+data+`" LIMIT 1
                    `;

        connection.dbcoin.query(query, function (error, results, fields) {
            if(error)
                callback({status: false, error: error.sqlMessage});
            else
                callback({status: true, results: results});
        });
    }
}