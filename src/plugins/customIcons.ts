import { h } from "vue";
import type { IconSet, IconProps } from "vuetify";
import RoundedAddIcon from "@/assets/icons/RoundedAddIcon.vue"

const customSvgNameToComponent: any = {
  "rounded-add-icon": RoundedAddIcon,
};

const customIcons: IconSet = {
  component: (props: IconProps) => h(customSvgNameToComponent[props.icon]),
};

export { customIcons };