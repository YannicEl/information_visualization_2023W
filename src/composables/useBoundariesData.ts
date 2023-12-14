import('../assets/eng_lad.json').then((res) => {
	boundariesData.value = res.default as GeoJSON.FeatureCollection<GeoJSON.Geometry>;
	console.log(`Loaded ${boundariesData.value.features.length} boundaries data items`);
});

const boundariesData = ref<GeoJSON.FeatureCollection<GeoJSON.Geometry>>({
	features: [],
	type: 'FeatureCollection',
});

export function useBoundariesData() {
	return { boundariesData };
}
