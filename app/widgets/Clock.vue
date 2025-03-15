<template>
	<section class="Clock">
		<clock-unit
			class="Clock__date"
			unit-name="Date"
			:current="current.getDate()"
			animate
		></clock-unit>
		<clock-divider class="Clock__divider" divider="/"></clock-divider>
		<clock-unit
			class="Clock__hours"
			unit-name="Hours"
			:current="current.getHours()"
			animate
		></clock-unit>
		<clock-divider class="Clock__divider"></clock-divider>
		<clock-unit
			class="Clock__minutes"
			unit-name="Minutes"
			:current="current.getMinutes()"
			animate
		></clock-unit>
		<clock-divider class="Clock__divider"></clock-divider>
		<clock-unit
			class="Clock__seconds"
			unit-name="Seconds"
			:current="current.getSeconds()"
			animate
		></clock-unit>
	</section>
</template>

<style lang="less" scoped>
	.Clock {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		display: flex;
		color: var(--clock-color);
		background: var(--clock-background);
		font-family: var(--ui-font);
		font-size: 6vmax;
	}

	@media screen and (max-width: 60vmax), screen and (max-width: 768px) {
		.Clock {
			top: 30%;
			flex-direction: column;
			align-items: center;

			&__divider {
				display: none;
			}

			&__date,
			&__seconds {
				display: none;
			}

			font-size: min(30vmin, 300px);
			--clock-unit-display: none;
		}

		.ClockUnit {
			margin-top: 1vh;
		}
	}
</style>

<script>
	import ClockDivider from '../components/ClockDivider.vue';
	import ClockUnit from '../components/ClockUnit.vue';

	export default {
		data() {
			return {
				current: new Date(),
				intervalId: undefined,
			};
		},

		computed: {
			isMinus() {
				return this.target - this.current < 0;
			},
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
			ClockDivider,
		},
	};
</script>
