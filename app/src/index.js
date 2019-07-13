import "typeface-notosans-kor";
import "@mdi/font/css/materialdesignicons.css";

import NewTab from "../pages/NewTab.vue";
import Vue from "vue";

new Vue({
	el: '#app',
	render(h) {
		return h(NewTab);
	}
});
