const User = require('../models/User')
const { requestCount, userCount } = require('../prometheus/metrics');
const logger = require('../logger/index')();

exports.register = async(req, res) => {
    const userData = req.body;
    let user = await User.findOne({ email: userData.email });
    if(user){
        requestCount.inc();
        return res.status(400).send('User already exisits!');
    }else{
        User.create(userData).then((user) => {
            //metrics collection
            requestCount.inc();
            userCount.inc();

            logger.info(`User - ${userData.username} registered successfully!!`);
            res.status(200).json(user);
        }).catch((err) => {
            res.status(500).json("Failed to create user");
            logger.error(err);
        })
    }
};

exports.login = async(req, res) => {
    const userData = req.body;

    let user = await User.findOne({ username: userData.username });

    requestCount.inc();

    if(!user){
        logger.info("User doesn't exist")
        res.status(404).send({error: "Error login, User not found!! "});
    }else{
        if (userData.password == user.password) {
            logger.info(`${user.username} Login Successfull`);
            res.send(user);
        } else {
            res.status(201).send({error:"Wrong username and password combination"});
        }
    }
};

exports.getUsers = async(req, res) => {
    User.find().then((users) => {
        //metrics collection
        requestCount.inc();

        logger.warn("Returning all the users info");
        res.send(users);
    }).catch((err) =>{
        logger.error(err);
    })
};

exports.searchUser = async(req, res) => {

    User.findOne({username: req.params.username}).then((user) => {
        //metrics collection
        requestCount.inc();
        if(user){
            logger.info(`User ${user.username} found!!`);
            res.send(user);   
        }else{
            logger.info(`User ${req.params.username} not found!!`);
            res.status(404).send(`User ${req.params.username} not found!!`);
        }
    }).catch((err) =>{
        logger.info(err);
        res.status(500).send(`Something went wrong ${err}`);
    })

};

exports.updatePassword = async(req, res) => {
    const username = req.params.username;
    const { password } = req.body;
    User.findOne({username: req.params.username}).then((user) => {
        //metrics collection
        requestCount.inc();

        if(user){
            User.updateOne({ username: username }, { password: password }).then(() => {
                logger.info(`${username} password updated!`);
                res.send(`${username} password updated Successfuly!!`)
            }).catch((err) => {
                logger.info(err);
            })
        }else{
            res.status(404).send(`User ${username} not found!!`);
        }
    }).catch((err) =>{
        logger.error(err);
        res.send(err.message);
    })
};