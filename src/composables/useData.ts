export interface Data {
	type: string;
	date: string;
	part_of_a_policing_operation: boolean;
	latitude: number;
	longitude: number;
	gender: string;
	age_range: string;
	self_defined_ethnicity: string;
	officer_defined_ethnicity: string;
	legislation: string;
	object_of_search: string;
	outcome: string;
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
		age_range: extractOptions('age_range', data),
		gender: extractOptions('gender', data),
	},
});

const filtered = computed(() => {
	const { age_range, gender } = filters.value.values;
	const ret = data.value.filter((item) => {
		if (age_range !== 'all' && item.age_range !== age_range) return false;
		if (gender !== 'all' && item.gender !== gender) return false;

		return true;
	});

	return ret;
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

function extractOptions(key: keyof Data, data: Ref<any[]>) {
	return computed(() => {
		const set = new Set<string>(['all']);
		data.value.forEach((item) => {
			set.add(item[key]);
		});

		return Array.from(set).filter(Boolean);
	});
}
