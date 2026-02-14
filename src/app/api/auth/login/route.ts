import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

import { loginSchema } from '@/lib/validations';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const { email, password } = validation.data;

        const user = await User.findOne({ email });

        if (user && (await (user as any).matchPassword(password))) {
            const token = generateToken(user._id as any);

            (await cookies()).set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60, // 30 days
                path: '/',
            });

            return NextResponse.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: token,
                avatar: user.avatar,
            });
        } else {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}
