<script setup>
const Props = defineProps({ text: String })

const contentVisible = ref(false)
</script>

<template>
    <div class="border border-light-900">
        <button
            class="flex items-center justify-between gap-4 w-full p-4"
            @click="contentVisible = !contentVisible"
        >
            <header class="text-lg text-left">{{ text }}</header>

            <div
                class="h-6 w-6 relative grid place-items-center transform transition duration-200"
                :class="contentVisible ? 'rotate-180' : ''"
            >
                <icon
                    name="fluent:add-16-regular"
                    class="absolute transition duration-200"
                    :class="contentVisible ? 'opacity-0' : ''"
                />
                <icon
                    name="fluent:subtract-16-regular"
                    :class="contentVisible ? '' : 'opacity-0'"
                />
            </div>
        </button>

        <div
            v-if="contentVisible"
            class="text-black/75 p-4 pt-0 flex flex-col gap-y-4 text-sm"
        >
            <slot />
        </div>
    </div>
</template>
