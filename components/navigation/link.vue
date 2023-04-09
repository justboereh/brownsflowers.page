<script setup>
const Props = defineProps({ item: Object })
</script>

<template>
    <a :href="item.href">
        <icon v-if="item.icon" :name="item.icon" />

        <p v-else class="hover:underline">{{ item.text }}</p>
    </a>
</template>
