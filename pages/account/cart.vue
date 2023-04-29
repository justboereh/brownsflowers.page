<script setup>
import { useLocalStorage, whenever } from '@vueuse/core'

const Cart = useLocalStorage('brownsflowers-cart', [])
const cartPrices = ref([])
const subtotal = computed(() => {
    let cost = 0

    for (const item of cartPrices.value) cost += item.total

    return Math.round(cost * 100) / 100
})

watch(
    Cart,
    async (items) => {
        cartPrices.value = []

        for (const item of items) {
            const { data } = await useFetch(`/api/bouquets/${item.key}`)

            whenever(
                data,
                ({ sizes, name }) => {
                    const size = sizes.find(({ name }) => name === item.size)
                    if (!size) return

                    const price = Number(size.price.slice(1))
                    let total = price

                    for (const extra of item.extras) total += extra.price

                    cartPrices.value.push({
                        ...item,
                        price,
                        name,
                        total: Math.round(total * 100) / 100,
                        image: size.images[0].normal,
                    })
                },
                { immediate: true }
            )
        }
    },
    { immediate: true }
)
</script>

<template>
    <max-wrap>
        <div class="flex <md:flex-col gap-4">
            <div v-if="Cart.length < 1" class="text-center flex-grow">
                <h2 class="text-2xl">Cart is empty</h2>

                <p>Looks like you haven't added anything in here yet.</p>
            </div>

            <div class="flex-grow space-y-4">
                <div
                    v-for="(item, index) of cartPrices"
                    class="border border-light-900 px-4 flex gap-4 items-center"
                >
                    <nuxt-link
                        :to="`/bouquets/${item.key}`"
                        class="w-20 min-w-20"
                    >
                        <img
                            class="w-full"
                            :src="item.image"
                            :alt="item.name"
                        />
                    </nuxt-link>

                    <div class="flex flex-col flex-grow justify-center py-4">
                        <p class="text-brand-green">${{ item.total }}</p>

                        <p>{{ item.name }}</p>

                        <p
                            v-if="item.extras.length > 0"
                            class="text-xs text-black/75"
                        >
                            with
                            {{
                                item.extras
                                    .map((x) => `${x.type} ${x.name}`)
                                    .join(', ')
                            }}
                        </p>
                    </div>

                    <div class="grid place-items-center text-black/75">
                        <button @click="Cart.splice(index, 1)">
                            <icon name="fluent:delete-12-regular" />
                        </button>
                    </div>
                </div>
            </div>

            <hr />

            <div class="md:w-xs space-y-4">
                <div>
                    <div class="flex justify-between gap-4">
                        <span>TAX</span>

                        <span>${{ Math.round(subtotal * 6) / 100 }}</span>
                    </div>

                    <div class="flex justify-between gap-4">
                        <span>MERCHANDISE TOTAL</span>

                        <span>${{ Math.floor(subtotal * 106) / 100 }}</span>
                    </div>
                </div>

                <hr />

                <div class="flex justify-end">
                    <button
                        class="h-10 px-4 whitespace-nowrap border"
                        :class="
                            Cart.length > 0
                                ? 'bg-brand-purple border-brand-purple text-white'
                                : 'border-brand-purple/25 text-brand-purple/25 cursor-not-allowed cursor-events-none'
                        "
                    >
                        Place Order
                    </button>
                </div>

                <div
                    v-if="Cart.length > 0"
                    class="text-xs text-right text-black/75"
                >
                    By clicking "Place Order", you understand that this website
                    not the actual website of "Brown's Flowers". The "Place
                    Order" button will remove data from cart in your local
                    storage of this website, tell you your order is in process,
                    and do nothing.
                </div>
            </div>
        </div>
    </max-wrap>
</template>
