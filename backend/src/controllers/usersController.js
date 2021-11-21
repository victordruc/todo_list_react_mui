const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Tasks = require("../models/Tasks");

class UsersController {
  async register(req, res) {
    try {
      const { email, password, repeatPassword } = req.body;
      const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (await Users.findOne({ email })) {
        return res.status(400).json({ message: "User exist" });
      } else if (!email) {
        return res.status(400).json({ message: "User email is empty" }); 
      } else if (!emailReg.test(email)) {
        return res.status(400).json({ message: "User email is not valid" });
      } else if (!password) {
        return res.status(400).json({ message: "Password is empty" });
      } else if (password !== repeatPassword) {
        return res.status(400).json({ message: "Password do not match" });
      } 

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await Users.create({ email, password: hashedPassword });
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRE_TOKEN,
      });

      res.json({ token, user: { email } });
    } catch {
      res.status(404).send({ error: "Error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Error password" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRE_TOKEN,
      });

      res.json({ token, user: { email } });
    } catch {
      res.status(404).send({ error: "Error" });
    }
  }

  async changePassword(req, res) {
    try {
      const { password, repeatPassword } = req.body;

      if (!password) {
        return res.status(400).json({ message: "Password is empty" });
      } else if (password !== repeatPassword) {
        return res.status(400).json({ message: "Password do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await Users.findByIdAndUpdate(req.user.userId, {
        password: hashedPassword,
      });

      res.json({ message: "Password changed" });
    } catch {
      res.status(404).send({ error: "Error" });
    }
  }

  async getAuthUser(req, res) {
    try {
      const user = await Users.findOne({ _id: req.user.userId });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      res.json({ email: user.email });
    } catch {
      res.status(404).send({ error: "Error" });
    }
  }

  async delete(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ _id: req.user.userId });
      const isMatch = await bcrypt.compare(password, user.password);

      if (user.email !== email) {
        return res.status(400).json({ message: "User incorect" });
      } else if (!email) {
        return res.status(400).json({ message: "User email is empty" });
      } else if (!password) {
        return res.status(400).json({ message: "Password is empty" });
      } else if (!isMatch) {
        return res.status(400).json({ message: "Password incorect" });
      }

      await user.deleteOne();
      await Tasks.deleteMany({ user: req.user.userId });

      res.json({ message: "User Deleted" });
    } catch {
      res.status(404).send({ error: "Error" });
    }
  }
}

module.exports = new UsersController();