<template>
    <v-btn ref='btnMe' @click="() => emit('click')" >{{ props.label }}</v-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VBtn } from 'vuetify/lib/components/index';

const props = defineProps({ label: String});
const emit = defineEmits(['click']);
const btnMe = ref<typeof VBtn>();

const focus = (): void => {
    btnMe?.value?.$el.focus();
}

defineExpose({focus});
</script>
