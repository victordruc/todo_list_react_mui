const mongoose = require("mongoose");

const tasks = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    priority: { type: Boolean, required: true },
    status: { type: Boolean, required: true },
    user: {type: mongoose.Types.ObjectId, ref: 'Users'}
},{
    collection: "tasks",
    versionKey: false
}
)

module.exports = mongoose.model("Tasks", tasks)