const logger = require('../logger/logger');
const ev = require('express-validation');

/** Handle Page not found error and call next middleware
* @param  {Object} req Http Request
* @param  {Object} res Http Response
* @param  {Function} next next method to pass control to next middleware
* @returns {void}
*/
function resourceNotFoundError(req, res, next) {
    // catch 404 and forward to error handler
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}

/** Server error handler
* @param  {Object} err Error thrown by application
* @param  {Object} req Http Request
* @param  {Object} res Http Response
* @param  {Function} next next method to pass control to next middleware
* @returns {void}
*/
function httpError(err, req, res, next) {
    // The error page only provides error in development
    // logger implementation required
    res.status(err.code || err.status || 500);
    const error = {
        code: err.code || err.status, // httpcode
        message: err.message || null, // http status message or override by usually readbale format of http code
        errorCode: err.errorCode || null,
    };
    // this is thrown by joi validation
    if (err instanceof ev.ValidationError) {
        error.errorCode = err.statusText.code;
        error.message = err.statusText.message;
    }
    let errorLog;
    if (req.app.get('env').indexOf('development') === -1) {
        errorLog = error;
    } else {
        errorLog = {
            ...error,
            stack: err.stack, // httperror exception stacktrace
            oStack: err.oStack || null, // actual handled exception stack summary
            innerMessage: err.innerMessage || null, // custom text message for the error
        };
    }
    logger.error({
        ...error,
        stack: err.stack, // httperror exception stacktrace
        oStack: err.oStack || null, // actual handled exception stack summary
        innerMessage: err.innerMessage || null, // custom text message for the error
    });
    res.json(errorLog);
}

module.exports = {
    resourceNotFoundError,
    httpError,
};
