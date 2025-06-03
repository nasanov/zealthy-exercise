'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';
import AboutMe from '@/components/AboutMe';
import Address from '@/components/Address';
import Birthdate from '@/components/Birthdate';

export default function Step3() {
	const [config, setConfig] = useState<string[]>([]);
	const [aboutMe, setAboutMe] = useState('');
	const [birthdate, setBirthdate] = useState('');
	const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '' });
	const [error, setError] = useState('');
	const router = useRouter();

	useEffect(() => {
		const fetchConfig = async () => {
			const res = await fetch('/api/config');
			const data = await res.json();
			setConfig(data.step3 || []);
		};
		fetchConfig();

		const fetchUser = async () => {
			const userId = localStorage.getItem('userId');
			if (!userId) return;
			const res = await fetch(`/api/users/${userId}`);
			if (!res.ok) return;
			const data = await res.json();
			console.log(data);
			if (data.user) {
				setAboutMe(data.user.aboutMe || '');
				setBirthdate(data.user.birthdate ? data.user.birthdate.slice(0, 10) : '');
				setAddress({
					street: data.user.street || '',
					city: data.user.city || '',
					state: data.user.state || '',
					zip: data.user.zip || '',
				});
			}
		};
		fetchUser();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const userId = localStorage.getItem('userId');
		if (!userId) {
			setError('User not found.');
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
			return;
		}

		router.push('/done');
	};

	return (
		<div className="page-container">
			<ProgressBar current={3} total={3} />
			<h1 className="page-title">Step 3</h1>

			<form onSubmit={handleSubmit}>
				{config.includes('aboutMe') && <AboutMe value={aboutMe} onChange={setAboutMe} />}
				{config.includes('birthdate') && <Birthdate value={birthdate} onChange={setBirthdate} />}
				{config.includes('address') && <Address address={address} onChange={setAddress} />}

				{error && <p className="form-error">{error}</p>}

				<button type="submit" className="form-submit">
					Finish
				</button>
			</form>
		</div>
	);
}
