/**
 * Created by Rychou on 2018/5/19.
 */
errorHandle = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                error: err.originalError ? err.originalError.message : err.message,
            };
        } else {
            throw err;
        }
    });
};

module.exports = errorHandle