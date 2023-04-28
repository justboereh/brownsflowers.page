<script setup>
const route = useRoute()

const extras = [
    {
        src: 'https://assets.eflorist.com/images/product/balloon-image.jpg',
        text: 'Mylar Balloons',
        prices: [
            { text: null, price: 0 },
            { text: '1', price: 5.99 },
            { text: '2', price: 10.99 },
            { text: '3', price: 15.99 },
        ],
    },
    {
        src: 'https://assets.eflorist.com/images/product/bear-image.jpg',
        text: 'Stuffed Animals',
        prices: [
            { text: null, price: 0 },
            { text: 'Small', price: 5.99 },
            { text: 'Medium', price: 19.99 },
            { text: 'Large', price: 29.99 },
        ],
    },
    {
        src: 'https://assets.eflorist.com/images/product/chocolate-image.jpg',
        text: 'Box of Chocolates',
        prices: [
            { text: null, price: 0 },
            { text: 'Small', price: 5.99 },
            { text: 'Medium', price: 19.99 },
            { text: 'Large', price: 29.99 },
        ],
    },
]

const { data: bouquet } = await useFetch(`/api/bouquets/${route.params.slug}`)

const selectedSize = ref(bouquet.value.sizes[0].name || '')
const selectedImage = ref(0)
const selectedTab = ref('description')
const selectedExtras = reactive({
    'Mylar Balloons': null,
    'Stuffed Animals': null,
    'Box of Chocolates': null,
})

const size = computed(() => {
    if (!bouquet.value) return

    return bouquet.value.sizes.find(({ name }) => name === selectedSize.value)
})

const image = computed(() => {
    if (!size.value) return ''
    if (!size.value || !size.value.images[selectedImage.value]) return ''

    return size.value.images[selectedImage.value].normal
})

const imagesLength = computed(() => {
    if (!size.value) return 0
    if (size.value.images.length < 2) return 0

    return size.value.images.length
})

const totalCost = computed(() => {
    let cost = 0

    cost += Number(size.value.price.slice(1))

    for (const extra of extras) {
        const selected = selectedExtras[extra.text]

        if (selected === null) continue

        const price = extra.prices.find(({ text }) => text === selected)
        if (!price) continue

        cost += price.price
    }

    return `$${Math.round(cost * 100) / 100}`
})

function SelectExtra(extra, price) {
    if (selectedExtras[extra] === price) return (selectedExtras[extra] = '')

    selectedExtras[extra] = price
}
</script>

<template>
    <max-wrap v-if="bouquet">
        {{}}
        <div>
            <div>
                <div></div>
                <div>
                    <img :src="image" :alt="bouquet.name" />

                    <div class="text-transparent">
                        <button
                            v-for="index of imagesLength"
                            class="w-3 h-3 rounded-full border border-black/30"
                            :class="
                                selectedImage === index - 1
                                    ? 'bg-brand-purple'
                                    : ''
                            "
                            @click="selectedImage = index"
                        >
                            •
                        </button>
                    </div>
                </div>
            </div>

            <div class="space-y-4">
                <header class="text-xl">
                    {{ bouquet.name }}
                </header>

                <hr />

                <div class="space-y-2">
                    <div class="space-x-4 text-black">
                        <button
                            class="font-semibold underline"
                            @click="selectedTab = 'description'"
                        >
                            Description
                        </button>

                        <button
                            v-if="bouquet.vase"
                            class="font-semibold underline"
                            @click="selectedTab = 'vase'"
                        >
                            Vase
                        </button>
                    </div>

                    <div
                        v-if="selectedTab === 'description'"
                        class="space-y-1 text-black/60"
                    >
                        <p>{{ bouquet.description }}</p>
                        <p>{{ bouquet.arrangement }}</p>
                    </div>

                    <div v-else-if="bouquet.vase">
                        <img :src="bouquet.vase.img" :alt="bouquet.vase.alt" />
                    </div>
                </div>

                <div>
                    <header class="font-semibold">Sizes</header>

                    <div class="space-x-4">
                        <button
                            v-for="size of bouquet.sizes"
                            class="border border-light-900 px-4 py-2"
                            :class="
                                selectedSize === size.name
                                    ? 'bg-light-900'
                                    : 'text-black/75'
                            "
                            @click="selectedSize = size.name"
                        >
                            {{ size.name }}
                        </button>
                    </div>
                </div>

                <div>
                    <header class="font-semibold">Add something extra</header>

                    <div class="space-y-4 whitespace-nowrap">
                        <div
                            v-for="extra of extras"
                            class="flex gap-2 items-center"
                        >
                            <img
                                class="w-16"
                                :src="extra.src"
                                :alt="extra.text"
                            />

                            <p class="flex-grow">
                                {{ extra.text }}
                            </p>

                            <select
                                class="border border-light-900 p-2 flex gap-2 items-center outline-none"
                                @input="
                                    SelectExtra(extra.text, $event.target.value)
                                "
                            >
                                <option
                                    v-for="price of extra.prices"
                                    :value="price.text"
                                    :selected="price.text === null"
                                >
                                    {{ price.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <hr />

                <div class="flex justify-between items-center">
                    <p class="text-lg text-brand-green font-semibold">
                        {{ totalCost }}
                    </p>

                    <button class="bg-brand-purple text-white p-4 py-2">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </max-wrap>

    <max-wrap v-else>404 not found</max-wrap>
</template>
