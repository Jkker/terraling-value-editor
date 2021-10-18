export interface ILingProperty {
	id: string | number;
	name: string;
	description?: { html_safe: string };
	value: string;
	available_values: string[];
	sureness?: 'certain' | 'revisit' | 'need_help';
	example?: { name: string; value: string; id: string | number };
}
