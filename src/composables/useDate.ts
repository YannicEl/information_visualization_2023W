interface Data {}

const data = ref<Data[]>([]);

export function useData() {
	return { data };
}

export function loadData() {
	import('../assets/data.json').then((res) => {
		data.value = res.default as Data[];
		console.log(`Loaded ${data.value.length} items`);
	});
}
