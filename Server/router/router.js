/**
 * Created by Rychou on 2018/5/13.
 */
const router = require('koa-router')();

router.use('/api/backend',require('./backend'))
router.use('/api/article',require('./article'))
router.use('/api/user',require('./user'))

module.exports = router;