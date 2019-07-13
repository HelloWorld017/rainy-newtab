import NewTab from "../pages/NewTab.vue";
import Vue from "vue";

new Vue({
	target: '#app',
	render(h) {
		return h(NewTab);
	}
});
