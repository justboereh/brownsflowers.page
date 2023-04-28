<script setup>
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

const {
    $bouquets: { list, last, pending, params, keep },
} = useNuxtApp()

const breakpoints = useBreakpoints(breakpointsTailwind)

const bouquetList = computed(() => {
    if (list.value.length < 1) return []

    let chunkSize = 2
    if (breakpoints.greater('lg').value) chunkSize = 3

    const length = Math.floor(list.value.length / chunkSize)
    const result = []

    for (let i = 0; i < length; i++) {
        const slice = list.value.slice(i * chunkSize, i * chunkSize + chunkSize)

        result.push(slice)
    }

    return result
})
</script>

<template>
    <max-wrap>
        <div class="flex <md:flex-col gap-4">
            <div class="flex <md:hidden flex-col gap-4">
                <pages-bouquets-side-filter-panel />
            </div>

            <div class="flex md:hidden gap-4 h-10">
                <pages-bouquets-top-filter-panel />
            </div>

            <div
                v-if="bouquetList.length > 0"
                class="flex-grow flex flex-col gap-8"
            >
                <div
                    v-for="arr of bouquetList"
                    class="grid gap-8"
                    :style="`grid-template-columns: repeat(${arr.length}, minmax(0, 1fr));`"
                >
                    <pages-bouquets-item v-for="item of arr" :item="item" />
                </div>

                <div v-if="pending" class="flex-grow">
                    <pages-bouquets-skeleton />
                </div>

                <div v-if="last" class="flex justify-center py-4">
                    <button
                        class="border border-dark-50 rounded px-4 py-2"
                        @click=";(keep = fasle), (keep = true)"
                    >
                        Load more
                    </button>
                </div>
            </div>
        </div>
    </max-wrap>
</template>

<style scoped>
.bg-pattern-horizontal-lines {
    background-image: repeating-linear-gradient(
        45deg,
        #632752 0,
        #632752 2px,
        transparent 0,
        transparent 50%
    );
    background-size: 24px 24px;
}
</style>
