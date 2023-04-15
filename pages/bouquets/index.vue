<script setup>
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

const {
    $bouquets: { list, last, pending, params },
} = useNuxtApp()
const breakpoints = useBreakpoints(breakpointsTailwind)

const bouquetList = computed(() => {
    const items = list.value

    const isMedium = breakpoints.isGreaterOrEqual('sm')
    const isLarge = breakpoints.isGreaterOrEqual('md')

    if (items.length < 1) return []

    let chunkSize = 1
    if (isMedium) chunkSize = 2
    if (isLarge) chunkSize = 3

    const length = Math.floor(items.length / chunkSize)
    const result = []

    for (let i = 0; i < length; i++) {
        const slice = items.slice(i * chunkSize, i * chunkSize + chunkSize)

        result.push(slice)
    }

    return result
})
</script>

<template>
    <max-wrap>
        <div class="flex gap-4">
            <div class="flex flex-col gap-4">
                <pages-bouquets-side-filter-panel />
            </div>

            <div v-if="!pending" class="flex-grow flex flex-col gap-8">
                <div
                    v-for="arr of bouquetList"
                    class="grid gap-8"
                    :style="`grid-template-columns: repeat(${arr.length}, minmax(0, 1fr));`"
                >
                    <nuxt-link
                        v-for="item of arr"
                        :href="`/bouquets/${item.key}`"
                        class="flex-grow flex flex-col gap-2"
                    >
                        <img
                            v-if="item.sizes[0]"
                            class="w-full"
                            :src="item.sizes[0].images[0].normal"
                            :alt="item.name"
                        />

                        <div
                            v-else
                            class="bg-pattern-horizontal-lines text-white bg-brand-purple grid place-items-center font-bold text-4xl text-center text-[#632752]"
                            style="aspect-ratio: 1"
                        >
                            {{ item.name }}
                        </div>

                        <div class="flex justify-between text-sm">
                            <span class="font-semibold text-brand-green">
                                {{ item.starting }}
                            </span>

                            <span
                                v-if="item.best || item.new"
                                class="bg-brand-purple text-white px-2 rounded-full"
                            >
                                {{ item.best ? 'Best' : 'New' }}
                            </span>
                        </div>

                        <p class="text-center">
                            {{ item.name }}
                        </p>

                        <span></span>
                    </nuxt-link>
                </div>

                <div v-if="last" class="flex justify-center py-4">
                    <button
                        class="border border-dark-50 rounded px-4 py-2"
                        @click="params.last = last"
                    >
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
                            style="aspect-ratio: 4/5"
                        >
                            <icon name="fluent:image-16-regular" />
                        </div>

                        <div class="h-4 flex justify-between">
                            <span class="h-full w-1/3 bg-light-700" />

                            <span class="h-full w-1/5 bg-light-700" />
                        </div>

                        <div class="bg-light-500 h-4"></div>
                    </div>
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
