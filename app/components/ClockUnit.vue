<template>
	<div class="ClockUnit">
		<template v-if="animate">
			<div class="ClockUnit__numbers">
				<clock-number v-for="count in (counts)" :number="numbers[count - 1]"></clock-number>
			</div>
		</template>
		<span class="ClockUnit__left" v-else>
			{{left}}
		</span>

		<span class="ClockUnit__unit">
			{{unitName}}
		</span>
	</div>
</template>

<style lang="less" scoped>
	.ClockUnit {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 1vw;

		&__left {
			font-size: 6vw;
		}

		&__numbers {
			display: flex;
		}

		&__unit {
			font-family: 'Noto Sans KR', sans-serif;
			font-weight: 400;
			font-size: 1vw;
		}
	}
</style>

<script>
	import ClockNumber from "./ClockNumber.vue";

	export default {
		props: {
			unitName: {
				type: String,
				default: "Seconds"
			},

			current: {
				type: Number,
				default: Date.now()
			},

			animate: {
				type: Boolean
			},

			counts: {
				type: Number,
				default: 2
			}
		},

		methods: {
			padn(n, i) {
				return i.toString().padStart(n, '0');
			}
		},

		computed: {
			left() {
				return this.padn(this.counts, this.current);
			},

			numbers() {
				return this.left.split('');
			}
		},

		components: {
			ClockNumber
		}
	};
</script>
