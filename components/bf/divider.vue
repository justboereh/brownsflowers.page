<script setup>
defineProps({ number: String, text: String })
</script>

<template>
    <div class="flex gap-1 h-8 text-white">
        <span class="w-8 h-8 bg-brand-purple grid place-items-center">
            {{ number }}
        </span>

        <span class="flex-grow h-8 bg-brand-purple flex items-center px-3">
            {{ text }}
        </span>
    </div>
</template>
