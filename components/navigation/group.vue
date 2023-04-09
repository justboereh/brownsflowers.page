<script setup>
const Props = defineProps({
    text: String,
    headerclass: String,
})
</script>

<template>
    <div>
        <div
            class="flex text-sm items-center gap-4 text-black/50"
            :class="headerclass"
        >
            <h2>{{ text }}</h2>

            <span class="h-px flex-grow bg-light-700" />
        </div>

        <div class="h-2" />

        <slot />
    </div>
</template>
