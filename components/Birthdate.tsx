type Props = {
	value: string;
	onChange: (val: string) => void;
};

export default function Birthdate({ value, onChange }: Props) {
	return (
		<div style={{ marginBottom: '1rem' }}>
			<label>Birthdate:</label>
			<br />
			<input className="form-date" type="date" value={value} onChange={e => onChange(e.target.value)} />
		</div>
	);
}
