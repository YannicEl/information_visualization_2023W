<template>
	<div class="flex flex-col">
		<div>Map</div>
		<div id="map"></div>
	</div>
</template>

<script lang="ts" setup>
const mapboxToken = String(import.meta.env.VITE_MAPBOX_TOKEN);

onMounted(() => {
	const { initMap, map } = useMapbox();
	initMap(mapboxToken, [-1.28827, 52.993092], 'map');

	map.value.on('style.load', async () => {});

	const { data } = useData();
	const { boundariesData } = useBoundariesData();
});
</script>

<style scoped lang="scss">
#map {
	height: 100vh;
}
</style>
