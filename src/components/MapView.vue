<template>
	<div class="flex flex-col">
		<div>Map</div>
		{{ filteredData }}
		<div id="map"></div>
	</div>
</template>

<script lang="ts" setup>
import 'mapbox-gl/dist/mapbox-gl.css';
import { point } from '@turf/helpers';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { emptyGeoJSON } from '../map/emptyGeoJSON';
import { dataToGeoJSON } from '../map/dataToGeoJSON';
import { GeoJSONSource } from 'mapbox-gl';

const mapboxToken = String(import.meta.env.VITE_MAPBOX_TOKEN);

const { filteredData } = useFilteredData();
const { boundariesData } = useBoundariesData();

onMounted(() => {
	const { initMap, map } = useMapbox();
	initMap(mapboxToken, [-1.28827, 52.993092], 'map');

	map.value.on('style.load', async () => {
		map.value.addSource('boundaries-source', {
			type: 'geojson',
			data: boundariesData.value,
		});

		map.value.addLayer({
			id: 'boundaries',
			type: 'fill',
			source: 'boundaries-source',
			layout: {},
			paint: {
				'fill-color': '#088',
				'fill-opacity': 0.8,
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
				'circle-color': '#B42222',
			},
		});

		watch(filteredData, () => {
			(map.value.getSource('data-source') as GeoJSONSource).setData(
				dataToGeoJSON(filteredData.value)
			);
		});
	});
});
</script>

<style scoped lang="scss">
#map {
	height: 100vh;
}
</style>
