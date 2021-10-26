import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DetailedEditor from './pages/ListEditor';
import TableEditor from './pages/TableEditor';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Test from './Test';

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
			<Router>
				<Switch>
					<Route path='/table'>
						<TableEditor />
					</Route>
					<Route path='/test'>
						<Test />
					</Route>
					<Route path='/'>
						<DetailedEditor />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
