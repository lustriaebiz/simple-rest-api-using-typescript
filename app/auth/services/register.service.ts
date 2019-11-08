import connection from "../../connections/mysql.connection";

export default class RegisterService {

    public create_user(data:any, callback:any){

        let query = `
                    INSERT INTO user 
                        (
                            username, 
                            password, 
                            email, 
                            level, 
                            created_date
                        )
                    VALUES 
                        (
                            "`+data.username+`",
                            "`+data.password+`",
                            "`+data.email+`",
                            "`+data.level+`",
                            "`+data.created_date+`"
                        )
                    `;

        connection.dbcoin.query(query, function (error, results, fields) {
            if(error)
                callback({status: false, error: error.sqlMessage});
            else
                callback({status: true, results: results});
        });
    }
}