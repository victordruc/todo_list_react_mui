const express = require("express");
const tasksRouter = require("./src/routes/tasksRouter");
const usersRouter = require("./src/routes/usersRouter");
const connectDB = require("./src/connectionDB/connectionMongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api/tasks", tasksRouter)
app.use("/api/users", usersRouter)

connectDB().then(res => {
        app.listen(port, () => {
            console.log(`Server run on port: ${port}`)
        })
    })
    .catch(err => console.log(err));