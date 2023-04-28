<script setup>
const {
    $bouquets: { params, keep },
} = useNuxtApp()
const Props = defineProps({ list: Array, name: String })

const showContent = ref(true)

const selected = computed(() => (value) => params[Props.name].includes(value))

async function Update(value) {
    const index = params[Props.name].indexOf(value)

    keep.value = false

    if (index === -1) return params[Props.name].push(value)

    params[Props.name].splice(index, 1)
}
</script>

<template>
    <div
        class="p-4 gap-4 grid border border-light-900 w-full min-w-72 whitespace-nowrap"
    >
        <header class="font-bold capitalize flex gap-4 items-center">
            {{ name }}

            <span
                class="font-normal bg-brand-purple text-white rounded-full h-full flex gap-1 items-center px-2 text-sm group"
            >
                {{ params[Props.name].length }}

                <span
                    v-if="selected.length > 0"
                    class="cursor-pointer text-xs hidden group-hover:block"
                >
                    <icon name="fluent:dismiss-16-regular" />
                </span>
            </span>

            <span class="flex-grow" />

            <button @click="showContent = !showContent">
                <icon
                    class="cursor-pointer transform transition duration-200"
                    name="fluent:chevron-down-20-regular"
                    :class="showContent ? '' : '-rotate-90'"
                />
            </button>
        </header>

        <keep-alive>
            <div v-if="showContent" class="text-sm">
                <slot :selected="selected" :update="Update" />
            </div>
        </keep-alive>
    </div>
</template>
