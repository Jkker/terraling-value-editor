import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { SurenessIcon } from '../components/SurenessEditor';
import data from '../data';

const columns: GridColDef[] = [
	{ field: 'name', headerName: 'Properties', width: 700 },
	{
		field: 'value',
		headerName: 'Value',
		width: 150,
		editable: true,
		type: 'singleSelect',
		valueOptions: ['Yes', 'No', 'N/A'],
	},
	{
		field: 'sureness',
		headerName: 'Sureness',
		type: 'singleSelect',
		width: 180,
		editable: false,
		valueOptions: ['uncertain', 'certain'],
		renderCell: (params) => <SurenessEditor {...params} />,
	},
];

export function SurenessEditor({ value, id, api, field, ...restProps }: any) {
	const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
		// setValue(newValue);
		api.setEditCellValue({ id, field, value: newValue }, event);
		// Check if the event is not from the keyboard
		// https://github.com/facebook/react/issues/7407
		if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
			api.commitCellChange({ id, field });
			api.setCellMode(id, field, 'view');
		}
		console.log(`${id}: ${value} => ${newValue}`);
	};
	return (
		<ToggleButtonGroup value={value} exclusive onChange={handleChange}>
			<ToggleButton value='certain'>
				<SurenessIcon sureness='certain' sx={{ marginRight: 1 }} />
			</ToggleButton>
			<ToggleButton value='revisit'>
				<SurenessIcon sureness='revisit' sx={{ marginRight: 1 }} />
			</ToggleButton>
			<ToggleButton value='need_help'>
				<SurenessIcon sureness='need_help' sx={{ marginRight: 1 }} />
			</ToggleButton>
		</ToggleButtonGroup>
	);
}

export default function Table() {
	return (
		<Box sx={{ width: '100vw', height: '100vh' }}>
			<DataGrid
				rows={data}
				columns={columns}
				disableSelectionOnClick
				// editMode='row'
				// apiRef={apiRef}
				// onRowEditStart={handleRowEditStart}
				// onRowEditStop={handleRowEditStop}
				// editRowsModel
				// pageSize={5}
				// rowsPerPageOptions={[5]}
				// checkboxSelection
				// disableSelectionOnClick
			/>
		</Box>
	);
}
