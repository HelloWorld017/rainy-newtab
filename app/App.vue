<template>
	<h3>Hello</h3>
	<!-- <background @context="showOptions">
		<clock></clock>

		<div class="Bottom">
			<span class="Bottom__first" v-if="settingsNotOpened">
				Right click to open settings...
			</span>
			<weather></weather>
			<search-bar></search-bar>
		</div>

		<transition name="Fade">
			<div class="Backdrop" v-if="options" @click="hideOptions"></div>
		</transition>

		<transition name="Dialog">
			<settings v-if="options" @close="hideOptions"></settings>
		</transition>
	</background> -->
</template>

<style lang="less">
:root {
	--ui-font: 'Geist Sans', sans-serif;
}

body,
html,
#app {
	padding: 0;
	margin: 0;

	width: 100vw;
	height: 100vh;
}
</style>

<style lang="less" scoped>
.Bottom {
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	position: fixed;
	bottom: 50px;
	right: 50px;

	&__first {
		color: #f1f2f3;
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

<script setup>
import { ref } from 'vue';
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

export { showOptions, hideOptions };
</script>
