'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';
import AboutMe from '@/components/AboutMe';
import Address from '@/components/Address';
import Birthdate from '@/components/Birthdate';

export default function Step2() {
	const [config, setConfig] = useState<string[]>([]);
	const [aboutMe, setAboutMe] = useState('');
	const [birthdate, setBirthdate] = useState('');
	const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '' });
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchConfig = async () => {
			const res = await fetch('/api/config');
			const data = await res.json();
			setConfig(data.step2 || []);
		};
		fetchConfig();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const userId = localStorage.getItem('userId');
		if (!userId) {
			setError('User not found.');
			setLoading(false);
			return;
		}

		const res = await fetch(`/api/users/${userId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				aboutMe,
				birthdate,
				address,
			}),
		});

		if (!res.ok) {
			const data = await res.json();
			setError(data.error || 'Something went wrong');
			setLoading(false);
			return;
		}

		router.push('/step3');
	};

	return (
		<div className="page-container">
			<ProgressBar current={2} total={3} />
			<h1 className="page-title">Step 2</h1>

			<form onSubmit={handleSubmit}>
				{config.includes('aboutMe') && <AboutMe value={aboutMe} onChange={setAboutMe} />}
				{config.includes('birthdate') && <Birthdate value={birthdate} onChange={setBirthdate} />}
				{config.includes('address') && <Address address={address} onChange={setAddress} />}

				{error && <p className="form-error">{error}</p>}

				<button type="submit" className="form-submit" disabled={loading}>
					{loading ? 'Loading...' : 'Continue'}
				</button>
			</form>
		</div>
	);
}
