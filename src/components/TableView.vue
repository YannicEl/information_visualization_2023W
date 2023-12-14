<template>
	<div class="flex flex-1 flex-col">
		<div ref="table" class="relative h-full">
			<ResponsiveTable v-if="data.length">
				<tr>
					<th v-for="column in columns" :key="column">{{ column }}</th>
				</tr>

				<tr v-for="rowIndex in range">
					<td v-for="column in data[rowIndex]">{{ column }}</td>
				</tr>
			</ResponsiveTable>
		</div>

		<div class="flex items-center gap-4">
			<button @click="page--" class="bg-gray-500 p-2">Back</button>
			<button @click="page++" class="bg-gray-500 p-2">Next</button>

			<div>Datepoints: {{ data.length }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const { data } = useData();
const columns = computed(() => Object.keys(data.value[0]));

const table = ref<HTMLDivElement | null>();
const height = computed(() => table.value?.clientHeight ?? 0);

const itemHeihgt = 52;
const chunkSize = computed(() => Math.trunc((height.value - 33) / itemHeihgt));
const page = ref(0);
const range = computed(() => {
	return Array(chunkSize.value)
		.fill(null)
		.map((_, index) => page.value * chunkSize.value * index);
});
</script>

<style scoped lang="scss"></style>
