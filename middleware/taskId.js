const Task = require("../models/task");

module.exports.getTaskById = (req,res,next) =>{
    const id = req.params.id;
    if (id) {
      Task.findById({ _id: id }, (error, task) => {
         if(error){
          res.status(404).json({ message: error })
         }
        else {
          req.task  = task
          next()
        }
      });
    } else {
      res.status(404).json({
        message: "bad request",
      });
    }

}