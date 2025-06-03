import React from 'react';

type Props = {
	current: number;
	total: number;
};

export default function ProgressBar({ current, total }: Props) {
	const percent = (current / total) * 100;

	return (
		<div style={{ marginBottom: '2rem' }}>
			<div style={{ marginBottom: '0.5rem' }}>
				Step {current} of {total}
			</div>
			<div style={{ backgroundColor: '#ddd', height: '8px', borderRadius: '4px' }}>
				<div
					style={{
						width: `${percent}%`,
						backgroundColor: '#0070f3',
						height: '8px',
						borderRadius: '4px',
					}}
				/>
			</div>
		</div>
	);
}
