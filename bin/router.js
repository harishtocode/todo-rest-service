const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('../errors/handler');
const routes = require('../routes');
const swagger = require('./swagger');
const config = require('config');

/**
 * Define express router
 * @returns {Object} express router
 */
function myRouter() {
    const router = express();
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: false }));
    
    // this condition should remain above authenticate middleware to access anonymously
    if (config.get('swagger.enable')) {
        // Serve swagger specification as json
        router.get('/swagger.json', swagger.load());
        // Swagger-UI endpoint
        router.use('/docs', express.static('public/swagger-ui'));
    }

    router.use('/', routes);


    // catch 404 and forward to error handler
    router.use(errorHandler.resourceNotFoundError);

    // error handler
    router.use(errorHandler.httpError);
    return router;
}
module.exports = myRouter;
