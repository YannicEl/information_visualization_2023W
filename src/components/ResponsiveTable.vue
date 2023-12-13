<template>
	<div class="-mx-4 inline w-[calc(100%+2rem)] overflow-x-auto md:mx-0 md:w-full">
		<table class="w-full">
			<slot />
		</table>
	</div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
table {
	& :slotted(td) {
		@apply py-4 text-sm font-semibold;
	}

	& :slotted(tr) {
		// table heading
		&:first-child th {
			@apply pb-2 text-left;
		}

		// padding on cells
		& td,
		& th {
			@apply whitespace-nowrap pr-6;

			&:first-child {
				@apply pl-6;
			}
		}

		// bg every 2. row
		&:nth-child(2n) {
			@apply bg-gray-100;
		}

		// border radius top
		&:nth-child(2) {
			& td:first-child {
				@apply sm:rounded-tl-lg;
			}

			& td:last-child {
				@apply sm:rounded-tr-lg;
			}
		}

		// border radius bottom
		&:last-child {
			& td:first-child {
				@apply sm:rounded-bl-lg;
			}

			& td:last-child {
				@apply sm:rounded-br-lg;
			}
		}
	}
}
</style>
