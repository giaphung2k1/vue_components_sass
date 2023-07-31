<template>
  <v-dialog class="modal-add-item" max-width="550px" v-model="showModal">
    <template v-slot:activator>
      <v-btn
        @click="showModal = true"
        icon="custom:rounded-add-icon"
        density="compact"
        color="#00695c"
      >
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="modal-title">
        {{ title }}
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            :cols="input.cols"
            v-for="(input, index) in doctorInputs"
            :key="index"
          >
            <label class="field-label">
              {{ input.label }}
            </label>
            <v-text-field
              v-if="input.type === 'text'"
              variant="outlined"
              placeholder="Please Input"
              density="compact"
              color="on_green"
              :hide-details="true"
              v-model="data[input.name]"
              class="custom-input"
            />
            <v-select
              v-if="input.type === 'select'"
              :items="fakeStateData"
              item-title="value"
              item-value="value"
              variant="outlined"
              v-model="data[input.name]"
              density="compact"
              color="on_green"
              placeholder="Please Select"
              class="field-with-green-icon"
              :hide-details="true"
              append-inner-icon="mdi-chevron-down"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="modal-actions">
        <v-btn @click="handleClose" class="button-cancel"
          >Cancel</v-btn
        >
        <v-btn @click="handleSubmit" class="button-confirm">
          Okay
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { fakeStateData } from "@/list/data";
import doctorInputs from "@/list/modal/doctorInputs";
import { Doctor } from "@/types/dataTypes";

const showModal = ref(false);

const data = ref<Doctor>({
  id: "",
  lastName: "",
  firstName: "",
  addressCityState: "",
  licenseNumber: "",
  npi: "",
  specialty: ""
});

const handleReset = () => {
  data.value = {
    id: "",
    lastName: "",
    firstName: "",
    addressCityState: "",
    licenseNumber: "",
    npi: "",
    specialty: ""
  };
};

const handleSubmit = () => {
  emits("onSubmit", { ...data.value, id: Date.now().toString() });
  handleClose();
};

const handleClose = () => {
  showModal.value = false;
  handleReset();
};

defineProps({
  title: {
    type: String,
    default: "Title",
  },
});
const emits = defineEmits(["onSubmit"]);
</script>
<style scoped lang="css">
@import "@/assets/styles/lookup.scss";
</style>
