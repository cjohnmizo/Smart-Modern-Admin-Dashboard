import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import User from '@/models/User';
import connectDB from '@/lib/db';

import { JWT_SECRET } from '@/lib/jwt';

export async function protect(req: Request) {
    await connectDB();

    let token;

    const authHeader = req.headers.get('authorization');
    const cookieStore = await cookies();
    const tokenFromCookie = cookieStore.get('token');

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            token = authHeader.split(' ')[1];
            const decoded: any = jwt.verify(token, JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');
            return user;
        } catch (error) {
            console.error('Token verification failed:', error);
            throw new Error('Not authorized, token failed');
        }
    }

    if (tokenFromCookie) {
        token = tokenFromCookie.value;
        try {
            const decoded: any = jwt.verify(token, JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');
            return user;
        } catch (error) {
            console.error('Token verification failed:', error);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        throw new Error('Not authorized, no token');
    }
}

