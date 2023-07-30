<template>
  <v-container>
    <v-label class="checkbox-title">
      Checkbox
    </v-label>
    <v-checkbox
      v-model="selected"
      label="Summary this facility"
      color="on_green"
    ></v-checkbox>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const selected = ref<boolean>(false)

</script>
