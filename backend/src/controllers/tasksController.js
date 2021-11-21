const Tasks = require("../models/Tasks");

class TasksController {
  async get(req, res) {
    try {
      let response = null;
      let type = null;
      if (req.query.sort) {
        type = req.query.sort;
      } else if (req.query.search) {
        type = "search";
      }
      switch (type) {
        case "name-asc":
          response = await Tasks.find({ user: req.user.userId })
            .collation({ locale: "en" })
            .sort({ name: 1 });
          break;
        case "name-desc":
          response = await Tasks.find({ user: req.user.userId })
            .collation({ locale: "en" })
            .sort({ name: -1 });
          break;
        case "status-asc":
          response = await Tasks.find({ user: req.user.userId }).sort({
            status: 1,
          });
          break;
        case "status-desc":
          response = await Tasks.find({ user: req.user.userId }).sort({
            status: -1,
          });
          break;
        case "deadline-asc":
          response = await Tasks.find({ user: req.user.userId }).sort({
            deadline: 1,
          });
          break;
        case "deadline-desc":
          response = await Tasks.find({ user: req.user.userId }).sort({
            deadline: -1,
          });
          break;
        case "priority-asc":
          response = await Tasks.find({ user: req.user.userId }).sort({
            priority: 1,
          });
          break;
        case "priority-desc":
          response = await Tasks.find({ user: req.user.userId }).sort({
            priority: -1,
          });
          break;

        case "search":
          let search = req.query.search;
          response = await Tasks.find({
            user: req.user.userId,
            $or: [
              { name: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
            ],
          });
          break;

        default:
          response = await Tasks.find({ user: req.user.userId });
      }
      res.json(response);
    } catch {
      res.status(404).send({ error: "Error" });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      res.json(await Tasks.find({ _id: id, user: req.user.userId }));
    } catch {
      res.status(404).send({ error: "Error" });
    }
  }
  async post(req, res) {
    try {
      res.json(await Tasks.create({ ...req.body, user: req.user.userId }));
    } catch {
      res.status(404).send({ error: "Error" });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      res.json(await Tasks.findByIdAndDelete(id));
    } catch {
      res.status(404).send({ error: "Error" });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      res.json(await Tasks.findByIdAndUpdate(id, req.body, { new: true }));
    } catch {
      res.status(404).send({ error: "Error" });
    }
  }
}

module.exports = new TasksController();
