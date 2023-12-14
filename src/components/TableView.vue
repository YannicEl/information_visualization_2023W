<template>
	<div>
		<div class="overflow-x-scroll">
			<ResponsiveTable v-if="data.length" class="col-span-1 my-4 md:col-span-3">
				<tr>
					<th v-for="column in columns" :key="column">{{ column }}</th>
				</tr>

				<tr v-for="rowIndex in range">
					<td v-for="column in data[rowIndex]">{{ column }}</td>
				</tr>
			</ResponsiveTable>
		</div>

		<button @click="page--">prev</button>
		<button @click="page++">next</button>
	</div>
</template>

<script lang="ts" setup>
const { data } = useData();

const columns = computed(() => Object.keys(data.value[0]));

const chunkSize = ref(10);
const page = ref(0);
const range = computed(() => {
	return Array(chunkSize.value)
		.fill(null)
		.map((_, index) => page.value * chunkSize.value * index);
});
</script>

<style scoped lang="scss"></style>
