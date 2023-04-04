<script setup>
const route = useRoute()
</script>

<template>
    {{ route.params.slug }}
</template>
