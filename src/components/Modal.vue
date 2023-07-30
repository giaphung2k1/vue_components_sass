<template>
  <v-dialog class="modal-add-item" max-width="550px" v-model="showModal">
    <template v-slot:activator="{ props }">
      <v-btn
        @click="showModal = true"
        icon="custom:rounded-add-icon"
        density="compact"
        color="#00695c"
      >
      </v-btn>
    </template>
    <v-card>
      <v-card-title
        class="modal-title"
      >
        {{ title }}
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            :cols="input.cols"
            v-for="(input, index) in facilityInputs"
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
              :class="`custom-input `"
            ></v-text-field>
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
            ></v-select>
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
import facilityInputs from "@/list/modal/facilityInputs";
import { Facility } from "@/types/dataTypes";

const showModal = ref(false);




const data = ref<Facility>({
  id: "",
  stateCod: "",
  hospitalName: "",
  city: "",
  state: undefined,
  reportName: "",
  addressNo1: "",
  addressNo2: "",
  npi: "",
  otherID: "",
});

const handleReset = () => {
  data.value = {
    id: "",
    stateCod: "",
    hospitalName: "",
    city: "",
    state: "",
    reportName: "",
    addressNo1: "",
    addressNo2: "",
    npi: "",
    otherID: "",
  };
};

const handleSubmit = () => {
  emits("onSubmit", data.value);
  handleClose();
};

const handleClose = () => {
  showModal.value = false;
  handleReset();
};

const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
});
const emits = defineEmits(["onSubmit"]);
</script>



<style scoped lang="css">
@import "@/assets/styles/lookup.css";
</style>
