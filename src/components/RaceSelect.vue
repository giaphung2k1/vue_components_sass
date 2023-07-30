<template>
  <v-container>
    <v-label class="lookup-label">
      Race
    </v-label>
    <v-row>
      <v-col>
        <v-responsive class="text-field-wrapper">
          <v-autocomplete
            variant="outlined"
            color="on_green"
            placeholder="Please Select"
            class="field-with-green-icon"
            :hide-details="true"
            append-inner-icon="mdi-chevron-down"
            :items="races"
            ref="selectRef"
            @update:model-value="selectRef.blur()"
          >
            <template v-slot:selection="{ item }">
              {{ item.raw.key }} {{ item.raw.title }}
            </template>
            <template v-slot:item="{ item, props: itemProps }" >
              <v-list-item v-bind="itemProps" class="option-with-bordered-index" border="0">
                <template v-slot:prepend>
                  <div class="index-item">
                    {{ item.raw.key }}
                  </div>
                </template>
              </v-list-item>
            </template>
          </v-autocomplete>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { races } from "@/list/data";
import { VNodeRef } from "vue";
import { ref } from "vue";

const selectRef = ref<VNodeRef | undefined>(undefined)

</script>
