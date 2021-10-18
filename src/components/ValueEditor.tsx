import {
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
	TextField,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function RadioButtonsGroup({
	options,
	value,
	setOptions,
	name,
}: {
	options: string[];
	value: string;
	setOptions?: () => void;
	name: string;
}) {
	const [selectedValue, setSelectedValue] = useState(value);
	const [newValue, setNewValue] = useState('');
	useEffect(() => {
		setSelectedValue(newValue);
	}, [newValue]);
	return (
		<FormControl component='fieldset'>
			<FormLabel component='legend'>{name}</FormLabel>
			<RadioGroup
				aria-label={name}
				name={name}
				value={selectedValue}
				onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) =>
					setSelectedValue(value)
				}
			>
				{options.map((option, index) => (
					<FormControlLabel
						value={option}
						control={<Radio />}
						label={option}
						key={index + option + name}
					/>
				))}
				<FormControlLabel
					value={newValue}
					control={<Radio />}
					label={
						<TextField
							variant='standard'
							placeholder='Add a new value'
							onFocus={() => setSelectedValue(newValue)}
							onBlur={(event) => setNewValue(event.target.value)}
						/>
					}
				/>
			</RadioGroup>
		</FormControl>
	);
}
