import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const id = req.nextUrl.pathname.split('/').pop();

	try {
		const user = await prisma.user.findUnique({
			where: { id },
		});
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}
		return NextResponse.json({ user });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	const id = req.nextUrl.pathname.split('/').pop();
	const body = await req.json();

	try {
		const user = await prisma.user.update({
			where: { id },
			data: body,
		});

		return NextResponse.json({ success: true, user });
	} catch {
		return NextResponse.json({ error: 'User update failed' }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest) {
	const id = req.nextUrl.pathname.split('/').pop();
	const body = await req.json();

	const isoDate = new Date(body.birthdate).toISOString(); // "1999-01-01T00:00:00.000Z"
	try {
		const user = await prisma.user.update({
			where: { id },
			data: {
				aboutMe: body.aboutMe,
				birthdate: isoDate,
				street: body.address?.street,
				city: body.address?.city,
				state: body.address?.state,
				zip: body.address?.zip,
			},
		});

		return NextResponse.json({ success: true, user });
	} catch {
		return NextResponse.json({ error: 'User update failed' }, { status: 500 });
	}
}
