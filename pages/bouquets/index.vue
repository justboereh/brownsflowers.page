<script setup>
const route = useRoute()

const { data: bouquets } = await useFetch(`/api${route.fullPath}`, {
    watch: [route.fullPath],
})
</script>

<template>
    <max-wrap>
        <div class="flex gap-4">

            <div class="">

            </div>
        </div>
    </max-wrap>
</template>
