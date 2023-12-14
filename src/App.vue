<script setup lang="ts">
loadData();
</script>

<template>
	<div class="grid h-screen w-screen grid-cols-2 gap-4 p-4">
		<FilterView class="col-span-2 bg-red-500" />
		<MapView class="bg-green-500" />
		<TableView class="bg-blue-500" />
	</div>
</template>

<style scoped></style>
