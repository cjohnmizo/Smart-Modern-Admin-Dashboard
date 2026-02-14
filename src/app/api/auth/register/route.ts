import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

import { registerSchema } from '@/lib/validations';

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const { name, email, password } = validation.data;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const isFirstAccount = (await User.countDocuments({})) === 0;

        const user = await User.create({
            name,
            email,
            password,
            isAdmin: isFirstAccount,
        });

        if (user) {
            return NextResponse.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id as any),
                avatar: user.avatar,
            }, { status: 201 });
        } else {
            return NextResponse.json({ message: 'Invalid user data' }, { status: 400 });
        }
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}
