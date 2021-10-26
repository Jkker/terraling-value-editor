import DeleteIcon from '@mui/icons-material/Delete';
import {
	Box,
	Button,
	FilterOptionsState,
	IconButton,
	ListItem,
	ListItemButton,
	TextField,
	Tooltip,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

type OptionType = {
	value: string;
	label?: string;
	highlighted?: boolean;
	userCreated?: boolean;
	temporary?: boolean;
};
const filter = createFilterOptions<OptionType>();

export default function FreeSoloCreateOption(props: any) {
	const { name = 'Ling Property Value', available_values = ['Yes', 'No', 'N/A'] } = props;

	const [value, setValue] = React.useState<OptionType | null>(null);
	const [options, setOptions] = React.useState<OptionType[]>(
		available_values.map((v: string) => ({ value: v, label: v }))
	);
	const [deletionDialog, setDialogOpen] = React.useState<OptionType | null>(null);

	const deleteOption = () => {
		if (deletionDialog) {
			setOptions((prevOptions) => prevOptions.filter((o) => o.value !== deletionDialog.value));
			if (value && value.value === deletionDialog.value) setValue(null);
			setDialogOpen(null);
		}
	};

	const addOption = (newOption: OptionType) => {
		newOption.temporary = false;
		setOptions((options) => [...options, newOption]);
	};

	const filterOptions = (options: OptionType[], params: FilterOptionsState<OptionType>) => {
		const filtered = filter(options, params);
		// Suggest the creation of a new value
		const inputValue = params.inputValue;
		const isExisting = options.some((option) => inputValue === option.value);
		if (inputValue !== '' && !isExisting) {
			filtered.push({ value: inputValue, userCreated: true, temporary: true });
		}
		return filtered;
	};

	return (
		<Box>
			<Autocomplete
				value={value}
				onChange={(event, newValue, reason) => {
					if (typeof newValue === 'string') {
						setValue({ value: newValue, label: newValue });
					} else if (reason === 'selectOption' && newValue?.temporary) {
						addOption(newValue);
					} else {
						setValue(newValue);
					}
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
				options={options}
				getOptionLabel={(option) => {
					// Value selected with enter, right from the input
					if (typeof option === 'string') {
						return option;
					}
					return option.label ?? option.value;
				}}
				renderOption={({ className, ...props }, option, state) => (
					<ListItem
						sx={{
							display: 'flex',
							'&.Mui-focused': {
								bgcolor: 'rgba(0,0,0,0.1)',
							},
						}}
						key={option.value}
						{...props}
						disablePadding
						secondaryAction={
							<Tooltip title='Delete' placement='left'>
								<IconButton
									name='delete'
									edge='end'
									onClick={() => setDialogOpen(option)}
									sx={{
										display: option.temporary ? 'none' : 'block',
										pr: '6px',
										mt: 1 / 2,
									}}
								>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						}
					>
						<ListItemButton sx={{ pl: 1.5 }}>
							{option.temporary ? (
								<Box sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
									Add new option: <Box sx={{ color: 'text.primary', pl: 1 }}>{option.value}</Box>
								</Box>
							) : (
								option.label ?? option.value
							)}
						</ListItemButton>
					</ListItem>
				)}
				renderInput={(params) => <TextField {...params} label={name} />}
			/>
			<Dialog
				open={!!deletionDialog}
				onClose={() => setDialogOpen(null)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					Delete {deletionDialog && <b>{deletionDialog?.label ?? deletionDialog?.value}</b>} from{' '}
					<i>{name}</i>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete this value?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDialogOpen(null)}>Cancel</Button>
					<Button onClick={() => deleteOption()} color='error'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			<Box sx={{ p: 4 }}>{JSON.stringify(options, null, 2)}</Box>
		</Box>
	);
}
