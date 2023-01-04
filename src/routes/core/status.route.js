const express = require('express');
const statusController = require('../../controllers/status.controller');

const router = express.Router();

router.get('/', statusController.getStatus);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Status
 *   description: Check the status of the API
 */

/**
 * @swagger
 * /core/status:
 *   get:
 *     summary: Get status
 *     tags: [Status]
 *     responses:
 *       "200":
 *         description: Successful
 *       "400":
 *         description: Something wrong
 */
