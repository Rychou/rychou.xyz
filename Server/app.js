const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const jwtKoa = require('koa-jwt');
const secret = 'rychou';
const errorHandle = require('./middlewares/errorHandle')


app.use(cors());//解决跨域
app.use(errorHandle);
app.use(jwtKoa({secret}).unless({
        path: [/^\/api\/user/,/^\/api\/article/] //数组中的路径不需要通过jwt验证
    }));
app.use(koaBody());//解析表单数据
app.use(require('./router/router').routes());

app.listen(8080);