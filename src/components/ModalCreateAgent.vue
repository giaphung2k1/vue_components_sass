<template>
  <v-dialog class="modal-add-item" max-width="550px" v-model="showModal">
    <template v-slot:activator>
      <v-btn
        icon="custom:rounded-add-icon"
        density="compact"
        color="#00695c" 
        @click.prevent.stop="handleClickAdd"
      >
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="modal-title">
        {{ title }}
      </v-card-title>
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

const showModal = ref(false);

const handleReset = () => {
};

const handleClickAdd = () => {
  showModal.value = true
}

const handleSubmit = () => {
  emits("onSubmit");
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
