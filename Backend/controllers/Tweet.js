const Tweet = require('../models/Tweet');
const User = require('../models/User');
const { requestCount, tweetCount } = require('../prometheus/metrics');
const logger = require('../logger/index')();

exports.addTweet = async (req, res) => {

    const username = req.params.username;
    const tweet = req.body.text;

    var newTweet = {}
    var tags = tweet.match(/(#[a-zA-Z_123456780]*)/g);

    User.findOne({ username: username }).then((user) => {
        if (user) {
            newTweet['text'] = tweet;
            newTweet['tags'] = tags;
            newTweet['username'] = user.username;
            newTweet['time'] = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

            //metrics collection
            requestCount.inc();

            if (tweet.length > 144) {
                logger.info(`Tweet length exceeds!! Limit is 144 characters only!`);
                res.status(201).send(`Tweet length exceeds!! Limit is 144 characters only!`);
            } else {
                Tweet.create(newTweet).then((tweet) => {

                    tweetCount.inc();

                    logger.info(`Tweet by ${username} Posted Successfully!!`);
                    res.send(tweet);
                }).catch((err) => {
                    logger.error(err);
                    res.send({ error: 'Error posting tweet!' });
                });
            }
        }else{
            logger.info(`User not found!!`);
            res.status(404).send('User not found!!');
        }

    }).catch((err) => {
        console.log(err);
        res.send(err.message);
    });
}

exports.getAllTweets = async (req, res) => {
    Tweet.find().then((tweets) => {
        //metrics collection
        requestCount.inc();

        res.send(tweets)
    }).catch((err) => {
        logger.error(err);
    })
}

exports.getUserTweets = async (req, res) => {

    Tweet.find().where('username').equals(req.params.username).then((tweets) => {
        //metrics collection
        requestCount.inc();

        res.send(tweets)
    }).catch((err) => {
        logger.error(err);
    })
}

exports.likeTweet = async (req, res) => {
    const username = req.params.username
    const tweetID = req.params.id
    Tweet.findByIdAndUpdate(tweetID, { $push: { 'likes': username } }).then(() => {
        //metrics collection
        requestCount.inc();
        res.send("Tweet Liked")
    }).catch((err) => {
        logger.error(err + "Tweet not found!");
        res.status(404).send('Tweet not found!')
    })
}

exports.replyTweet = async (req, res) => {
    const tweetID = req.params.id
    const username = req.params.username;
    const tweet = req.body.text;
    var newTweet = {}
    var tags = tweet.match(/(#[a-zA-Z_123456780]*)/g);

    User.findOne({ username: username }).then((user) => {
        if(user){
            newTweet['tags'] = tags;
            newTweet['username'] = user.username;
            newTweet['text'] = tweet;
            newTweet['time'] = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

            Tweet.findByIdAndUpdate(tweetID, { $push: { 'replies': newTweet } }).then(() => {
                //metrics collection
                requestCount.inc();
                tweetCount.inc();

                logger.info(`Tweet by ${username} replied Successfully!!`);
                res.status(200).send('Replied to tweet!');
            }).catch((err) => {
                logger.error(err + "Tweet not found!");
                res.status(404).send('Tweet not found!')
            })
        }
    }).catch((err) => {
        logger.error(err);
        res.send(err.message);
    });

}

exports.updateTweet = async (req, res) => {
    Tweet.findByIdAndUpdate({ '_id': req.params.id, 'username': req.params.username }, { "$set": { "text": req.body["text"] } }).then((tweet) => {
        //metrics collection
        requestCount.inc();

        logger.info(`${req.params.username} has editted tweet - ${req.params.id}`);
        res.send(tweet);
    }).catch((err) => {
        logger.error(err);
        res.status(500).send(err.message);
    });

}

exports.deleteTweet = async (req, res) => {

    Tweet.findOneAndDelete().where({ '_id': req.params.id, username: req.params.username }).then((tweet) => {
        //metrics collection
        requestCount.inc();

        logger.info(`Tweet of id = ${req.params.id} deleted`);
        res.send(tweet);

    }).catch((err) => {
        logger.error(err);
        res.status(500).send(err.message);
    });
}
