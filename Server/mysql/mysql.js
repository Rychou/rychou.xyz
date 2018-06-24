/**
 * Created by Rychou on 2018/5/13.
 */
const mysql = require('mysql');
const config = {
    host:'120.79.88.123',
    user:'rychou',
    password:'wew123..',
    port:'3306',
    database:'personal_site'
}

var pool = mysql.createPool(config);


var query=(sql,addParam)=> {
    var p = new Promise((resolve,reject)=> {
        pool.getConnection((err, connection) => {
            connection.query(sql, addParam, (error, result) => {
                if (error) {
                    console.log(error);
                    return;
                }
                resolve(result);
            });
            connection.release();
        })
    });
    return p;
};

module.exports = {
    query,
};