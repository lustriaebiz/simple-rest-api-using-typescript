import mysql from 'mysql';

var dbcoin = mysql.createConnection({
    host    : "localhost",
    user    : "root",
    password: "",
    database: "shwetech_coin_ebiz",
    port    : 3308
});

 export default {
    dbcoin
}