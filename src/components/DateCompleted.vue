<template>

  <v-container>
      <v-label class="lookup-label">
        Date picker
      </v-label>
      <v-row>
        <v-col>
            <v-responsive class="text-field-wrapper">
              <v-text-field
                type="date"
                v-model="date"
                persistent-hint
                variant="outlined"
                color="on_green"
              />
            </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  
</template>
<script setup lang="ts">
import { ref } from 'vue';

const date = ref<string | undefined | null>(undefined)
</script>