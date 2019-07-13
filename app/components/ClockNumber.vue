<template>
	<div class="ClockNumber">
		<transition name="Slide" mode="out-in">
			<div v-for="i in numTexts" v-if="i === number" :key="i">
				{{i}}
			</div>
		</transition>
	</div>
</template>

<style lang="less" scoped>
	.ClockNumber {
		display: flex;
		font-size: 6vw;
		overflow: hidden;
		padding-left: 3vw;
		padding-right: 12vw;
		margin-left: -3vw;
		margin-right: -12vw;
	}

	.Slide {
		&-enter-active, &-leave-active {
			transition: all .4s ease;
		}

		&-enter {
			transform: translateX(-6vw);
		}

		&-leave-to {
			transform: skewX(40deg) translateY(6vw);
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				numTexts: [...Array(10)].map((v, i) => `${i}`)
			};
		},

		props: ['number']
	};
</script>
