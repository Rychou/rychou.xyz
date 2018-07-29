const router = require('koa-router')();
const mysql = require('../mysql/mysql');


router.get('/getArticleList',async (ctx)=>{
    var sql = 'select * from article';
    await mysql.query(sql).then(data=>{
        if (data.length>0){
            ctx.response.body = data
        }else {
            ctx.response.body = 'Not Found'
        }
    })
});

router.get('/getArticleById',async (ctx)=>{
    var sql = 'select * from article where id=?';
    var addParam = [ctx.query.id];
    await mysql.query(sql,addParam).then(data=>{
        if (data.length>0)
            ctx.response.body=data[0];
        else ctx.throw(404)
    })
});

module.exports = router.routes()