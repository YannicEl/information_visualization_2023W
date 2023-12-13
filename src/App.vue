<script setup lang="ts">
const columns = ref<string[]>([]);
const data = ref<any[]>([]);

const chunkSize = ref(10);
const page = ref(0);
const range = computed(() => {
	return Array(chunkSize.value)
		.fill(null)
		.map((_, index) => page.value * chunkSize.value * index);
});

onMounted(async () => {
	data.value = (await import('./assets/data.json')).default;
	console.log(data.value);

	columns.value = Object.keys(data.value[0]);

	console.log(columns.value);
});
</script>

<template>
	<div class="h-screen w-screen">
		<button @click="page--">prev</button>
		<button @click="page++">next</button>
		<ResponsiveTable class="col-span-1 my-4 md:col-span-3">
			<tr>
				<th v-for="column in columns" :key="column">{{ column }}</th>
			</tr>

			<tr v-for="rowIndex in range">
				<td v-for="column in data[rowIndex]">{{ column }}</td>
			</tr>
		</ResponsiveTable>
	</div>
</template>

<style scoped></style>
