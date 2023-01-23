const cors=require("cors")
const express = require('express');
const cookies=require("cookie-parser")
const route = require('./router');
const mongoose=require("mongoose")
mongoose.set('strictQuery', true);
const app=express()
require("dotenv").config()
app.use(express.json());

mongoose.connect("mongodb+srv://Saurabh-FunctionUp:SAURABHtiwari2501@cluster0.ppnw4vg.mongodb.net/React-Book-Management", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))
app.use(cors())
app.use(cookies())
app.use('/', route);

app.listen(4000, function () {
    console.log('Express app running on port ' + (4000))
});