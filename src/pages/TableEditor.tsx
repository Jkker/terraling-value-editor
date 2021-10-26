import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import data from '../data';
import DynamicSelect, { OptionType } from '../components/DynamicSelect';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import HistoryIcon from '@mui/icons-material/History';

const columns: GridColDef[] = [
	{ field: 'name', headerName: 'Properties', flex: 1, minWidth: 200 },
	{
		field: 'value',
		headerName: 'Value',
		flex: 1,
		minWidth: 150,
		renderCell: ({ value, id, api, field, getValue, ...restProps }) => {
			const handleValueChange = (newValue: OptionType) => {
				console.log(`valueChange: ${value} => ${newValue}`);
				if (value !== newValue) {
					api.setEditCellValue({ id, field, value: newValue });
					api.commitCellChange({ id, field });
				}
				api.setCellMode(id, field, 'view');
			};
			const options = getValue(id, 'available_values');
			const handleOptionsChange = (newOptions: OptionType[]) => {
				console.log(`optionsChange: ${options} => ${newOptions}`);
				if (newOptions && options !== newOptions) {
					api.setEditCellValue({ id, field: 'available_values', value: newOptions });
					api.commitCellChange({ id, field: 'available_values' });
					api.setCellMode(id, 'available_values', 'view');
				}
				api.setCellMode(id, field, 'view');
			};
			return (
				<DynamicSelect
					value={value as OptionType}
					setValue={handleValueChange}
					options={options as OptionType[]}
					setOptions={handleOptionsChange}
				/>
			);
		},
	},
	{ field: 'available_values', hide: true },
	{
		field: 'sureness',
		headerName: 'Sureness',
		type: 'singleSelect',
		flex: 0,
		minWidth: 180,
		editable: false,
		valueOptions: ['uncertain', 'certain'],
		renderCell: (params) => <SurenessEditor {...params} />,
	},
];

export function SurenessEditor({ value, id, api, field, ...restProps }: any) {
	const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
		if (newValue) {
			api.setEditCellValue({ id, field, value: newValue }, event);
			api.commitCellChange({ id, field });
			api.setCellMode(id, field, 'view');
			console.log(`${id}: ${value} => ${newValue}`);
		}
	};
	return (
		<ToggleButtonGroup value={value} exclusive onChange={handleChange}>
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
				<HelpOutlinedIcon
					sx={{ marginRight: 1, mx: 'auto' }}
					color={value === 'need_help' ? 'error' : 'action'}
				/>
			</ToggleButton>
		</ToggleButtonGroup>
	);
}

export default function Table() {
	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				'.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .MuiDataGrid-root .MuiDataGrid-cell:focus':
					{
						outline: 'none',
					},
				'.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-root .MuiDataGrid-cell:focus-within':
					{
						outline: 'none',
					},
			}}
		>
			<DataGrid
				rows={data}
				columns={columns}
				// editMode='row'
				// apiRef={apiRef}
				// onRowEditStart={handleRowEditStart}
				// onRowEditStop={handleRowEditStop}
				// editRowsModel
				// pageSize={5}
				// rowsPerPageOptions={[5]}
				// checkboxSelection
				disableSelectionOnClick
			/>
		</Box>
	);
}
