import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        const user = await User.findOne({ email });

        if (user && (await (user as any).matchPassword(password))) {
            return NextResponse.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id as any),
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
