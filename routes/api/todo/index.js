const router = require('express').Router();
const { createTodo, getTodos, getTodoById, updateTodoById, deleteTodoById } = require('../../../controllers/todoController');

router.route('/')
    .get(getTodos)
    .post(createTodo)

router.route('/:todoId')
    .get(getTodoById)
    .put(updateTodoById)
    .delete(deleteTodoById)
module.exports =router;