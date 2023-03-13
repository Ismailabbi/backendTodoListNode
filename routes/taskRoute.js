const express = require('express');
const taskRouter = express.Router();
const taskControllerModule = require('../controllers/taskController');
const getTaskById = require('../middleware/taskId')


//Create Task
taskRouter.post('/',taskControllerModule.createTask)

//Get Tasks By user Id
taskRouter.get('/',taskControllerModule.getTasksByUserId)

//Update Task by  Id 
taskRouter.put('/',taskControllerModule.updateTask),



//Delete Task by id 

taskRouter.delete('/:id',getTaskById.getTaskById,taskControllerModule.deleteTask)


module.exports = taskRouter