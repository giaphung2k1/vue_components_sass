<template>
    <component :is="layout">
        <router-view/>
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    import MainLayout  from "@/layouts/MainLayout.vue";
    import DesktopLoginLayout from '@/layouts/DesktopLoginLayout.vue';

    const route = useRoute();

    const layout = computed(() => {
        const layoutName = route?.meta?.layout;

        if (layoutName != null) {
            if(layoutName === "MainLayout") return MainLayout;
            else if (layoutName === "DesktopLayout") return DesktopLoginLayout;
            else throw `Unknown layout ${layoutName}`;
        } else {
            return 'div';
        }
    });
</script>
