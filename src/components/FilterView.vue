<template>
	<div>
		<select v-model="filters.values.age_range">
			<option v-for="option in filters.options.age_range">{{ option }}</option>
		</select>
	</div>
</template>

<script lang="ts" setup>
const { filters } = useData();
</script>

<style scoped lang="scss"></style>
