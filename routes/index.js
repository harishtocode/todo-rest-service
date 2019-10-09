/*
  @Description: Defines all base route of the service
*/
const express = require('express');

const router = express.Router();

/**
 * @swagger
 *  definitions:
 *    Error:
 *      type: object
 *      properties:
 *        errorCode:
 *          type: string
 *          description: api error code
 *        message:
 *          type: string
 *          description: api error code description
 */
router.use('/todo', require('./todo'));


/**
 * @swagger
 *  definitions:
 *    Health:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: service name
 *        version:
 *          type: string
 *          description: deployed version
 *        build:
 *          type: string
 *          description: deployed build
 */
router.use('/health', require('./health'));

module.exports = router;

