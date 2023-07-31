<template>
  <v-container>
    <v-label class="lookup-label">
      Class suffix
    </v-label>
    <v-row class="class-suffix-wrapper">
      <v-col class="class-suffix-left">
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
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import  { classSuffixs } from "@/list/data"
</script>

<style scoped lang="css">
@import "@/assets/styles/lookup.scss";
</style>
