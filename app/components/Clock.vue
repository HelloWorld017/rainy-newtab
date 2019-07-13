<template>
	<section class="Clock">
		<clock-unit unit-name="Date" :current="current.getDate()" animate />
		<clock-divider divider="/"/>
		<clock-unit unit-name="Hours" :current="current.getHours()" animate />
		<clock-divider />
		<clock-unit unit-name="Minutes" :current="current.getMinutes()" animate />
		<clock-divider />
		<clock-unit unit-name="Seconds" :current="current.getSeconds()" animate />
	</section>
</template>

<style scoped>
	.Clock {
		display: flex;
	}

	@media screen and (max-width: 768px) {
		.Clock {
			flex-direction: column;
		}

		.ClockUnit {
			margin-top: 1vh;
		}
	}
</style>

<script>
	import ClockUnit from "./ClockUnit.vue";
	import ClockDivider from "./ClockDivider.vue";

	export default {
		data() {
			return {
				current: new Date(),
				intervalId: undefined
			};
		},

		computed: {
			isMinus() {
				return this.target - this.current < 0;
			}
		},

		mounted() {
			this.intervalId = setInterval(() => {
				this.current = new Date();
			}, 50);
		},

		destroyed() {
			clearInterval(this.intervalId);
		},

		components: {
			ClockUnit,
			ClockDivider
		}
	};
</script>
