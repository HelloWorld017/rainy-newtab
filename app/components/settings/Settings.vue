<template>
	<section class="Settings">
		<a class="Settings__close" @click.prevent="emit('close')">
			<XIcon width="1em" height="1em" />
		</a>

		<div class="Settings__inner">
			<div class="Settings__section">
				<h1>Weather</h1>
				<Textbox v-model="config.weather.location">Location</Textbox>
				<Textbox v-model="config.weather.appId">
					<a href="https://openweathermap.org/appid">OpenWeatherMap AppId</a>
				</Textbox>
				<Checkbox v-model="config.weather.showWeatherName">
					Display weather descriptions
				</Checkbox>
			</div>

			<div class="Settings__section">
				<h1>Theme</h1>
				<SettingsTheme />
			</div>
		</div>
	</section>
</template>

<style lang="less" scoped>
	.Settings {
		position: fixed;
		top: 10vh;
		left: 10vw;

		background: rgba(32, 32, 32, 0.8);
		backdrop-filter: blur(20px);
		border-radius: 20px;

		width: 80vw;
		height: 80vh;
		box-sizing: border-box;
		overflow: hidden;

		font-family: var(--ui-font);

		&__inner {
			display: flex;
			flex-direction: column;
			gap: 60px;
			height: 100%;

			box-sizing: border-box;
			overflow: auto;
			padding: 30px;
		}

		&__description {
			font-size: 10px;
		}

		&__close {
			position: absolute;
			top: 40px;
			right: 40px;

			cursor: pointer;
			color: #c1c1c1;
			font-size: 24px;
			text-decoration: none;
			z-index: 2;
		}

		&__section {
			display: flex;
			flex-direction: column;
			gap: 30px;

			h1 {
				color: #ffffff;
				font-weight: 700;
				margin-top: 20px;
				margin-bottom: 0;
			}

			a {
				color: inherit;
			}
		}
	}
</style>

<script lang="ts" setup>
	import { XIcon } from 'lucide-vue-next';
	import { useConfig } from '@/composables/useConfig';
	import SettingsTheme from './SettingsTheme.vue';
	import Checkbox from './common/Checkbox.vue';
	import Textbox from './common/Textbox.vue';

	const config = useConfig();
	const emit = defineEmits<{
		close: [];
	}>();
</script>
