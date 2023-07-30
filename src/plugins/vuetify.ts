/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import '@fortawesome/fontawesome-free/css/all.css' 
import "vuetify/styles";
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import { customIcons } from "./customIcons";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          on_green: "#00788A",
          on_orange: "#F8981D",
          on_darkgreen: "#00292F",
          on_lightgreen: "#B2CBCF",
          on_grey: "#CCD8DC",
          on_lightorange: "#EDB42F",
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      fa,
      mdi,
      custom: customIcons,
    },
  },
});
