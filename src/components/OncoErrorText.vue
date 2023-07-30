<style scoped>
    div {
        color: red;
    }
</style>

<template>
    <div v-show="errorMsg != null && errorMsg != ''">
        {{ props.errorMsg }}
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        errorMsg: String
    });
</script>
