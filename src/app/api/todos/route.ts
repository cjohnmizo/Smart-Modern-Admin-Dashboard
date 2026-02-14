import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Todo from '@/models/Todo';
import { protect } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        const user = await protect(req);
        if (!user) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
        }

        const todos = await Todo.find({ user: user._id as any });
        return NextResponse.json(todos);
    } catch (error: any) {
        if (error.message.includes('Not authorized')) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        }
        console.error('Error in GET todos:', error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}

import { todoSchema } from '@/lib/validations';

// ... (existing code)

export async function POST(req: Request) {
    try {
        const user = await protect(req);
        if (!user) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
        }

        const body = await req.json();
        const validation = todoSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const { task, dueDate, priority } = validation.data;

        const todo = await Todo.create({
            user: user._id as any,
            task,
            dueDate,
            priority,
            completed: false,
        });

        return NextResponse.json(todo, { status: 201 });
    } catch (error: any) {
        if (error.message.includes('Not authorized')) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        }
        console.error('Error in POST todo:', error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}
