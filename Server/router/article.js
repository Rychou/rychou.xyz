const router = require('koa-router')();
const mysql = require('../mysql/mysql');


router.get('/getArticleList',async (ctx)=>{
    let sql = 'select * from article';
    await mysql.query(sql).then(data=>{
        if (data.length>0){
            ctx.response.body = data
        }else {
            ctx.response.body = 'Not Found'
        }
    })
});

router.get('/getArticleById',async (ctx)=>{
    let sql = 'select * from article where id=?';
    let sqlLast = 'select id,title from article where id < ? order by id desc limit 1';
    let sqlNext = 'select id,title from article where id > ? order by id asc limit 1';
    let sqlUpdateViews = 'update article set views = views + 1 where id = ?'
    let addParam = [ctx.query.id];
    let res;
    await mysql.query(sql,addParam)
        .then(data=>{
            if (data.length>0)
                res=data[0];
            else ctx.throw(404)
            return mysql.query(sqlLast,addParam)
        })
        .then(data=>{
            res.lastArticle = data[0];
            return mysql.query(sqlNext,addParam)
        })
        .then(data=>{
            res.nextArticle = data[0];
            ctx.response.body = res;
            return mysql.query(sqlUpdateViews,addParam)
        })
        .then(data=>{
            console.log(data)
        })
        .catch(err=>console.error(err))
});


module.exports = router.routes()