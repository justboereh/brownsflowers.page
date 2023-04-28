<script setup>
import { useElementBounding } from '@vueuse/core'

const {
    $bouquets: { params },
} = useNuxtApp()

const filterElement = ref()
const { bottom: filterBottom } = useElementBounding(filterElement)
const isFilterEnabled = ref(false)
</script>

<template>
    <button
        class="h-full w-10 border border-light-900 whitespace-nowrap"
        @click="isFilterEnabled = true"
    >
        <icon name="fluent:filter-16-regular" />
    </button>

    <div
        class="w-grow flex items-center overflow-x-auto overflow-y-hidden text-sm gap-4 whitespace-nowrap"
    >
        <pages-bouquets-top-filter-panel-wrap name="colors" />
        <pages-bouquets-top-filter-panel-wrap name="flowers" />
        <pages-bouquets-top-filter-panel-wrap name="occasions" />
        <pages-bouquets-top-filter-panel-wrap name="styles" />
    </div>

    <div
        ref="filterElement"
        class="fixed z-20 bottom-0 w-full h-screen bg-black/50 left-0 px-4 py-18 overflow-hidden"
        :class="isFilterEnabled ? '' : 'pointer-events-none opacity-0'"
        :style="`max-height: ${filterBottom}px`"
    >
        <div
            class="w-full max-h-full h-full py-4 flex flex-col gap-4 bg-white border border-light-900"
        >
            <div class="px-4">
                <button
                    class="flex items-center gap-1"
                    @click="isFilterEnabled = false"
                >
                    <icon name="fluent:chevron-left-16-regular" />

                    Back
                </button>
            </div>

            <div class="flex flex-col gap-4 flex-grow overflow-y-auto px-4">
                <pages-bouquets-side-filter-panel />
            </div>
        </div>
    </div>
</template>
