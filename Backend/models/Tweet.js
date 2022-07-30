const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
    username:{type: String, required: true},
    time: {type: String, required: true},
    text: {type: String, required:true},
    tags: Array,
    likes: {type: Array, of: String},
    replies: Array
})

module.exports = mongoose.model("Tweet",TweetSchema)