const express = require("express");
const router = express.Router();
const userController = require('../controllers/User');

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - firstName
 *              - lastName
 *              - email
 *              - username
 *              - password
 *              - contactNumber
 *          properties:
 *              _id:
 *                  type: string
 *                  description: Auto-generated id of User
 *              firstName:
 *                  type: string
 *                  description: User frist name
 *              lastName:
 *                  type: string
 *                  description: User last name
 *              email:
 *                  type: string
 *                  description: User's email id
 *              username:
 *                  type: string
 *                  description: User's loginId/Username
 *              password:
 *                  type: string
 *                  description: User password
 *              contactNumber:
 *                  type: number
 *                  description: User's contact number
 *      Login:
 *          type: object
 *          required: 
 *              - username
 *              - password
 *          properties:
 *              username: 
 *                  type: string
 *                  description: Username of the user
 *              password:
 *                  type: string
 *                  description: Password of the user
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users api
 */

/**
 * @swagger
 * /api/v1.0/tweets/register:
 *  post:
 *      summary: Register a User
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: User registered!
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          400:
 *              description: User already exists!
 *          500:
 *              description: Something went worng!!
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/v1.0/tweets/login:
 *  post:
 *      summary: Login the user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: User Loggedin
 *          201:
 *              description: Wrong combination of username and password
 *          404:
 *              description: User not found!
 *          
 */
router.post('/login',userController.login);

/**
 * @swagger
 * /api/v1.0/tweets/users/all:
 *  get:
 *      summary: Returns the list of all registered users
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: List of Users registered
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
router.get('/users/all',userController.getUsers);


/**
 * @swagger
 * /api/v1.0/tweets/user/search/{username}:
 *  get:
 *      summary: Get user by username/loginId
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: Username
 *      responses:
 *          200:
 *              description: User by username
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: User not found
 */
router.get('/user/search/:username', userController.searchUser);

/**
 * @swagger
 * /api/v1.0/tweets/{username}/forgot:
 *  put:
 *      summary: Update user password
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: Username
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Password updated
 *          404:
 *              description: User not found
 */
router.put('/:username/forgot',userController.updatePassword);

module.exports = router;