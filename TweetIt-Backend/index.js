const express = require('express')
var cors = require('cors')
const { register } = require('./prometheus/metrics');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const mongoose = require('mongoose')
const uri = "mongodb+srv://admin:admin@cluster0.euwrj.mongodb.net/tweet-db";

const PORT = 5000;

const userRouter = require("./routes/User");
const tweetRouter = require("./routes/Tweet");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tweet API",
            version: "1.0.0",
            description: "Tweet App API"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);

const app = express()

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(cors());

app.use("/api/v1.0/tweets/",userRouter);
app.use("/api/v1.0/tweets/",tweetRouter);

mongoose.connect(uri).then(() =>{
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
        console.log(`Server started running at port: ${PORT}`);
    });
}).catch((err) => {
    console.log('Error connecting to database' + err);
});

app.get('/metrics', async function (req, res) {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
})