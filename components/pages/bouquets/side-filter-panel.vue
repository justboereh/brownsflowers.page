<script setup>
import {
    colors,
    styles,
    occasions,
    flowers,
} from '@/assets/all possible filters'
</script>

<template>
    <pages-bouquets-side-filter-panel-wrap
        :list="colors"
        name="colors"
        v-slot="{ selected, update }"
    >
        <div class="grid grid-cols-4 gap-2">
            <button
                v-for="color of colors"
                :key="color"
                class="grid place-items-center"
                @click="update(color)"
            >
                <span
                    class="h-8 grid place-items-center rounded-full border border-light-700"
                    :style="`background: ${color}; aspect-ratio: 1`"
                >
                    <span
                        class="bg-white rounded-full grid place-items-center p-0.5"
                        :class="selected.includes(color) ? '' : 'opacity-0'"
                    >
                        <icon name="fluent:checkmark-16-regular" />
                    </span>
                </span>
            </button>
        </div>
    </pages-bouquets-side-filter-panel-wrap>

    <pages-bouquets-side-filter-panel-wrap
        :list="occasions"
        name="occasions"
        v-slot="{ selected, update }"
    >
        <div class="grid gap-y-4 pr-4">
            <button
                v-for="occasion of occasions"
                :key="occasion"
                class="flex items-center gap-2"
                @click="update(occasion)"
            >
                <span
                    class="border border-light-700 grid place-items-center"
                    :class="selected.includes(occasion) ? '' : 'text-black/0'"
                >
                    <icon name="fluent:checkmark-16-regular" />
                </span>

                {{ occasion }}
            </button>
        </div>
    </pages-bouquets-side-filter-panel-wrap>

    <pages-bouquets-side-filter-panel-wrap
        :list="flowers"
        name="flowers"
        v-slot="{ selected, update }"
    >
        <div class="grid gap-y-4 pr-4">
            <button
                v-for="flower of flowers"
                :key="flower"
                class="flex items-center gap-2"
                @click="update(flower)"
            >
                <span
                    class="border border-light-700 grid place-items-center"
                    :class="selected.includes(flower) ? '' : 'text-black/0'"
                >
                    <icon name="fluent:checkmark-16-regular" />
                </span>

                {{ flower }}
            </button>
        </div>
    </pages-bouquets-side-filter-panel-wrap>

    <pages-bouquets-side-filter-panel-wrap
        :list="styles"
        name="styles"
        v-slot="{ selected, update }"
    >
        <div class="grid gap-y-4 pr-4">
            <button
                v-for="style of styles"
                :key="style"
                class="flex items-center gap-2"
                @click="update(style)"
            >
                <span
                    class="border border-light-700 grid place-items-center"
                    :class="selected.includes(style) ? '' : 'text-black/0'"
                >
                    <icon name="fluent:checkmark-16-regular" />
                </span>

                {{ style }}
            </button>
        </div>
    </pages-bouquets-side-filter-panel-wrap>
</template>
