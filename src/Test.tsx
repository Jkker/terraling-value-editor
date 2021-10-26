import DynamicSelect, { OptionType, DynamicRadio } from './components/DynamicSelect';
import { Container } from '@mui/material';
import React, { useState } from 'react';

export default function Test() {
	const [value, setValue] = useState<OptionType>(null);
	const [options, setOptions] = useState<OptionType[]>(['Yes', 'No', 'N/A']);
	return (
		<Container
			sx={{
				p: 2,
				height: '100%',
				width: '100vw',
				justifyContent: 'center',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			{/* <DynamicSelect value={value} setValue={setValue} setOptions={() => {}} /> */}
			<DynamicRadio
				value={value}
				setValue={(v) => {
					console.log(v);
					setValue(v);
				}}
				options={options}
				setOptions={setOptions}
			/>
		</Container>
	);
}
