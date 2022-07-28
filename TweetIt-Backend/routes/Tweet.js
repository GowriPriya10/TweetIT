const express = require("express");
const router = express.Router();
const tweetController = require('../controllers/Tweet');

/**
 * @swagger
 * components:
 *  schemas:
 *      Tweet-post:
 *          type: object
 *          required:
 *              - text
 *          properties:
 *              text:
 *                  type: string
 *                  description: Tweet content
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
 *  name: Tweets
 *  description: Tweets api
 */

/**
 * @swagger
 * /api/v1.0/tweets/{username}/add:
 *  post:
 *      summary: Post a tweet
 *      tags: [Tweets]
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
 *                      $ref: '#/components/schemas/Tweet-post'
 *      responses:
 *          200:
 *              description: Tweet posted!
 *          201:
 *              description: Tweet length exceeds limit
 */
router.post('/:username/add', tweetController.addTweet);

/**
 * @swagger
 * /api/v1.0/tweets/all:
 *  get:
 *      summary: Get all tweets
 *      tags: [Tweets]
 *      responses:
 *          200:
 *              description: Returned all tweets
 */
router.get('/all', tweetController.getAllTweets);

/**
 * @swagger
 * /api/v1.0/tweets/{username}:
 *  get:
 *      summary: Get all tweets posted by user
 *      tags: [Tweets]
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: Username
 *      responses:
 *          200:
 *              description: Returned tweets posted by user
 */
router.get('/:username', tweetController.getUserTweets);

/**
 * @swagger
 * /api/v1.0/tweets/{username}/like/{id}:
 *  put:
 *      summary: Like tweet
 *      tags: [Tweets]
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: Username
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: Id of tweet
 *      responses:
 *          200:
 *              description: Liked tweet
 */
router.put('/:username/like/:id', tweetController.likeTweet);

/**
 * @swagger
 * /api/v1.0/tweets/{username}/reply/{id}:
 *  post:
 *      summary: Reply to Tweet
 *      tags: [Tweets]
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: Username
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: Id of tweet
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Tweet-post'
 *      responses:
 *          200:
 *              description: Replyed to Tweet
 */
router.post('/:username/reply/:id', tweetController.replyTweet);

/**
 * @swagger
 * /api/v1.0/tweets/{username}/update/{id}:
 *  put:
 *      summary: Update to Tweet
 *      tags: [Tweets]
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: Username
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: Id of tweet
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Tweet-post'
 *      responses:
 *          200:
 *              description: Updated Tweet
 *          500:
 *              description: Something went worng
 */
router.put('/:username/update/:id', tweetController.updateTweet);

/**
 * @swagger
 * /api/v1.0/tweets/{username}/delete/{id}:
 *  delete:
 *      summary: Delete Tweet
 *      tags: [Tweets]
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: Username
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: Id of tweet
 *      responses:
 *          200:
 *              description: Deleted Tweet
 *          500:
 *              description: Something went worng
 */
router.delete('/:username/delete/:id', tweetController.deleteTweet);

module.exports = router;