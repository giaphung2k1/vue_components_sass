<template>
  <v-container>
    <v-label class="lookup-label">
      Facility
    </v-label>
    <v-row>
      <v-col>
        <div class="table-dropdown-wrapper">
          <v-responsive class="text-field-wrapper">
            <v-text-field
              type="text"
              v-model="lookupValue"
              placeholder="Enter lookup values"
              ref="lookupInputRef"
              variant="outlined"
              :hide-details="true"
              color="on_green"
              @input="handleInput"
            >
              <template v-slot:append-inner>
                <!-- modal -->
                <Modal title="Facility" @on-submit="handleSubmit" />
              </template>
            </v-text-field>
          </v-responsive>
          <v-table
            class="table-dropdown lookup-table"
            v-if="lookupValue.length > 0 && !isSelected"
          >
            <thead>
              <tr>
                <th
                  v-for="column in columnsFacility"
                  :key="column.key"
                  :class="column.class"
                >
                  {{ column.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <template 
                v-if="filteredData.length > 0">
                <tr
                  v-for="facility in filteredData"
                  :key="facility.id"
                  @click="handleSelectItem(facility.stateCod,facility.hospitalName)"
                >
                  <td
                    v-for="column in columnsFacility"
                    :key="column.key"
                    :class="column.class"
                  >
                    {{ facility[column.key] }}
                  </td>
                </tr>
              </template>
            </tbody>
          </v-table>
          <!-- no results -->
          <div v-if="filteredData.length === 0 && !isSelected" class="no-result">
            <span class="table-text">No result</span>
          </div>
        </div>
      </v-col>
    </v-row>
    <!-- dropdown -->
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { facilities, columnsFacility } from "@/list/data";
import Modal from "./Modal.vue";
import { Facility } from "@/types/dataTypes";

const lookupInputRef = ref<HTMLInputElement | null>(null);
const lookupValue = ref("");
const facilitiesData = ref(facilities);

const isSelected = ref(false);

const handleInput = (e: Event) => {
  isSelected.value = false;
};

const handleSelectItem = (stateCod:string,hospitalName: string) => {
  lookupValue.value = stateCod +" "+hospitalName;
  isSelected.value = true;
};

const handleSubmit = (data: Facility) => {
  console.log(data);
  if (
    data.hospitalName &&
    data.reportName &&
    data.addressNo1 &&
    data.addressNo2 &&
    data.city &&
    data.state &&
    data.stateCod &&
    data.npi &&
    data.id &&
    data.otherID
  ) {
    facilitiesData.value.push(data);
  }
};



const filteredData = computed(() => {

  return facilitiesData.value.filter(
    (item) =>
      item.stateCod.toLowerCase().includes(lookupValue.value.toLowerCase()) ||
      item.hospitalName
        .toLowerCase()
        .includes(lookupValue.value.toLowerCase()) ||
      item.city.toLowerCase().includes(lookupValue.value.toLowerCase()) ||
      item?.state?.toLowerCase().includes(lookupValue.value.toLowerCase())
  );
});
</script>

<style scoped lang="css">
@import "@/assets/styles/lookup.css";
.state-cod-text {
  color: #00695c;
}
</style>
