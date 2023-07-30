<template>
  <v-container>
    <v-label class="lookup-label">
      Input Pathologic ({{ text.length || 0 }}/4000)
    </v-label>
    <v-row>
      <v-col>
          <v-responsive class="text-field-wrapper">
            <v-textarea
              variant="outlined"
              rows="4"
              color="on_green"
              v-model="text"
              :maxlength="4000"
              placeholder="Please Input"
              class="field-with-green-place-holder"
            />
          </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
  const text = ref<string>("")
</script>
