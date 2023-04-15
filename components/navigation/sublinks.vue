<script setup>
import Link from './link.vue'
import Bouquets from './bouquets.vue'
import { useElementHover, watchDebounced } from '@vueuse/core'

const Props = defineProps({ item: Object })

const SpanElement = ref()
const ContentElement = ref()
const dropdownEnabled = ref(false)
const isHovering = ref(false)
const isSpanHovering = ref(false)
const isContentHovering = ref(false)

const LinkTypes = {
    link: Link,
    bouquets: Bouquets,
}

watchDebounced(
    isHovering,
    (value) => {
        dropdownEnabled.value = value
    },
    { debounce: 50 }
)
</script>

<template>
    <span
        ref="SpanElement"
        class="cursor-pointer"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
    >
        {{ item.text }}

        <div
            class="absolute top-full w-full left-0 pt-2 pointer-events-none"
            :class="dropdownEnabled ? '' : ''"
        >
            <div class="mx-auto max-w-5xl w-full flex justify-end">
                <div
                    ref="ContentElement"
                    class="p-4 bg-white border max-w-full border-light-900 rounded shadow-lg shadow-black/5 cursor-auto flex gap-8 transform transition duration-200"
                    :class="
                        dropdownEnabled
                            ? 'pointer-events-auto'
                            : 'translate-x-4 -translate-y-4 scale-95 opacity-0'
                    "
                    @mouseenter="isContentHovering = true"
                    @mouseleave="isContentHovering = false"
                >
                    <navigation-group text="Featured Bouquets">
                        <navigation-bouquets
                            :list="item.list[0].list[0].item.list"
                        />
                    </navigation-group>

                    <navigation-group :text="item.list[1].text">
                        <div class="grid grid-cols-2 gap-x-8 gap-2">
                            <navigation-link
                                v-for="item of item.list[1].list"
                                :key="item.item.href"
                                :item="item.item"
                                class="basis-1/3"
                            />
                        </div>
                    </navigation-group>
                </div>
            </div>
        </div>

        <!-- <div
            class="absolute top-full mt-2 right-0 p-4 bg-white border border-light-900 rounded shadow-lg shadow-black/5 cursor-auto flex gap-8 transform transition duration-200"
            :class="
                dropdownEnabled
                    ? ''
                    : 'translate-x-6 -translate-y-4 scale-95 opacity-0 pointer-events-none'
            "
        >
            <navigation-group text="Featured Bouquets"> </navigation-group>

            <div
                v-for="group of item.list"
                class="min-w-xs"
                :class="
                    group.text.includes('Featured')
                        ? ''
                        : 'grid grid-cols-2 gap-x-4'
                "
            >
                <div
                    class="flex text-sm items-center gap-4"
                    :class="group.text.includes('Featured') ? '' : 'col-span-2'"
                >
                    <h2>{{ group.text }}</h2>

                    <span class="h-px flex-grow bg-light-700" />
                </div>

                <component
                    v-for="item of group.list"
                    :is="LinkTypes[item.type]"
                    :item="item.item"
                />
            </div>
        </div> -->
    </span>
</template>
