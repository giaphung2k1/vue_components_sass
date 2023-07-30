<template>
    <VTextField
        :label="props.label"
        :model-value="modelValue"
        :type="password ? 'password' : 'input'"
        @update:model-value="(text: string) => emit('update:modelValue', text)"
        ref="txtBox"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VTextField } from 'vuetify/lib/components/index';

const props = defineProps({
    label: { type: String, required: true },
    password: { type: Boolean, default: false },
    modelValue: String
});

const emit = defineEmits(['update:modelValue']);
const txtBox = ref<typeof VTextField>();

const focus = (): void => {
    txtBox?.value?.focus();
}

defineExpose({focus});

</script>
