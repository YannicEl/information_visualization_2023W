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
const loaded = ref(false);

const filters = ref({
	values: {
		type: 'all',
		age_range: 'all',
		gender: 'all',
		object_of_search: 'all',
		outcome: 'all',
		date: {
			from: new Date('2021-05-31'),
			till: new Date('2021-07-01'),
		},
	},
	options: {
		type: extractOptions('type', data),
		age_range: extractOptions('age_range', data),
		gender: extractOptions('gender', data),
		object_of_search: extractOptions('object_of_search', data),
		outcome: extractOptions('object_of_search', data),
	},
});

const filtered = computed(() => {
	const { type, age_range, gender, object_of_search, outcome, date } = filters.value.values;

	console.time('filtering');
	const ret = data.value.filter((item) => {
		if (type !== 'all' && item.type !== type) return false;
		if (age_range !== 'all' && item.age_range !== age_range) return false;
		if (gender !== 'all' && item.gender !== gender) return false;
		if (object_of_search !== 'all' && item.object_of_search !== object_of_search) return false;
		if (outcome !== 'all' && item.outcome !== outcome) return false;

		const itemDate = new Date(item.date).valueOf();
		if (itemDate < date.from.valueOf() || itemDate > date.till.valueOf()) return false;

		return true;
	});
	console.timeEnd('filtering');

	return ret;
});

export function useData() {
	return { data: filtered, filters, loaded };
}

export function loadData() {
	import('../assets/data_boundaries.json').then((res) => {
		data.value = res.default as Data[];
		loaded.value = true;
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
