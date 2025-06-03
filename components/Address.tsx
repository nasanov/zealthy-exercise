type Props = {
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
	};
	onChange: (val: Props['address']) => void;
};

export default function Address({ address, onChange }: Props) {
	return (
		<div className="form-group">
			<label className="form-label">Address:</label>
			<input
				className="form-input"
				placeholder="Street"
				value={address.street}
				onChange={e => onChange({ ...address, street: e.target.value })}
			/>
			<input
				className="form-input"
				placeholder="City"
				value={address.city}
				onChange={e => onChange({ ...address, city: e.target.value })}
			/>
			<input
				className="form-input"
				placeholder="State"
				value={address.state}
				onChange={e => onChange({ ...address, state: e.target.value })}
			/>
			<input
				className="form-input"
				placeholder="ZIP"
				value={address.zip}
				onChange={e => onChange({ ...address, zip: e.target.value })}
			/>
		</div>
	);
}
