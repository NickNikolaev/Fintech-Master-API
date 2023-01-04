const express = require('express');
const validate = require('../../middlewares/validate');
const tenancyValidation = require('../../validations/tenancy.validation');
const tenancyController = require('../../controllers/tenancy.controller');

const router = express.Router();

// Endpoint: /tenancy
router.route('/').post(validate(tenancyValidation.getTenancy), tenancyController.getTenancy);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Tenancy
 *   description: Check the details of Tenancy
 */

/**
 * @swagger
 * /core/tenancy:
 *   post:
 *     summary: Get details of Tenancy
 *     tags: [Status]
 *     responses:
 *       "200":
 *         description: Successful
 *       "400":
 *         description: Something wrong
 */
