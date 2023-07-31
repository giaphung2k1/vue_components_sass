/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// import { oncodb } from '@onco-monorepo/dbaccess'

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";


// import "@/styles/index.css";
import "@/assets/styles/lookup.scss";

const app = createApp(App);

registerPlugins(app);
app.mount("#app");
// oncodb.initialize(`${window.origin}/api/v1/`).then((res) => {
//   else {
//     const appDiv = document.getElementById("app");
//     if (appDiv != null)
//       appDiv.innerHTML =
//         "It appears we are unable to contact our backend, please refresh the page in a few minutes to try again!";
//   }
// });
