<script setup>
import { useLocalStorage } from '@vueuse/core'

const Props = defineProps({ item: Object })
const cachedBouquets = useLocalStorage('cached-bouquets', [], {
    serializer: {
        read: (v) => (v ? JSON.parse(v) : []),
        write: (v) => JSON.stringify(v),
    },
})

const bouquets = ref([])

Props.item.list.forEach(async (bouquet) => {
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
    <div class="p-4 grid grid-cols-2 gap-8">
        <nuxt-link
            v-for="bouquet of bouquets"
            :key="bouquet ? bouquet.key : ''"
            :to="bouquet ? `/bouquets/${bouquet.key}` : ''"
            class="grid place-items-center"
        >
            <img
                :src="bouquet ? bouquet.sizes[0].images[0].thumbnail : ''"
                :alt="bouquet ? bouquet.sizes[0].images[0].alt : ''"
            />

            <p class="text-xs text-center">
                {{ !bouquet ? '' : bouquet.name }}
            </p>
        </nuxt-link>
    </div>
</template>
