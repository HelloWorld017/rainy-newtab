<template>
	<ThemeSurface @contextmenu="showOptions">
		<div class="Top">
			<Clock />
			<Date />
			<Weather />
		</div>

		<div class="Bottom">
			<span class="Bottom__first" v-if="config.initial">
				Right click to open settings...
			</span>
		</div>

		<Transition name="Fade">
			<div class="Backdrop" v-if="isSettingVisible" @click="hideOptions"></div>
		</Transition>

		<!-- <Transition name="Dialog">
			<settings v-if="isSettingVisible" @close="hideOptions"></settings>
		</Transition> -->
	</ThemeSurface>
</template>

<style lang="less">
	@import '@fontsource/geist-sans';

	:root {
		--ui-font: 'Geist Sans', 'Pretendard JP', sans-serif;
	}

	body,
	html,
	#app {
		padding: 0;
		margin: 0;

		width: 100vw;
		height: 100vh;
		font-size: max(18px, 2vmin);
	}
</style>

<style lang="less" scoped>
	.Top {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding-top: 4rem;
		padding-left: 4rem;
	}

	.Bottom {
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		position: fixed;
		bottom: 50px;
		right: 50px;

		&__first {
			color: var(--theme-fill-primary);
			font-size: 1rem;
			font-family: var(--ui-font);
		}
	}

	.Backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
	}

	.Dialog {
		&-enter-active,
		&-leave-active {
			transition: all 0.4s ease;
		}

		&-enter-from,
		&-leave-to {
			opacity: 0;
			transform: translateY(100px);
		}
	}

	.Fade {
		&-enter-active,
		&-leave-active {
			transition: all 0.4s ease;
		}

		&-enter-from,
		&-leave-to {
			opacity: 0;
		}
	}
</style>

<script lang="ts" setup>
	import { ref } from 'vue';
	import ThemeSurface from '@/components/ThemeSurface.vue';
	import Clock from '@/components/widgets/Clock/Clock.vue';
	import Date from '@/components/widgets/Date/Date.vue';
	import Weather from '@/components/widgets/Weather/Weather.vue';
	import { useConfig } from '@/composables/useConfig';

	const config = useConfig();
	const isSettingVisible = ref(false);
	const showOptions = () => {
		if (config.initial) {
			config.initial = false;
		}

		isSettingVisible.value = true;
	};

	const hideOptions = () => {
		isSettingVisible.value = false;
	};
</script>
