module.exports = function tasktoJson(task){
  console.log(task)
    return {
      "name": task.name,
      "status":task.status,
      "id":task._id
    }
  }