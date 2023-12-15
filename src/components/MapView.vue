<template>
	<div class="flex flex-col">
		<div class="relative h-full">
			<div id="map" class="absolute h-full w-full"></div>
			<div class="min-w-60 absolute left-4 top-4 bg-black bg-opacity-80 p-4 text-white">
				{{ hoverInfoDistrict }}
			</div>

			<div class="h-100 min-w-40 absolute right-4 top-4 bg-black bg-opacity-80 p-4 text-white">
				<div class="flex h-full w-full flex-col">
					<div v-for="key in Object.keys(hoverInfoCase)" :key="key" class="flex">
						<div class="underline">{{ dataNameMapping[key] }}:</div>
						<div>
							{{ hoverInfoCase[key] }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import 'mapbox-gl/dist/mapbox-gl.css';
import { emptyGeoJSON } from '../map/emptyGeoJSON';
import { mapboxDataTransform } from '../map/mapboxDataTransform';

const mapboxToken = String(import.meta.env.VITE_MAPBOX_TOKEN);
const { boundariesData } = useBoundariesData();

const hoverInfoDistrict = ref('Hover over a district!');
const hoverInfoCase = ref<Record<string, any>>({});

const dataNameMapping: Record<string, string> = {
	type: 'Type',
	date: 'Date',
	part_of_a_policing_operation: 'Part of a policing operation',
	latitude: 'Latitude',
	longitude: 'Longitude',
	gender: 'Gender',
	age_range: 'Age Range',
	self_defined_ethnicity: 'Self Defined Ethnicity',
	officer_defined_ethnicity: 'Officer Defined Ethnicity',
	legislation: 'Legislation',
	object_of_search: 'Object Of Search',
	outcome: 'Outcome',
	lad_name: 'Disctrict',
	lad_id: 'Disctrict Code',
};

onMounted(() => {
	const { initMap, map } = useMapbox();
	initMap(mapboxToken, [-0.127029, 51.497278], 'map');

	// const { initPopup } = useMapPopup();
	// initPopup();
	// bindMapPopup(map.value);

	map.value.on('style.load', async () => {
		map.value.addSource('boundaries-source', {
			type: 'geojson',
			data: {
				...boundariesData.value,
				features: boundariesData.value.features.map((feature) => {
					return {
						...feature,
						properties: {
							...feature.properties,
							count: 0,
						},
					};
				}),
			},
		});

		map.value.addLayer({
			id: 'boundaries-fill',
			type: 'fill',
			source: 'boundaries-source',
			layout: {},
			paint: {
				'fill-color': '#0C7BDC',
				'fill-opacity': ['interpolate', ['linear'], ['get', 'count'], 0, 0, 600, 0.7],
			},
		});

		map.value.addSource('boundaries-outline-source', {
			type: 'geojson',
			data: boundariesData.value,
		});

		map.value.addLayer({
			id: 'boundaries-outline',
			type: 'line',
			source: 'boundaries-outline-source',
			layout: {},
			paint: {
				'line-color': '#333',
			},
		});

		map.value.addSource('data-source', {
			type: 'geojson',
			data: emptyGeoJSON,
		});

		map.value.addLayer({
			id: 'data',
			type: 'circle',
			source: 'data-source',
			paint: {
				'circle-color': '#FFC20A',
				'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, 0, 9.5, 2, 19, 8],
				'circle-opacity': 0.9,
			},
		});

		mapboxDataTransform();

		map.value.on('mousemove', (event) => {
			const counts = map.value.queryRenderedFeatures(event.point, {
				layers: ['boundaries-fill'],
			});

			const count = counts[0];
			hoverInfoDistrict.value = count
				? `${count.properties?.LAD13NM}: ${count.properties?.count}`
				: 'Hover over a district!';

			const cases = map.value.queryRenderedFeatures(event.point, {
				layers: ['data'],
			});

			const caseFeature = cases[0];
			hoverInfoCase.value = caseFeature && caseFeature.properties ? caseFeature.properties : {};
		});
	});
});
</script>

<style scoped lang="scss"></style>
