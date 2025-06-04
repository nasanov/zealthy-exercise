'use client';

import { useRouter } from 'next/navigation';

export default function Done() {
	const router = useRouter();

	return (
		<div style={{ margin: '100px auto', textAlign: 'center' }}>
			<h1>Thanks for signing up!</h1>
			<p>Your data has been saved.</p>
			<button className="form-submit" style={{ maxWidth: '300px' }} onClick={() => router.push('/data')}>
				Go to Data Table
			</button>
		</div>
	);
}
