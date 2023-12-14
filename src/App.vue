<script setup lang="ts">
loadData();
// loadBoundariesData();
</script>

<template>
	<div class="grid h-screen grid-cols-2 grid-rows-[min-content] gap-4 p-4">
		<FilterView class="col-span-2 h-20" />

		<MapView />
		<TableView />
	</div>
</template>

<style scoped></style>
