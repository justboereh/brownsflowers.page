<script setup>
import * as PossibleFilters from '@/assets/all possible filters'
import { useRouteQuery } from '@vueuse/router'

const Props = defineProps({ list: Array, name: String })
const updateBouquets = inject('updateBouquets')

const query = useRouteQuery(Props.name)
const showContent = ref(true)

const selected = computed(() => {
    if (!query.value) return []

    return query.value.split(',').map((x) => x.trim())
})

async function Update(value) {
    const inQueryAlready = selected.value.includes(value)
    const addValue = [...selected.value, value]
    const removeValue = selected.value.filter((x) => x !== value)

    const values = inQueryAlready ? removeValue : addValue

    const params = new URL(location.href).searchParams

    params.set(Props.name, values.join(','))

    await useRouter().replace(`/bouquets?${params.toString()}`)

    updateBouquets()
}
</script>

<template>
    <div
        class="p-4 gap-4 grid border border-light-700 w-full min-w-72 whitespace-nowrap"
    >
        <header class="text-lg font-bold capitalize flex gap-4 items-center">
            {{ name }}

            <span
                class="font-normal bg-brand-purple text-white rounded-full h-full flex gap-1 items-center px-2 text-base group"
            >
                {{ selected.length }}

                <span class="cursor-pointer text-xs hidden group-hover:block">
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
            <div v-if="showContent">
                <slot :selected="selected" :update="Update" />
            </div>
        </keep-alive>
    </div>
</template>
