const express = require('express');
const logger = require('../logger/logger');
const debug = require('debug')('todo-service:todo');

const router = express.Router();


/**
 * @swagger
 * /todo:
 *   post:
 *     tags:
 *       - todo
 *     description: add a new todo
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: todo
 *         in: body
 *         description: todo object to add
 *         schema: 
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: added todo id
 *              todo:
 *                  type: string
 *                  description: todo text
 *     responses:
 *       200:
 *         description: todo added successfully
 *         schema:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: added todo id
 *              todo:
 *                  type: string
 *                  description: todo text
 *       500:
 *         description: Failed to add todo
 *         schema:
 *          $ref: '#/definitions/Error'
 */

router.post(
    '/', 
    (req, res, next) => {
        logger.trace('post method called');
        try {
            const { id } = req.body;
            debug(`add todo by id: ${id}`);
            res.send({ id: id, todo: `todo item added with id ${id}` });
            logger.trace('post method finished');
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /todo/{id}:
 *   get:
 *     tags:
 *       - todo
 *     description: Get todo item by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of resource to download
 *         required: true
 *         type: string
 *     consumes:
 *       - text
 *     responses:
 *       200:
 *         description: todo id
 *         schema:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: todo id
 *              todo:
 *                  type: string
 *                  description: todo item
 *       500:
 *         description: Failed to get the download url for resource
 *         schema:
 *          $ref: '#/definitions/Error'
 */
router.get('/:id', async (req, res, next) => {
    logger.trace('get method called');
    try {
        const { id } = req.params;
        debug(`get todo by id: ${id}`);
        res.send({ id:id, todo: `this is todo item for ${id}` });
        logger.trace('get method finished');
    } catch (err) {
        next(err);
    }
});



/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     tags:
 *       - todo
 *     description: Delete todo item
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of resource to delete
 *         required: true
 *         type: string
 *     consumes:
 *       - text
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Failed to delete the resource
 *         schema:
 *          $ref: '#/definitions/Error'
 */
router.delete(
    '/:id', 
    (req, res, next) => {
        logger.trace('delete todo by id start');
       try{
        const { id } = req.params;
        debug(`delete todo by id: ${id}`);
       
           res.send({msg: `todo deleted with id ${id}`});
       }catch {               
                 next(error);
    }
},
);

module.exports = router;
