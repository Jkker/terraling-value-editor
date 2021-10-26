import DeleteIcon from '@mui/icons-material/Delete';
import {
	Box,
	Button,
	FilterOptionsState,
	IconButton,
	ListItem,
	ListItemButton,
	MenuItem,
	TextField,
	Input,
	Tooltip,
	FormControlLabel,
	FormControl,
	FormLabel,
	Radio,
	RadioGroup,
	InputAdornment,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useRef } from 'react';
import CheckIcon from '@mui/icons-material/Check';
export type OptionType = string | null | undefined;
// export type OptionType = {
// 	value: string;
// 	label?: string;
// 	temporary?: boolean;
// };
const filter = createFilterOptions<OptionType>();

interface DynamicSelectProps {
	name?: string;
	options?: OptionType[];
	setOptions: (options: OptionType[]) => void;
	value: OptionType;
	setValue: (value: OptionType) => void;
}

export default function DynamicSelect(props: DynamicSelectProps) {
	const {
		name = 'Ling Property Value',
		options = ['Yes', 'No', 'N/A'],
		value,
		setValue,
		setOptions,
		...restProps
	} = props;

	const tempOption = useRef<OptionType>(null);
	const [toBeDeleted, setToBeDeleted] = useState<OptionType>(null);

	const deleteOption = () => {
		if (toBeDeleted) {
			const newOptions = options.filter((v) => v !== toBeDeleted);
			setOptions(newOptions);
			console.table({ value, toBeDeleted });
			if (value === toBeDeleted) setValue(null);
			setToBeDeleted(null);
		}
	};

	const addOption = (newOption: OptionType) => {
		tempOption.current = null;
		setOptions([...options, newOption]);
	};

	const filterOptions = (options: OptionType[], params: FilterOptionsState<OptionType>) => {
		const filtered = filter(options, params);
		// Suggest the creation of a new value
		const inputValue = params.inputValue;
		const isExisting = options.includes(inputValue);
		if (inputValue && !isExisting) {
			tempOption.current = inputValue;
			filtered.push(inputValue);
		}
		return filtered;
	};

	return (
		<>
			<Autocomplete
				value={value}
				onChange={(event, newValue, reason) => {
					console.log(newValue, reason);
					if (reason === 'selectOption' && !options.includes(newValue)) {
						addOption(newValue);
					}
					setValue(newValue);
				}}
				filterOptions={filterOptions}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				freeSolo
				autoHighlight
				autoComplete
				fullWidth
				forcePopupIcon
				disablePortal
				options={options}
				renderOption={({ className, ...props }, option, state) => (
					<ListItem
						component='div'
						sx={{
							display: 'flex',
						}}
						key={option}
						// {...props}
						disablePadding
						secondaryAction={
							<Tooltip title='Delete' placement='left'>
								<IconButton
									name='delete'
									edge='end'
									onClick={() => setToBeDeleted(option)}
									sx={{
										display: option === tempOption.current ? 'none' : 'block',
										pr: '6px',
										mt: 1 / 2,
									}}
								>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						}
					>
						<MenuItem
							sx={{
								pl: 1.5,
								width: '100%',
								'&.Mui-focused': {
									bgcolor: 'rgba(0,0,0,0.1)',
								},
							}}
							{...props}
						>
							{option === tempOption.current ? (
								<Box sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
									New value: <Box sx={{ color: 'text.primary', pl: 1 }}>{option}</Box>
								</Box>
							) : (
								option
							)}
						</MenuItem>
					</ListItem>
				)}
				sx={{ height: '100%', '.MuiInputBase-root': { height: '100%' } }}
				renderInput={(params) => (
					<TextField
						{...params}
						variant='standard'
						sx={{ height: '100%' }}
						placeholder='Select a value'
					/>
				)}
			/>
			<Dialog
				open={!!toBeDeleted}
				onClose={() => setToBeDeleted(null)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					Delete {toBeDeleted && <b>{toBeDeleted}</b>} from <i>{name}</i>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete this value?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setToBeDeleted(null)}>Cancel</Button>
					<Button onClick={() => deleteOption()} color='error'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export function DynamicRadio(props: DynamicSelectProps) {
	const {
		name = 'Ling Property Value',
		options = ['Yes', 'No', 'N/A'],
		value,
		setValue,
		setOptions,
		...restProps
	} = props;

	const [toBeDeleted, setToBeDeleted] = useState<OptionType>(null);
	const [newOption, setNewOption] = useState<OptionType>('');

	const deleteOption = () => {
		if (toBeDeleted) {
			const newOptions = options.filter((v) => v !== toBeDeleted);
			setOptions(newOptions);
			console.table({ value, toBeDeleted });
			if (value === toBeDeleted) setValue(null);
			setToBeDeleted(null);
		}
	};

	const addNewOption = () => {
		if (!options.includes(newOption)) {
			setOptions([...options, newOption]);
			setValue(newOption);
			setNewOption('');
		}
	};

	return (
		<>
			<FormControl component='fieldset'>
				<FormLabel component='legend'>{name}</FormLabel>
				<RadioGroup
					aria-label={name}
					name={name}
					value={value}
					onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) => setValue(value)}
					sx={{
						'.MuiFormControlLabel-label': {
							width: '100%',
						},
					}}
				>
					{options.map((option, index) => (
						<FormControlLabel
							value={option}
							control={<Radio />}
							label={
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									{option}
									<Tooltip title='Delete'>
										<IconButton
											name='delete'
											edge='end'
											onClick={() => setToBeDeleted(option)}
											sx={{
												pr: '6px',
												mt: 1 / 2,
											}}
										>
											<DeleteIcon />
										</IconButton>
									</Tooltip>
								</Box>
							}
							key={index + name}
						/>
					))}
					<FormControlLabel
						value={newOption}
						control={<Radio />}
						disabled={newOption === '' || options.includes(newOption)}
						disableTypography
						label={
							<Input
								placeholder='Add a new value'
								value={newOption}
								onChange={(event) => {
									setNewOption(event.target.value);
								}}
								endAdornment={
									<InputAdornment position='end'>
										<Tooltip title='Save new value'>
											<IconButton
												sx={{
													display: newOption && !options.includes(newOption) ? 'block' : 'none',
													position: 'absolute',
													right: '0',
												}}
												aria-label='Save new value'
												edge='end'
												onClick={addNewOption}
											>
												<CheckIcon />
											</IconButton>
										</Tooltip>
									</InputAdornment>
								}
							/>
						}
					/>
				</RadioGroup>
			</FormControl>
			<Dialog
				open={!!toBeDeleted}
				onClose={() => setToBeDeleted(null)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					Delete {toBeDeleted && <b>{toBeDeleted}</b>} from <i>{name}</i>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete this value?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setToBeDeleted(null)}>Cancel</Button>
					<Button onClick={() => deleteOption()} color='error'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
