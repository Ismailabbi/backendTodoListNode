// Quokka.js

const TaskModel = require("../models/task");
const mongoose = require("mongoose");
const tasktoJson = require("../adapters/taskAdapter");

module.exports.createTask = (req, res) => {
  const userId = mongoose.Types.ObjectId(req.auth.id);

  const task = new TaskModel({ userId: userId, ...req.body });

  task
    .save()
    .then(() => {
      res.status(201).json(tasktoJson(task));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
};

module.exports.getTasksByUserId = (req, res) => {
  const userId = req.auth.id;
  TaskModel.find(
    { userId: mongoose.Types.ObjectId(userId) },
    (error, resources) => {
      if (error) {
        res.status(404).json({
          message: "requested resources not found ",
        });
      } else {
        const tasks = resources.map((task) => {
          return tasktoJson(task);
        });
        res.status(200).json(tasks);
      }
    }
  );
}




module.exports.updateTask = (req, res) => {
  const updateTasek = req.body;
  TaskModel.findByIdAndUpdate(
    updateTasek.id,
    updateTasek,
    { new: true },
    (err, task) => {
      if (err) return res.status(500).send(err);
      return res.send(tasktoJson(task));
    }
  );
};

module.exports.deleteTask = (req, res) => {
  TaskModel.deleteOne({ _id: req.task.id }, (error, ressources) => {
    if (error) return res.status(500).send(err);
    else {
      TaskModel.find({}, (err, ressources) => {
        const tasks = ressources.map((task) => tasktoJson(task));
        res.status(200).json(tasks);
      });
    }
  });
};
