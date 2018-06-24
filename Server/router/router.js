/**
 * Created by Rychou on 2018/5/13.
 */
const router = require('koa-router')();
const mysql = require('../mysql/mysql');
const jwt = require('jsonwebtoken');
const secret = 'jwt demo';
router.post('/login',async (ctx)=>{
    const body = ctx.request.body;
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

router.get('/article/getArticleList',async (ctx)=>{
    var sql = 'select * from article';
    await mysql.query(sql).then(data=>{
        if (data.length>0){
            ctx.response.body = data
        }else {
            ctx.response.body = 'Not Found'
        }
    })
});

router.get('/article/getArticleById',async (ctx)=>{
    var sql = 'select * from article where id=?';
    var addParam = [ctx.query.id];
    await mysql.query(sql,addParam).then(data=>{
        if (data.length>0)
            ctx.response.body=data[0];
        else ctx.throw(404)
    })
});

router.post('/article/updateArticle',async (ctx)=>{
    const body = ctx.request.body;
    var sql = 'update article set title=?,content=?,create_time=?,tags=? where id=?';
    var addParam = [body.title,body.content,body.create_time,body.tags,body.id];
    await mysql.query(sql,addParam).then(data=>{
        data.affectedRows>0?ctx.response.body={updateState:true}:ctx.response.body={updateState:false}
    })
});

router.post('/newArticle',async (ctx)=>{
    const body = ctx.request.body;
    var sql = 'insert into article(title,content,create_time,tags,author) values(?,?,?,?,?)'
    var addParam = [body.title,body.content,body.create_time,body.tags,body.author];
    await mysql.query(sql,addParam).then(data=>{
        if (data.insertId>0){
            ctx.response.body = {insertState:true}
        }else {
            ctx.response.body = {insertState:false}
        }
    })
});

router.post('/article/delete',async (ctx)=>{
    const body = ctx.request.body;
    var sql = 'delete from article where id=?';
    var addParam = [body.id];
    await mysql.query(sql,addParam).then(data=>{
        if (data.affectedRows===1)
            ctx.response.body = {deleteState:true};
        else ctx.response.body = {deleteState:false};
    })
});


module.exports = router;