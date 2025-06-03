type Props = {
	value: string;
	onChange: (val: string) => void;
};

export default function AboutMe({ value, onChange }: Props) {
	return (
		<div style={{ marginBottom: '1rem' }}>
			<label>About Me:</label>
			<br />
			<textarea className="form-textarea" value={value} onChange={e => onChange(e.target.value)} rows={4} />
		</div>
	);
}
