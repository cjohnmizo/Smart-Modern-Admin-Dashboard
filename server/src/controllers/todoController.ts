import { Request, Response } from 'express';
import Todo from '../models/Todo';

// @desc    Get all todos
// @route   GET /api/todos
// @access  Private
export const getTodos = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const todos = await Todo.find({ user: req.user._id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a todo
// @route   POST /api/todos
// @access  Private
export const createTodo = async (req: Request, res: Response) => {
    const { task, dueDate, priority } = req.body;

    try {
        const todo = new Todo({
            // @ts-ignore
            user: req.user._id,
            task,
            dueDate,
            priority,
            completed: false,
        });

        const createdTodo = await todo.save();
        res.status(201).json(createdTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
export const updateTodo = async (req: Request, res: Response) => {
    const { task, completed, dueDate, priority } = req.body;

    try {
        const todo = await Todo.findById(req.params.id);

        if (todo) {
            todo.task = task || todo.task;
            todo.completed = completed !== undefined ? completed : todo.completed;
            if (dueDate !== undefined) todo.dueDate = dueDate;
            if (priority !== undefined) todo.priority = priority;

            const updatedTodo = await todo.save();
            res.json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (todo) {
            await todo.deleteOne();
            res.json({ message: 'Todo removed' });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
