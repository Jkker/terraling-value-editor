import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DetailedEditor from './pages/DetailedEditor';
import TableEditor from './pages/TableEditor';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#161c2b',
		},
		secondary: {
			main: '#ff6584',
		},
	},
	shape: {
		borderRadius: 3,
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<DetailedEditor />
			{/* <TableEditor /> */}
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
