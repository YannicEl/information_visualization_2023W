<script setup lang="ts">
loadData();
loadBoundariesData();

const { data } = useData();
const { boundariesData } = useBoundariesData();
</script>

<template>
	<div
		v-if="data.length && boundariesData"
		class="grid h-screen grid-cols-2 grid-rows-[min-content] gap-4 p-4"
	>
		<FilterView class="col-span-2" />

		<MapView />
		<TableView />
	</div>
</template>

<style scoped></style>
