<template>
	<div class="ClockUnit">
		<template v-if="animate">
			<div class="ClockUnit__numbers">
				<transition-group name="Slide">
					<clock-number
						v-for="count in counts"
						:key="count"
						:number="numbers[count - 1]"
					/>
				</transition-group>
			</div>
		</template>
		<span class="ClockUnit__left" v-else>
			{{ left }}
		</span>

		<span class="ClockUnit__unit">
			{{ unitName }}
		</span>
	</div>
</template>

<style lang="less" scoped>
	.ClockUnit {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 1vmax;

		&__numbers {
			display: flex;
			justify-content: center;
			width: 1.5em;
		}

		&__unit {
			font-family: var(--ui-font);
			font-weight: 400;
			font-size: 1vmax;

			display: var(--clock-unit-display, block);
		}
	}

	.Slide {
		&-enter-active,
		&-leave-active,
		&-move {
			transition: all 0.4s ease;
		}

		&-leave-active {
			position: absolute;
		}

		&-enter-from {
			opacity: 0;
			transform: translateX(-6vw);
		}

		&-leave-to {
			transform: skewX(40deg) translateY(6vw);
			opacity: 0;
		}
	}
</style>

<script>
	import ClockNumber from './ClockNumber.vue';

	export default {
		props: {
			unitName: {
				type: String,
				default: 'Seconds',
			},

			current: {
				type: Number,
				default: Date.now(),
			},

			animate: {
				type: Boolean,
			},

			counts: {
				type: Number,
				default: 2,
			},
		},

		methods: {
			padn(n, i) {
				return i.toString().padStart(n, '0');
			},
		},

		computed: {
			left() {
				return this.padn(this.counts, this.current);
			},

			numbers() {
				return this.left.split('');
			},
		},

		components: {
			ClockNumber,
		},
	};
</script>
