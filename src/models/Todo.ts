import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITodo extends Document {
    task: string;
    completed: boolean;
    user: mongoose.Schema.Types.ObjectId;
    dueDate?: Date;
    priority: 'low' | 'medium' | 'high';
}

const todoSchema = new Schema<ITodo>({
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
}, {
    timestamps: true,
});

// Avoid recompiling model
const Todo = (mongoose.models.Todo as Model<ITodo>) || mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;
