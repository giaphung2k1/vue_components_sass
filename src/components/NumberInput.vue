<template>
  <v-form v-model="valid">
    <v-container>
      <v-label class="lookup-label">
        {{ label || 'Label' }}
      </v-label>
      <v-row>
        <v-col>
          <v-responsive class="text-field-wrapper">
            <v-text-field
              variant="outlined"
              color="on_green"
              :placeholder="placeholder || 'Please input'"
              :rules="numberRule"
              v-model="number"
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

const props = defineProps<{
  max?: number
  min?: number
  label?: string
  placeholder?: string
}>()

const number = ref<number | null>(null)
const valid = ref<boolean>(false)
const numberRule = [
  (value: string | null | undefined) => {
    if (!value) {
      return 'Field is required.'
    }
    return true
  },
  (value: string | null | undefined) => {
    if (value && /^[\d]+$/.test(value)) {
      return true
    }
    return 'Field can only contain number.'
  },
  (value: number) => {
    if (props.max && value > props.max) {
      return 'Field value must be less than ' + props.max
    }
    if (props.min && value < props.min) {
      return 'Field value must be greater than ' + props.min
    }
    return true
  },
]
</script>
