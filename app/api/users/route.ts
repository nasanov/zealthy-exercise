import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { email, password } = body;

	// TODO: add email and password validations
	if (!email || !password) {
		return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
	}

	// TODO: check if the email is already exists
	try {
		const user = await prisma.user.create({
			data: { email, password },
		});

		return NextResponse.json({ userId: user.id });
	} catch {
		return NextResponse.json({ error: 'Email already exists?' }, { status: 500 });
	}
}
