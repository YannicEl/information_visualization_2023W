export interface Data {
	Type: string;
	Date: string;
	'Part of a policing operation': string;
	'Policing operation': string;
	Latitude: number;
	Longitude: number;
	Gender: string;
	'Age range': string;
	'Self-defined ethnicity': string;
	'Officer-defined ethnicity': string;
	Legislation: string;
	'Object of search': string;
	Outcome: string;
	'Outcome linked to object of search': string;
	'Removal of more than just outer clothing': string;
	lad_name: string;
	lad_id: string;
}

const data = ref<Data[]>([]);

export function useData() {
	return { data };
}

export function loadData() {
	import('../assets/data_boundaries.json').then((res) => {
		data.value = res.default as Data[];
		console.log(`Loaded ${data.value.length} data items`);
	});
}
