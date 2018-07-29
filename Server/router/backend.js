const router = require('koa-router')();
const mysql = require('../mysql/mysql');
const jwt = require('jsonwebtoken');
const checkToken = require('../token/checkToken')
const secret = 'rychou';

router.post('/newArticle',checkToken,async (ctx)=>{
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

router.post('/deleteArticle',checkToken,async (ctx)=>{
    const body = ctx.request.body;
    var sql = 'delete from article where id=?';
    var addParam = [body.id];
    await mysql.query(sql,addParam).then(data=>{
        if (data.affectedRows===1)
            ctx.response.body = {deleteState:true};
        else ctx.response.body = {deleteState:false};
    })
});

router.post('/updateArticle',checkToken,async (ctx)=>{
    const body = ctx.request.body;
    var sql = 'update article set title=?,content=?,create_time=?,tags=? where id=?';
    var addParam = [body.title,body.content,body.create_time,body.tags,body.id];
    await mysql.query(sql,addParam).then(data=>{
        data.affectedRows>0?ctx.response.body={updateState:true}:ctx.response.body={updateState:false}
    })
});

module.exports = router.routes()