import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Change this later

export async function GET() {
	const configs = await prisma.componentConfig.findMany();
	const step2 = configs.filter(c => c.pageNumber === 2).map(c => c.component);
	const step3 = configs.filter(c => c.pageNumber === 3).map(c => c.component);

	return NextResponse.json({ step2, step3 });
}

export async function POST(req: Request) {
	const body = await req.json();
	const { step2, step3 } = body;

	if (!Array.isArray(step2) || !Array.isArray(step3)) {
		return NextResponse.json({ error: 'step2 and step3 required' }, { status: 400 });
	}

	// Remove all old configs
	await prisma.componentConfig.deleteMany({});

	// Insert new configs
	const data = [
		...step2.map((component: string) => ({ component, pageNumber: 2 })),
		...step3.map((component: string) => ({ component, pageNumber: 3 })),
	];

	await prisma.componentConfig.createMany({ data });

	return NextResponse.json({ success: true });
}
