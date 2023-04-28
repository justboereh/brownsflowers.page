<script setup>
const route = useRoute()

const { data: bouquet } = await useFetch(`/api/bouquets/${route.params.slug}`)
const selectedSize = ref(bouquet.sizes[0].name || '')
const selectedImage = ref(0)
const selectedTab = ref('description')

const ImagesLength = computed(() => {
    if (!bouquet.value) return 0
    if (bouquet.value.sizes.length < 2) return 0

    return bouquet.value.sizes.length
})
</script>

<template>
    <max-wrap v-if="bouquet">
        <div>
            <div>
                <div></div>
                <div>
                    <img
                        :src="
                            bouquet.sizes[selectedSize]
                                ? bouquet.sizes[selectedSize].images[
                                      selectedImage
                                  ].normal
                                : ''
                        "
                        :alt="bouquet.name"
                    />

                    <div class="text-transparent">
                        <button
                            v-for="index of ImagesLength"
                            class="w-3 h-3 rounded-full border border-black/30"
                            :class="
                                selectedImage === index - 1
                                    ? 'bg-brand-purple'
                                    : ''
                            "
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
                            class="font-semibold"
                            @click="selectedTab = 'description'"
                        >
                            Description
                        </button>

                        <button
                            v-if="bouquet.vase"
                            class="font-semibold"
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
                            class="border border-light-900"
                            :class="
                                selectedSize === size.name ? 'bg-light-900' : ''
                            "
                        >
                            {{ size.name }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </max-wrap>

    <max-wrap v-else>404 not found</max-wrap>
</template>
