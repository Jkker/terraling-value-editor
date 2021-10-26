import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import HelpIcon from '@mui/icons-material/Help';
import HistoryIcon from '@mui/icons-material/History';
import {
	SvgIconProps,
	ToggleButton,
	ToggleButtonGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
} from '@mui/material';
import { ILingProperty } from '../types';

export const SurenessIcon = ({
	sureness,
	...iconProps
}: {
	sureness: ILingProperty['sureness'];
} & SvgIconProps) => {
	switch (sureness) {
		case 'need_help':
			return <HelpIcon {...iconProps} color='error' />;
		case 'revisit':
			return <HistoryIcon {...iconProps} color='warning' />;
		case 'certain':
			return <CheckCircleIcon {...iconProps} color='success' />;
		default:
			return <CircleOutlinedIcon {...iconProps} />;
	}
};

export default function SurenessEditor({
	sureness: value,
	updateProperty,
	showFormLabel = true,
}: any) {
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
