<template>
	<component :is="numTexts[+number]" />
</template>

<script setup>
	import Number0 from '../assets/svgs/Number0.svg?component';
	import Number1 from '../assets/svgs/Number1.svg?component';
	import Number2 from '../assets/svgs/Number2.svg?component';
	import Number3 from '../assets/svgs/Number3.svg?component';
	import Number4 from '../assets/svgs/Number4.svg?component';
	import Number5 from '../assets/svgs/Number5.svg?component';
	import Number6 from '../assets/svgs/Number6.svg?component';
	import Number7 from '../assets/svgs/Number7.svg?component';
	import Number8 from '../assets/svgs/Number8.svg?component';
	import Number9 from '../assets/svgs/Number9.svg?component';

	const numTexts = [
		Number0,
		Number1,
		Number2,
		Number3,
		Number4,
		Number5,
		Number6,
		Number7,
		Number8,
		Number9,
	];

	const props = defineProps({
		number: String,
	});
</script>
