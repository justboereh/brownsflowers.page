<script setup>
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
const route = useRoute()
const bouquets = ref([])
const isBouquetsLoading = ref(false)
const breakpoints = useBreakpoints(breakpointsTailwind)

const bouquetList = computed(() => {
    const items = bouquets.value.items
    const isMedium = breakpoints.isGreaterOrEqual('sm')
    const isLarge = breakpoints.isGreaterOrEqual('md')

    if (!items) return []

    let chunkSize = 1
    if (isMedium) chunkSize = 2
    if (isLarge) chunkSize = 4

    const result = []

    const length = Math.floor(items.length / chunkSize)

    for (let i = 0; i < length; i += chunkSize) {
        result.push(items.slice(i * chunkSize, i * chunkSize + chunkSize))
    }

    console.log(chunkSize)

    return result
})

async function updateBouquets() {
    isBouquetsLoading.value = true
    bouquets.value = {}

    const { data } = await useFetch(`/api${route.fullPath}`)

    bouquets.value = data.value || {}

    isBouquetsLoading.value = false
}

updateBouquets()

provide('updateBouquets', updateBouquets)
</script>

<template>
    <max-wrap>
        <div class="flex gap-4">
            <div class="flex flex-col gap-4">
                <pages-bouquets-side-filter-panel />
            </div>

            <div v-if="!isBouquetsLoading" class="flex-grow">
                <div
                    v-for="list of bouquetList"
                    class="grid gap-4"
                    :style="`grid-template-columns: repeat(${list.length}, minmax(0, 1fr));`"
                >
                    <div v-for="item of list" class="flex-grow">
                        <img
                            class="w-full"
                            :src="item.sizes[0].images[0].normal"
                            :alt="item.name"
                        />

                        <p class="text-center font-semibold">
                            {{ item.name }}
                        </p>

                        <span></span>
                    </div>
                </div>

                <div v-if="bouquets.last" class="flex justify-center py-4">
                    <button class="border border-dark-50 rounded px-4 py-2">
                        Load more
                    </button>
                </div>
            </div>

            <div v-else class="flex-grow">
                <div
                    v-for="layer of 6"
                    :key="layer"
                    class="flex gap-4 w-full mb-4 text-dark-50/75 text-2xl"
                >
                    <div
                        v-for="item of ['', '<sm:hidden', '<md:hidden']"
                        :key="item + layer"
                        class="flex-grow animate-pulse flex flex-col gap-2"
                        :class="item"
                        :style="`animation-delay: ${layer * 100}ms;`"
                    >
                        <div
                            class="bg-light-700 w-full rounded grid place-items-center"
                            style="aspect-ratio: 1"
                        >
                            <icon name="fluent:image-16-regular" />
                        </div>

                        <div class="bg-light-500 h-4"></div>

                        <div class="h-4 flex justify-between">
                            <span class="h-full w-1/3 bg-light-700" />

                            <span class="h-full w-1/5 bg-light-700" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </max-wrap>
</template>
