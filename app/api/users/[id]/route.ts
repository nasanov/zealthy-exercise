import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
	const userId = params.id;
	const body = await req.json();

	try {
		const user = await prisma.user.update({
			where: { id: userId },
			data: body,
		});

		return NextResponse.json({ success: true, user });
	} catch {
		return NextResponse.json({ error: 'User update failed' }, { status: 500 });
	}
}
