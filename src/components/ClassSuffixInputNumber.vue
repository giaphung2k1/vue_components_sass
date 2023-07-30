<template>
  <v-container>
    
    <v-row class="class-suffix-wrapper">
      <v-col class="class-suffix-left">
        <v-label class="lookup-label">Class suffix</v-label>
        <div class="resize-on-hover">
          <v-autocomplete
            single-line
            variant="outlined"
            color="on_green"
            placeholder="Please Select"
            class="field-with-green-icon"
            append-inner-icon="mdi-chevron-down"
            :items="classSuffixs"
          />
        </div>
      </v-col>
      
      <v-col class="class-suffix-right">
        <v-label class="lookup-label">Integer Component</v-label>
        <div class="resize-on-hover">
          <v-text-field
            variant="outlined"
            color="on_green"
            placeholder="Please input"
            :rules="numberRule"
            v-model="number"
            class="field-with-green-place-holder"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { classSuffixs } from "@/list/data";
import { ref } from "vue";

const number = ref<number | null>(null);
const max = 20;
const min = 2;
const numberRule = [
  (value: string | null | undefined) => {
    if (!value) {
      return "Field is required.";
    }
    return true;
  },
  (value: string | null | undefined) => {
    if (value && /^[\d]+$/.test(value)) {
      return true;
    }
    return "Field can only contain number.";
  },
  (value: number) => {
    if (max && value > max) {
      return "Field value must be less than " + max;
    }
    if (min && value < min) {
      return "Field value must be greater than " + min;
    }
    return true;
  }
];
</script>

<style scoped lang="css">
@import "@/assets/styles/lookup.css";
</style>
