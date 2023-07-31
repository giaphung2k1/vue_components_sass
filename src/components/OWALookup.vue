<template>
  <div class="lookup-container">
    <v-container>
      <v-label
        class="lookup-label"
        text="Label for lookup"
      ></v-label>
      <v-text-field
        type="text"
        @input="handleInput"
        :value="lookupValue"
        placeholder="Enter lookup values"
        ref="lookupInput"
        variant="outlined"
        :hide-details="true"
        color="on_green"
      >
        <template v-slot:append-inner> </template>
      </v-text-field>
      <!-- dropdown -->
      <v-list
        class="lookup-list"
        v-if="!isSelected && lookupValue.length > 0"
      >
        <v-list-item
          v-for="(item, i) in filteredData"
          :key="i"
          @click="handleSelectItem(item.id,item.description)"
        >
          <template v-slot:prepend>
            <span class="index"> {{ item.id }}</span>
          </template>
          <v-list-item-title
            v-text="item.description"
          ></v-list-item-title>
        </v-list-item>
        <!-- no result -->
        <div v-if="filteredData.length === 0" class="no-result" @click.prevent>
          <span class="text">No result</span>
        </div>
      </v-list>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { OWALookupData } from "@/list/data";

const lookupValue = ref("");
const isSelected = ref(false);
const lookupInput = ref<HTMLInputElement | null>(null);

const handleInput = (e: Event) => {
  isSelected.value = false;
  lookupValue.value = (e.target as HTMLInputElement).value;
};

const handleSelectItem = (id:string,selectedItem: string) => {
  lookupValue.value = id +" "+selectedItem;
  isSelected.value = true;
};

// const handleClear = () => {
//   if (lookupInput && lookupInput.value) {
//     lookupInput.value.focus();
//   }
//   isSelected.value = false;
//   lookupValue.value = "";
// };

const filteredData = computed(() => {
  return OWALookupData.filter((item) =>
    item.description.toLowerCase().includes(lookupValue.value.toLowerCase())
  );
});

watch(lookupValue, (currentValue) => {
  if (currentValue.length === 0) {
    isSelected.value = false;
  }
});
</script>

<style lang="css" scoped>
@import "@/assets/styles/lookup.scss";
</style>
