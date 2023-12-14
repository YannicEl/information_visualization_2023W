<template>
	<div class="flex flex-col">
		<div class="relative h-full">
			<div id="map" class="absolute h-full w-full"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import 'mapbox-gl/dist/mapbox-gl.css';
import { point } from '@turf/helpers';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { emptyGeoJSON } from '../map/emptyGeoJSON';
import { bindMapPopup } from '../map/mapPopupListeners';
import { mapboxDataTransform } from '../map/mapboxDataTransform';

const mapboxToken = String(import.meta.env.VITE_MAPBOX_TOKEN);

const { boundariesData } = useBoundariesData();

onMounted(() => {
	const { initMap, map } = useMapbox();
	initMap(mapboxToken, [-1.28827, 52.993092], 'map');

	const { initPopup } = useMapPopup();
	initPopup();
	bindMapPopup(map.value);

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
				'fill-color': [
					'interpolate',
					['linear'],
					['get', 'count'],
					0,
					'rgb(220, 38, 38)',
					100,
					'rgb(220, 38, 38)',
				],
				'fill-opacity': ['interpolate', ['linear'], ['get', 'count'], 0, 0, 1, 0.7],
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
				'circle-radius': 5,
				'circle-color': '#22B422',
			},
		});

		mapboxDataTransform();

		// watch(data, () => {
		// 	(map.value.getSource('data-source') as GeoJSONSource).setData(dataToGeoJSON(data.value));

		// 	const accumulatedLAD = data.value.reduce(
		// 		(acc, curr) => {
		// 			if (!curr.lad_id) return acc;

		// 			if (!acc[curr.lad_id]) {
		// 				acc[curr.lad_id] = 0;
		// 			}
		// 			acc[curr.lad_id] += 1;
		// 			return acc;
		// 		},
		// 		{} as Record<string, number>
		// 	);

		// 	const boundariesDataAcc = {
		// 		...boundariesData.value,
		// 		features: boundariesData.value.features.map((feature) => {
		// 			const ladId = feature.properties?.LAD13CD;
		// 			if (!ladId) return false;

		// 			const count = accumulatedLAD[ladId];
		// 			if (!count) return false;

		// 			return {
		// 				...feature,
		// 				properties: {
		// 					...feature.properties,
		// 					count,
		// 				},
		// 			};
		// 		}),
		// 	};

		// 	(map.value.getSource('boundaries-source') as GeoJSONSource).setData(
		// 		boundariesDataAcc as GeoJSON.FeatureCollection<GeoJSON.Geometry>
		// 	);
		// });
	});
});
</script>

<style scoped lang="scss"></style>
