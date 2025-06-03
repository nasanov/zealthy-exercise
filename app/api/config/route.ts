import { NextResponse } from 'next/server';

// Change this later
let config = {
	step2: ['aboutMe', 'birthdate'],
	step3: ['address'],
};

export async function GET() {
	return NextResponse.json(config);
}

export async function POST(req: Request) {
	const body = await req.json();

	if (!body.step2 || !body.step3) {
		return NextResponse.json({ error: 'step2 and step3 required' }, { status: 400 });
	}

	config = {
		step2: body.step2,
		step3: body.step3,
	};

	return NextResponse.json({ success: true });
}
