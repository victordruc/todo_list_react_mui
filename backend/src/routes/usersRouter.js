const express = require("express")
const usersController = require("../controllers/usersController")
const auth = require("../middleware/auth")
const usersRouter = express.Router()

usersRouter.get("/",auth,usersController.getAuthUser)
usersRouter.post("/register",usersController.register)
usersRouter.post("/login",usersController.login)
usersRouter.patch("/change-password",auth,usersController.changePassword)
usersRouter.delete("/delete",auth,usersController.delete)

module.exports = usersRouter