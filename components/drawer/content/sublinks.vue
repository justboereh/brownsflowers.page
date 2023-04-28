<script setup>
const Props = defineProps({ item: Object })
const sublinksEnabled = ref(false)
</script>

<template>
    <div class="px-4">
        <button
            :to="item.href ? item.href : ''"
            class="w-full flex justify-between gap-2 px-4 py-1"
            @click="sublinksEnabled = true"
        >
            {{ item.text }}

            <icon name="fluent:chevron-right-16-filled" class="w-3" />
        </button>
    </div>

    <div
        class="absolute h-full w-full left-0 bg-white top-0 transition transform duration-200 flex flex-col overflow-y-auto"
        :class="
            sublinksEnabled
                ? ''
                : 'translate-x-10 opacity-0 pointer-events-none'
        "
    >
        <div class="px-4">
            <button
                class="w-full py-2 text-left"
                @click="sublinksEnabled = false"
            >
                <icon name="fluent:chevron-left-16-filled" class="w-3" />

                Back
            </button>
        </div>

        <div class="h-4"></div>

        <div class="flex-grow">
            <drawer-content-group
                v-for="(group, index) of item.list"
                :key="index"
                :group="group"
            />
        </div>
    </div>
</template>
