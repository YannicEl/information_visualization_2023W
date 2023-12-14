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

const data = shallowRef<Data[]>([]);

const filters = ref({
	values: {
		age_range: 'all',
		gender: 'all',
	},
	options: {
		age_range: extractOptions('Age range', data),
		gender: extractOptions('Gender', data),
	},
});

const filtered = computed(() => {
	const { age_range, gender } = filters.value.values;
	return data.value.filter((item) => {
		if (age_range !== 'all' && item['Age range'] !== age_range) return false;
		if (gender !== 'all' && item['Gender'] !== gender) return false;

		return true;
	});
});

export function useData() {
	return { data: filtered, filters };
}

export function loadData() {
	import('../assets/data_boundaries.json').then((res) => {
		data.value = res.default as Data[];
		console.log(`Loaded ${data.value.length} data items`);
	});
}

function extractOptions(key: string, data: Ref<any[]>) {
	return computed(() => {
		const set = new Set<string>(['all']);
		data.value.forEach((item) => {
			set.add(item[key]);
		});

		return Array.from(set).filter(Boolean);
	});
}
