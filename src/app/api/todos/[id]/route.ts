import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Todo from '@/models/Todo';
import { protect } from '@/lib/auth';
import { todoSchema } from '@/lib/validations';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await protect(req);
        if (!user) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();

        const validation = todoSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const { task, completed, dueDate, priority } = validation.data;

        const todo = await Todo.findById(id);

        if (!todo) {
            return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
        }

        // Verify ownership
        if (todo.user.toString() !== user._id.toString()) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
        }

        todo.task = task || todo.task;
        todo.completed = completed !== undefined ? completed : todo.completed;
        if (dueDate !== undefined) todo.dueDate = dueDate;
        if (priority !== undefined) todo.priority = priority;

        const updatedTodo = await todo.save();
        return NextResponse.json(updatedTodo);

    } catch (error: any) {
        if (error.message.includes('Not authorized')) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        }
        console.error('Error in PUT todo:', error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await protect(req);
        if (!user) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
        }

        const { id } = await params;
        const todo = await Todo.findById(id);

        if (!todo) {
            return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
        }

        // Verify ownership
        if (todo.user.toString() !== user._id.toString()) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
        }

        await todo.deleteOne();
        return NextResponse.json({ message: 'Todo removed' });

    } catch (error: any) {
        if (error.message.includes('Not authorized')) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        }
        console.error('Error in DELETE todo:', error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}
