<template>
	<div class="ClockDivider">
		{{divider}}
	</div>
</template>

<style scoped>
	.ClockDivider {
		display: flex;
		align-items: flex-start;
		margin: 10px;
		font-size: 6vw;
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
