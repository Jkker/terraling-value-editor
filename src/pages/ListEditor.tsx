import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import {
	AppBar,
	BottomNavigation,
	BottomNavigationAction,
	Box,
	Button,
	Card,
	CardContent,
	Container,
	CssBaseline,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
	SwipeableDrawer,
	Toolbar,
	Typography,
} from '@mui/material';
import isMobile from 'ismobilejs';
import { useEffect, useState } from 'react';
import SurenessEditor, { SurenessIcon } from '../components/SurenessEditor';
import data from '../data';
import usePropertyList from '../lib/usePropertyList';
import { ILingProperty } from '../types';
import ValueEditor from '../components/ValueEditor';

const drawerWidth = 300;

export default function DetailedEditor() {
	const [isMobileDevice, setIsMobileDevice] = useState(false);
	const [isListDrawerOpen, setIsListDrawerOpen] = useState(false);
	const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState(false);

	const { propertyList, currentIndex, currentProperty, ...listOps } = usePropertyList(data);
	useEffect(() => {
		setIsMobileDevice(isMobile(window.navigator).any);
	}, []);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					{isMobileDevice && (
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='l'
							sx={{ mr: 2 }}
							onClick={() => {
								setIsListDrawerOpen(() => !isListDrawerOpen);
							}}
						>
							<MenuIcon />
						</IconButton>
					)}
					<Typography variant='h6' component='div' sx={{ flexGrow: 1, marginRight: 1 }}>
						{currentProperty.name}
					</Typography>
					{isMobileDevice && (
						<IconButton
							size='large'
							edge='end'
							color='inherit'
							aria-label='info'
							onClick={() => {
								setIsInfoDrawerOpen(() => !isInfoDrawerOpen);
							}}
						>
							<InfoIcon />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
			<SwipeableDrawer
				onOpen={() => {
					setIsListDrawerOpen(true);
				}}
				onClose={() => {
					setIsListDrawerOpen(false);
				}}
				open={isListDrawerOpen}
				variant={isMobileDevice ? 'temporary' : 'permanent'}
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
					p: 2,
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: 'auto' }}>
					<List>
						{propertyList.map(({ id, name, value, sureness }: ILingProperty, index) => (
							<ListItemButton
								key={id}
								selected={currentIndex === index}
								onClick={() => {
									listOps.setCurrentIndex(index);
									setIsListDrawerOpen(false);
								}}
							>
								<ListItemIcon>
									<SurenessIcon sureness={sureness} />
								</ListItemIcon>
								<ListItemText primary={name} />
							</ListItemButton>
						))}
					</List>
				</Box>
			</SwipeableDrawer>
			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Stack spacing={2}>
					<Card>
						<CardContent>
							<Stack spacing={1}>
								<ValueEditor
									options={currentProperty.available_values}
									value={currentProperty.value}
									name={currentProperty.name}
								/>

								<SurenessEditor
									sureness={currentProperty.sureness}
									updateProperty={listOps.updateProperty}
								/>
							</Stack>
						</CardContent>
					</Card>
					<Card>
						<CardContent>
							<Stack spacing={1}>
								<Typography variant='h5'>Example: {currentProperty?.example?.name}</Typography>
								<Typography variant='body1'>{currentProperty?.example?.value}</Typography>
							</Stack>
						</CardContent>
					</Card>
				</Stack>
			</Box>
			<SwipeableDrawer
				onOpen={() => {
					setIsInfoDrawerOpen(true);
				}}
				onClose={() => {
					setIsInfoDrawerOpen(false);
				}}
				open={isInfoDrawerOpen}
				anchor='right'
				variant={isMobileDevice ? 'temporary' : 'permanent'}
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
				}}
			>
				<Toolbar />
				<Stack sx={{ padding: 2 }} spacing={2}>
					<Box>
						<Typography variant='h5' component='div'>
							Property Information
						</Typography>
						<Typography variant='body1'>{currentProperty?.description?.html_safe}</Typography>
					</Box>
					<Box>
						<Typography variant='h5' component='div'>
							Value in other languages
						</Typography>
					</Box>
				</Stack>
			</SwipeableDrawer>
			{isMobileDevice ? (
				<BottomNavigation
					showLabels
					sx={{
						zIndex: (theme) => theme.zIndex.drawer + 1,
						position: 'fixed',
						bottom: 0,
						left: 0,
						right: 0,
					}}
				>
					<BottomNavigationAction
						label='Previous'
						icon={<ArrowBackIosNewIcon />}
						onClick={() => listOps.prevProperty()}
					/>
					<BottomNavigationAction
						label='Next Unset'
						icon={<DoubleArrowIcon />}
						onClick={() => listOps.nextUnset()}
					/>
					<BottomNavigationAction
						label='Next Unsure'
						icon={<DoubleArrowIcon />}
						onClick={() => listOps.nextUncertain()}
					/>
					<BottomNavigationAction
						label='Next'
						icon={<ArrowForwardIosIcon />}
						onClick={() => listOps.nextProperty()}
					/>
				</BottomNavigation>
			) : (
				<Paper
					elevation={2}
					sx={{
						zIndex: (theme) => theme.zIndex.drawer + 1,
						position: 'fixed',
						bottom: 0,
						left: 0,
						right: 0,
						display: 'flex',
						justifyContent: 'space-evenly',
						backgroundColor: 'white',
					}}
				>
					<Button onClick={() => listOps.prevProperty()}>
						<ArrowBackIosNewIcon />
						Previous
					</Button>
					<Button onClick={() => listOps.nextUnset()}>
						<DoubleArrowIcon />
						Next Unset
					</Button>
					<Button onClick={() => listOps.nextUncertain()}>
						Next Unsure
						<DoubleArrowIcon />
					</Button>
					<Button onClick={() => listOps.nextProperty()}>
						Next
						<ArrowForwardIosIcon />
					</Button>
				</Paper>
			)}
		</Box>
	);
}
