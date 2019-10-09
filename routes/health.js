const express = require('express');

const router = express.Router();
const configureVersion = require('version-healthcheck').configure;

const version = configureVersion({
    // we can add req and res as input parameter when required
    callback: function customVersion() {
        // `this` is the version response. It will already contain
        // the default values.
        // Anything you do with `this` will change the JSON response.
        // this.foo = 'bar';
        // You can also access the request and response objects.
        // this.url = req.url
    },
    buildPath: '/BUILD', // path is relative to the app directory.
});

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - health
 *     description: Service health check
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *         schema:
 *          $ref: '#/definitions/Health'
 *       500:
 *         description: Server error
 */
router.get('/', (req, res, next) => version(req, res));
module.exports = router;
