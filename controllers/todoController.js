const { Todo } = require('../model');

module.exports = {
    createTodo: async (req, res) => {
        const { text } = req.body;
        if(text === "") {
            return res.status(401).json({error: 'Please enter a todo!'})
        }
        try {
            const newTodo = await Todo.create({text});
            res.json(newTodo);
        } catch (error) {
            res.json(error);
        }
    },
    getTodos: async (req, res) => {
        try {
            const todos = await Todo.find();
            res.json(todos);
        } catch (error) {
            res.json(error);
        }
    },
    getTodoById: async (req, res) => {
        const { todoId } = req.params
        try {
            const todo = await Todo.findById(todoId);
            res.json(todo);
        } catch (error) {
            res.json(error);
        }
    },
    updateTodoById: async (req, res) => {
        const { todoId } = req.params
        try {
            const updatedTodo = await Todo.findByIdAndUpdate(
                todoId,
                {...req.body},
                {
                    new: true,
                    runValidators: true
                }
            );
            res.json(updatedTodo);
        } catch (error) {
            res.json(error);
        }
    },
    deleteTodoById: async (req, res) => {
        const { todoId } = req.params
        try {
            const deletedTodo = await Todo.findByIdAndDelete(todoId)
            res.json(deletedTodo);
        } catch (error) {
            res.json(error);
        }
    },
}