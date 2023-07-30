<template>
  <v-container>
    <v-label class="lookup-label">
      Agent
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
                <ModalCreateAgent />
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
                  v-for="column in columnsAgent"
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
                  v-for="agent in filteredData"
                  :key="agent.value"
                  @click="handleSelectItem(agent.code, agent.description)"
                >
                  <td
                    v-for="column in columnsAgent"
                    :key="column.key"
                    :class="column.class"
                  >
                    {{ agent[column.key] }}
                  </td>
                </tr>
              </template>
            </tbody>
            <!-- no results -->
            <div v-if="filteredData.length === 0 && !isSelected" class="no-result">
              <span class="table-text">No result</span>
            </div>
          </v-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ModalCreateAgent from './ModalCreateAgent.vue';
import { columnsAgent } from '@/list/data';
import { Agent } from '@/types/dataTypes';
import { ref } from 'vue';
import { computed } from 'vue';


const testItems = [
  {
    description: "Ancillary Drugs, NOS",
    value: "1",
    code: "DA000"
  },
  {
    description: "Ancillary Drugs, NOS",
    value: "2",
    code: "DA000"
  },
  {
    description: "Ancillary Drugs, NOS",
    value: "3",
    code: "DA000"
  },
  {
    description: "Ancillary Drugs, NOS",
    value: "4",
    code: "DA000"
  },
  {
    description: "Ancillary Drugs, NOS",
    value: "5",
    code: "DA000"
  },
  {
    description: "Ancillary Drugs, NOS",
    value: "6",
    code: "DA000"
  },
  {
    description: "Ancillary Drugs, NOS",
    value: "7",
    code: "DA000"
  },
  {
    description: "Ancillary Drugs, NOS",
    value: "8",
    code: "DA000"
  },
  {
    description: "Ancillary Drugs, NOS",
    value: "9",
    code: "DA000"
  },
  {
    description: "Ancillary Drugs, NOS",
    value: "10",
    code: "DA000"
  },
  {
    description: "Ancillary Drugs, NOS",
    value: "11",
    code: "DA000"
  },
  {
    description: "Ancillary Drugs, NOS",
    value: "12",
    code: "DA000"
  },
]

const lookupValue = ref("");
const isSelected = ref(false);

const handleInput = (e: Event) => {
  isSelected.value = false;
};

const handleSelectItem = (code: string, description: string) => {
  lookupValue.value = [code, description].join(" - ");
  isSelected.value = true;
};

const filteredData = computed(() => {
  const lookupKeys:(keyof Agent)[] = ['code', 'description']
  return testItems.filter(
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
