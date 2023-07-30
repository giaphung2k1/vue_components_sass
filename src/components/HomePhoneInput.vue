<template>
  <v-form v-model="valid">
    <v-container>
      <v-label class="lookup-label">
        Home Phone
      </v-label>
      <v-row>
        <v-col>
            <v-responsive class="text-field-wrapper">
              <v-text-field
                variant="outlined"
                color="on_green"
                placeholder="0000-00-000"
                :rules="phoneNumberRule"
                :maxlength="40"
                v-model="text"
                class="field-with-green-place-holder"
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
  const phoneNumberRule = [
    (value: string | null | undefined) => {
      if (!value) {
        return 'Home phone is requred.'
      }
      return true
    },
    (value: string | null | undefined) => {
      if (value && /^[\d-]+$/.test(value)) {
        return true
      }
      return 'Home phone can only contain number and hyphen.'
    }
  ]
</script>
