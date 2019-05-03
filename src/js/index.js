import Vue from 'vue';
import VueMoment from 'vue-moment';

Vue.use(VueMoment);

let el = document.getElementById('app');
import App from "../components/App.vue";

if (el) {
    new Vue({
        el,
        components: {
            App
        },
        template: `<App/>`
    });
}
