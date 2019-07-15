<template>
	<section class="Clock">
		<clock-unit unit-name="Date" :current="current.getDate()" animate></clock-unit>
		<clock-divider divider="/"></clock-divider>
		<clock-unit unit-name="Hours" :current="current.getHours()" animate></clock-unit>
		<clock-divider></clock-divider>
		<clock-unit unit-name="Minutes" :current="current.getMinutes()" animate></clock-unit>
		<clock-divider></clock-divider>
		<clock-unit unit-name="Seconds" :current="current.getSeconds()" animate></clock-unit>
	</section>
</template>

<style scoped>
	.Clock {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		display: flex;
		color: var(--clock-color);
		background: var(--clock-background);
		font-family: 'Roboto', sans-serif;
		font-weight: 100;
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
	import ClockUnit from "../components/ClockUnit.vue";
	import ClockDivider from "../components/ClockDivider.vue";

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
