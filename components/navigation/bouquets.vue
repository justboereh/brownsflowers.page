<script setup>
import { useLocalStorage } from '@vueuse/core'

const Props = defineProps({ list: Object })
const cachedBouquets = useLocalStorage('cached-bouquets', [], {
    serializer: {
        read: (v) => (v ? JSON.parse(v) : []),
        write: (v) => JSON.stringify(v),
    },
})

const bouquets = ref([])

Props.list.forEach(async (bouquet) => {
    const cached = cachedBouquets.value.find((cachedbouquet) => {
        if (!cachedbouquet) return

        return cachedbouquet.key === bouquet
    })

    if (cached) {
        bouquets.value = [...bouquets.value, cached]

        return
    }

    const { data } = await useFetch(`/api/bouquets/${bouquet}`)

    cachedBouquets.value = [...cachedBouquets.value, data.value]

    bouquets.value = [...bouquets.value, data.value]
})
</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <nuxt-link
            v-for="bouquet of bouquets"
            :key="bouquet.key"
            :to="`/bouquets/${bouquet.key}`"
            class="flex flex-col items-center max-w-40"
        >
            <img
                :src="bouquet.sizes[0].images[0].thumbnail"
                :alt="bouquet.sizes[0].images[0].alt"
            />

            <p class="text-xs text-center whitespace-normal">
                {{ bouquet.name }}
            </p>
        </nuxt-link>
    </div>
</template>
