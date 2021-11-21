const express = require("express")
const tasksController = require("../controllers/tasksController")
const auth = require("../middleware/auth")

const tasksRouter = express.Router()

tasksRouter.get("/",auth,tasksController.get)
tasksRouter.get("/:id",auth,tasksController.getOne)
tasksRouter.post("/",auth,tasksController.post)
tasksRouter.delete("/delete/:id",auth,tasksController.delete)
tasksRouter.patch("/update/:id",auth,tasksController.update)

module.exports = tasksRouter