const mongoose = require('mongoose');




const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
      type: String,
      enum: ['toDo', 'inProgress', 'Finished']
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required :true
    },
    
})










const Task = mongoose.model("Task",taskSchema);

module.exports = Task