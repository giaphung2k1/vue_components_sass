<template>
  <v-container>
    <v-label class="lookup-label">
      Doctor
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
                <ModalCreateDoctor title="Facility" @on-submit="handleSubmit" />
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
                  v-for="column in columnsDoctor"
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
                  v-for="doctor in filteredData"
                  :key="doctor.id"
                  @click="handleSelectItem(doctor.lastName, doctor.firstName)"
                >
                  <td
                    class="id-cell"
                  >
                    {{ doctor.id }}
                  </td>
                  <td
                    class="last-name-cell"
                  >
                    {{ doctor.lastName }}
                  </td>
                  <td
                    class="first-name-cell"
                  >
                    {{ doctor.firstName }}
                  </td>
                  <td
                    class="npi-cell"
                  >
                    {{ doctor.npi }}
                  </td>
                  <td
                    class="license-number-cell"
                  >
                    {{ doctor.licenseNumber }}
                  </td>
                  <td
                    class="specialty-cell"
                  >
                    {{ doctor.specialty }}
                  </td>
                  <td
                    class="address-city-state-cell"
                  >
                    {{ doctor.addressCityState }}
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
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { doctors, columnsDoctor } from "@/list/data";
import { Doctor } from "@/types/dataTypes";
import ModalCreateDoctor from "./ModalCreateDoctor.vue";

const lookupInputRef = ref<HTMLInputElement | null>(null);
const lookupValue = ref("");
const doctorsData = ref(doctors);

const isSelected = ref(false);

const handleInput = (e: Event) => {
  isSelected.value = false;
};

const handleSelectItem = (lastName: string, firstName: string) => {
  lookupValue.value = lastName+", "+firstName;
  isSelected.value = true;
};

const handleSubmit = (data: Doctor) => {
  if (
    data.firstName &&
    data.lastName &&
    data.licenseNumber &&
    data.npi &&
    data.addressCityState &&
    data.id &&
    data.specialty
  ) {
    doctorsData.value.push(data);
  }
};

const filteredData = computed(() => {
  const lookupKeys:(keyof Doctor)[] = ['firstName', "lastName", "licenseNumber", "npi", "addressCityState", "specialty"]
  return doctorsData.value.filter(
    (item) => {
      return !!lookupKeys.find((key) => {
        return (
          item[key]
            .toString()
            .toLowerCase()
            .includes(lookupValue.value.toLowerCase()))
      })
    }
  );
});
</script>

<style scoped lang="css">
@import "@/assets/styles/lookup.scss";
</style>
