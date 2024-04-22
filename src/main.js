import { createApp } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import App from './App.vue'
// import PhoneInput from "../src/components/PhoneInput.vue";

import './assets/main.scss'

const app = createApp(App)
// Vue.component('input-search', InputSearch);

app.use(useVuelidate)
app.mount('#app')

