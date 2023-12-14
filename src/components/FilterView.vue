<template>
	<button class="bg-gray-300" @click="setFilteredData([data[0]])">Filter</button>
</template>

<script lang="ts" setup>
const { data } = useData();
</script>

<style scoped lang="scss"></style>
