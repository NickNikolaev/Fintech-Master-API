const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {
  apiValidation,
  apiVersionValidation,
  apiEndpointValidation,
  apiVersionEndpointValidation,
} = require('../../validations');
const {
  apiController,
  apiVersionController,
  apiEndpointController,
  apiVersionEndpointController,
} = require('../../controllers');
const { apiMiddleware } = require('../../middlewares');

const router = express.Router();

// Endpoint: /apis
router
  .route('/')
  .post(validate(apiValidation.createApi), apiController.createApi)
  .get(auth('getApis'), validate(apiValidation.getApis), apiController.getApis);

router
  .route('/:apiId')
  .get(auth('getApis'), validate(apiValidation.getApi), apiController.getApi)
  .put(validate(apiValidation.updateApi), apiController.updateApi)
  .delete(validate(apiValidation.deleteApi), apiController.deleteApi);

router
  .route('/:apiId/versions')
  .post(validate(apiVersionValidation.createApiVersion), apiVersionController.createApiVersion)
  .get(validate(apiVersionValidation.getApiVersions), apiMiddleware.validateApiId, apiVersionController.getApiVersions);

router
  .route('/:apiId/versions/:versionId')
  .get(validate(apiVersionValidation.getApiVersion), apiMiddleware.validateApiId, apiVersionController.getApiVersion)
  .put(
    validate(apiVersionValidation.updateApiVersion),
    apiMiddleware.validateApiId,

    apiVersionController.updateApiVersion
  )
  .delete(
    validate(apiVersionValidation.deleteApiVersion),
    apiMiddleware.validateApiId,
    apiVersionController.deleteApiVersion
  );

router
  .route('/:apiId/versions/:versionId/endpoints')
  .post(
    validate(apiVersionEndpointValidation.createApiVersionEndpoint),
    apiMiddleware.validateApiId,
    apiMiddleware.validateApiVersionId,

    apiVersionEndpointController.createApiVersionEndpoint
  )
  .get(
    validate(apiVersionEndpointValidation.getApiVersionEndpoints),
    apiMiddleware.validateApiId,
    apiMiddleware.validateApiVersionId,
    apiVersionEndpointController.getApiVersionEndpoints
  );

router
  .route('/:apiId/versions/:versionId/endpoints/:endpointId')
  .get(
    validate(apiVersionEndpointValidation.getApiVersionEndpoint),
    apiMiddleware.validateApiId,
    apiMiddleware.validateApiVersionId,
    apiVersionEndpointController.getApiVersionEndpoint
  )
  .put(
    validate(apiVersionEndpointValidation.updateApiVersionEndpoint),
    apiMiddleware.validateApiId,
    apiMiddleware.validateApiVersionId,
    apiMiddleware.validateApiVersionEndpointId,

    apiVersionEndpointController.updateApiVersionEndpoint
  )
  .delete(
    validate(apiVersionEndpointValidation.deleteApiVersionEndpoint),
    apiMiddleware.validateApiId,
    apiMiddleware.validateApiVersionId,
    apiMiddleware.validateApiVersionEndpointId,
    apiVersionEndpointController.deleteApiVersionEndpoint
  );

router
  .route('/:apiId/endpoints')
  .get(validate(apiEndpointValidation.getApiEndpoints), apiMiddleware.validateApiId, apiEndpointController.getApiEndpoints);

router
  .route('/:apiId/endpoints/:endpointId')
  .get(validate(apiEndpointValidation.getApiEndpoint), apiMiddleware.validateApiId, apiEndpointController.getApiEndpoint)
  .put(
    validate(apiEndpointValidation.updateApiEndpoint),
    apiMiddleware.validateApiId,
    apiMiddleware.validateApiEndpointId,

    apiEndpointController.updateApiEndpoint
  )
  .delete(
    validate(apiEndpointValidation.deleteEndpoint),
    apiMiddleware.validateApiId,
    apiMiddleware.validateApiEndpointId,
    apiEndpointController.deleteApiEndpoint
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   endpoint: /apis
 *   name: API
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     description: Only admins can create other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                  type: string
 *                  enum: [user, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: user
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all users
 *     description: Only admins can retrieve all users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: User name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: User role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a user
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a user
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
