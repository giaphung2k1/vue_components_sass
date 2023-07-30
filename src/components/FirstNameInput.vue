<template>
  <v-form v-model="valid">
    <v-container>
      <v-label class="lookup-label">
        First Name
      </v-label>
      <v-row>
        <v-col>
            <v-responsive class="text-field-wrapper">
              <v-text-field
                variant="outlined"
                color="on_green"
                placeholder="Please Input"
                class="field-with-green-place-holder"
                :rules="firstNameRule"
                :maxlength="40"
                v-model="text"
              />
            </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
  const text = ref<string>("")
  const valid = ref<boolean>(false)
  const firstNameRule = [
    (value: string | null | undefined) => {
      if (!value) {
        return 'Name is requred.'
      }
      return true
    },
  ]
</script>
