const User = require('../models/User')
const { requestCount, userCount } = require('../prometheus/metrics');

exports.register = async(req, res) => {
    const userData = req.body;
    let user = await User.findOne({ email: userData.email });
    if(user){
        requestCount.inc();
        return res.status(400).send('User already exisits!');
    }else{
        User.create(userData).then((user) => {
            requestCount.inc(); //metrics collection
            userCount.inc(); //metrics collection

            console.log(`User - ${userData.username} registered successfully!!`);
            res.status(200).json(user);
        }).catch((err) => {
            res.status(500).json("Failed to create user");
            console.log(err);
        })
    }
};

exports.login = async(req, res) => {
    const userData = req.body;

    let user = await User.findOne({ username: userData.username });

    requestCount.inc(); //metrics collection

    if(!user){
        console.log("User doesn't exist")
        res.status(404).send({error: "Error login, User not found!! "});
    }else{
        if (userData.password == user.password) {
            console.log(`${user.username} Login Successfull`);
            res.send(user);
        } else {
            res.status(201).send({error:"Wrong username and password combination"});
        }
    }
};

exports.getUsers = async(req, res) => {
    User.find().then((users) => {
        requestCount.inc(); //metrics collection

        console.log("Returning all the users info");
        res.send(users);
    }).catch((err) =>{
        console.log(err);
    })
};

exports.searchUser = async(req, res) => {

    User.findOne({username: req.params.username}).then((user) => {
        requestCount.inc(); //metrics collection
        if(user){
            console.log(`User ${user.username} found!!`);
            res.send(user);   
        }else{
            console.log(`User ${req.params.username} not found!!`);
            res.status(404).send(`User ${req.params.username} not found!!`);
        }
    }).catch((err) =>{
        console.log(err);
        res.status(500).send(`Something went wrong ${err}`);
    })

};

exports.updatePassword = async(req, res) => {
    const username = req.params.username;
    const { password } = req.body;
    User.findOne({username: req.params.username}).then((user) => {
        requestCount.inc(); //metrics collection

        if(user){
            User.updateOne({ username: username }, { password: password }).then(() => {
                console.log(`${username} password updated!`);
                res.send(`${username} password updated Successfuly!!`)
            }).catch((err) => {
                console.log(err);
            })
        }else{
            res.status(404).send(`User ${username} not found!!`);
        }
    }).catch((err) =>{
        console.log(err);
        res.send(err.message);
    })
};
