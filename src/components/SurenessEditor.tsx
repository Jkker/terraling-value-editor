import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import HelpIcon from '@mui/icons-material/Help';
import HistoryIcon from '@mui/icons-material/History';
import { SvgIconProps, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ILingProperty } from '../types';

export const SurenessIcon = ({
	sureness,
	...iconProps
}: {
	sureness: ILingProperty['sureness'];
} & SvgIconProps) => {
	switch (sureness) {
		case 'need_help':
			return <HelpIcon {...iconProps} color='warning' />;
		case 'revisit':
			return <HistoryIcon {...iconProps} color='warning' />;
		case 'certain':
			return <CheckCircleIcon {...iconProps} color='success' />;
		default:
			return <CircleOutlinedIcon {...iconProps} color='action' />;
	}
};

export default function SurenessEditor({ sureness, updateProperty }: any) {
	return (
		<ToggleButtonGroup
			value={sureness}
			exclusive
			onChange={(event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) =>
				updateProperty({ sureness: value })
			}
		>
			<ToggleButton value='certain'>
				<SurenessIcon sureness='certain' sx={{ marginRight: 1 }} /> Certain
			</ToggleButton>
			<ToggleButton value='revisit'>
				<SurenessIcon sureness='revisit' sx={{ marginRight: 1 }} /> Revisit
			</ToggleButton>
			<ToggleButton value='need_help'>
				<SurenessIcon sureness='need_help' sx={{ marginRight: 1 }} /> Need Help
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
