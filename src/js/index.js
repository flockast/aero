import Vue from 'vue';

let el = document.getElementById('app');
import App from "../components/App.vue";

if(el) {
    new Vue({
        el,
        components: {
            App
        },
        template: `<App/>`
    });
}
