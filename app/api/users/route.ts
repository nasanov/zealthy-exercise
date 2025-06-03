import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { email, password } = body;

	if (!email || !password) {
		return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
	}

	// Basic email format validation
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
	}

	// Password length check
	if (password.length < 6) {
		return NextResponse.json({ error: 'Password too short' }, { status: 400 });
	}

	try {
		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing) {
			return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: { email, password: hashedPassword },
		});

		return NextResponse.json({ userId: user.id });
	} catch {
		return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
	}
}
