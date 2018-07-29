const router = require('koa-router')();
const mysql = require('../mysql/mysql');
const jwt = require('jsonwebtoken');
const secret = 'rychou';

router.post('/login',async (ctx)=>{
    const body = ctx.request.body;
    console.log(body)
    var sql = 'select * from users where userName=? and password=?';
    var addParam = [body.userName,body.password];
    await mysql.query(sql,addParam).then(data=>{
        console.log(data[0]);
        if (data[0]!=undefined){
            let userToken = {
                userName:data[0].userName
            };
            const token = jwt.sign(userToken,secret,{expiresIn:'1h'});
            ctx.body = {
                message:'获取token成功',
                code:1,
                token
            };
        }else {
            ctx.body = {
                message:'获取token失败',
                code:-1
            }
        }
    });
});


module.exports = router.routes()
