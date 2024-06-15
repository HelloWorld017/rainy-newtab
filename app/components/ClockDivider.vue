<template>
	<div class="ClockDivider">
		{{divider}}
	</div>
</template>

<style scoped>
	.ClockDivider {
		display: flex;
		align-items: flex-start;
		margin: 1vmax;
	}
</style>

<script>
	export default {
		props: {
			divider: {
				type: String,
				default: ":"
			}
		}
	};
</script>
