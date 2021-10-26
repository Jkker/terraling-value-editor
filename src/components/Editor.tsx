import {
	Card,
	CardContent,
	Stack,
	Typography,
	SvgIconProps,
	ToggleButton,
	ToggleButtonGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
	Radio,
  Button,
	RadioGroup,
	TextField,
} from '@mui/material';
import { ILingProperty } from '../types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';
import HistoryIcon from '@mui/icons-material/History';
import SendIcon from '@mui/icons-material/Send';
import React, { useState, useEffect } from 'react';

type ValueEditorProps = {
	handleChange: (value: string) => void;
};

function SurenessEditor({ sureness: value, updateProperty, showFormLabel = true }: any) {
	return (
		<FormControl component='fieldset'>
			{showFormLabel && (
				<FormLabel component='legend' sx={{ mb: 1 }}>
					How sure are you?
				</FormLabel>
			)}
			<ToggleButtonGroup
				value={value}
				exclusive
				onChange={(event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
					if (value) updateProperty({ sureness: value });
				}}
			>
				<ToggleButton value='certain' color={value === 'certain' ? 'success' : 'standard'}>
					<CheckCircleIcon
						sx={{ marginRight: 1, mx: 'auto' }}
						color={value === 'certain' ? 'success' : 'action'}
					/>
				</ToggleButton>
				<ToggleButton value='revisit' color={value === 'revisit' ? 'warning' : 'standard'}>
					<HistoryIcon
						sx={{ marginRight: 1, mx: 'auto' }}
						color={value === 'revisit' ? 'warning' : 'action'}
					/>
				</ToggleButton>
				<ToggleButton value='need_help' color={value === 'need_help' ? 'error' : 'standard'}>
					<HelpIcon
						sx={{ marginRight: 1, mx: 'auto' }}
						color={value === 'need_help' ? 'error' : 'action'}
					/>
				</ToggleButton>
			</ToggleButtonGroup>
		</FormControl>
	);
}
function RadioButtonsGroup({
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

export default function Editor(props: ILingProperty & ValueEditorProps) {
	const { name, value, available_values: options, example, sureness, handleChange } = props;
	const [newValue, setNewValue] = useState('');
	const [selectedValue, setSelectedValue] = useState(value);
	return (
		<div>
			<Stack spacing={2}>
				<Card>
					<CardContent>
						<Stack spacing={1}>
							<form onSubmit={()}>
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
                <Button variant="contained" endIcon={<SendIcon />}>
                  Send
                </Button>
							</form>

							<SurenessEditor sureness={sureness} updateProperty={handleChange} />
						</Stack>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<Stack spacing={1}>
							<Typography variant='h5'>Example: {example?.name}</Typography>
							<Typography variant='body1'>{example?.value}</Typography>
						</Stack>
					</CardContent>
				</Card>
			</Stack>
		</div>
	);
}
