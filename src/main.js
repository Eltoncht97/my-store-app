import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSidebarMenu from 'vue-sidebar-menu'
import "./assets/tailwind.css";
import "flowbite";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import moment from "moment";
import Print from 'vue-print-nb'
// uso font awesome?
import "./utils/icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'



const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueSidebarMenu)
  .use(Print)
  .component("v-select", vSelect)
  .component("font-awesome-icon", FontAwesomeIcon);

app.config.globalProperties.$filters = {
  formatDate(value) {
    if (value) {
      return moment(String(value)).format("DD/MM/YYYY");
    }
  },
};

app.mount("#app");
