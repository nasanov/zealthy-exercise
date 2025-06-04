'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';

export default function Step1() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const res = await fetch('/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();
		setLoading(false);

		if (!res.ok) {
			setError(data.error || 'Something went wrong');
			return;
		}

		if (data.userId) {
			localStorage.setItem('userId', data.userId);
			router.push('/step2');
		}
	};

	return (
		<div className="page-container">
			<ProgressBar current={1} total={3} />

			<h1 className="page-title">Step 1: Register</h1>

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label className="form-label">Email:</label>
					<input
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						className="form-input"
					/>
				</div>

				<div className="form-group">
					<label className="form-label">Password:</label>
					<input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						className="form-input"
					/>
				</div>

				{error && <p className="form-error">{error}</p>}

				<button type="submit" className="form-submit">
					{loading ? 'Loading...' : 'Continue'}
				</button>
			</form>
		</div>
	);
}
