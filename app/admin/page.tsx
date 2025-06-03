'use client';

import { useEffect, useState } from 'react';

const COMPONENTS = ['aboutMe', 'address', 'birthdate'];

export default function AdminPage() {
	const [config, setConfig] = useState<{ [key: string]: 'step2' | 'step3' }>({});
	const [message, setMessage] = useState('');

	useEffect(() => {
		const load = async () => {
			const res = await fetch('/api/config');
			const data = await res.json();
			const existingConfig: { [key: string]: 'step2' | 'step3' } = {};
			data.step2?.forEach((c: string) => (existingConfig[c] = 'step2'));
			data.step3?.forEach((c: string) => (existingConfig[c] = 'step3'));

			setConfig(existingConfig);
		};
		load();
	}, []);

	const handleChange = (component: string, value: 'step2' | 'step3') => {
		setConfig({ ...config, [component]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const step2 = COMPONENTS.filter(c => config[c] === 'step2');
		const step3 = COMPONENTS.filter(c => config[c] === 'step3');

		if (step2.length === 0 || step3.length === 0) {
			setMessage('Each step must have at least one component.');
			return;
		}

		const res = await fetch('/api/config', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ step2, step3 }),
		});

		const data = await res.json();
		setMessage(data.success ? 'Saved!' : 'Error saving config.');
	};

	return (
		<div className="admin-container">
			<h1 className="page-title">Admin: Configure Steps</h1>
			<form onSubmit={handleSubmit}>
				<table className="data-table admin-table">
					<thead>
						<tr>
							<th>Component</th>
							<th>Assigned to</th>
						</tr>
					</thead>
					<tbody>
						{COMPONENTS.map(comp => (
							<tr key={comp}>
								<td>{comp}</td>
								<td>
									<select
										className="form-input"
										value={config[comp] || 'step2'}
										onChange={e => handleChange(comp, e.target.value as 'step2' | 'step3')}
									>
										<option value="step2">Step 2</option>
										<option value="step3">Step 3</option>
									</select>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{message && <p className="form-success">{message}</p>}

				<button type="submit" className="form-submit">
					Save Config
				</button>
			</form>
		</div>
	);
}
