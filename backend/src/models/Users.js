const mongoose = require("mongoose");

const users = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tasks: [{ type: mongoose.Types.ObjectId, ref: 'Tasks' }]
})

module.exports = mongoose.model('Users', users)