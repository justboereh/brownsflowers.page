<script setup>
defineProps({ item: Object })
</script>

<template>
    <nuxt-link
        :href="`/bouquets/${item.key}`"
        class="flex-grow flex flex-col gap-2"
    >
        <img
            v-if="item.sizes[0]"
            class="w-full"
            :src="item.sizes[0].images[0].normal"
            :alt="item.name"
        />

        <div
            v-else
            class="bg-pattern-horizontal-lines text-white bg-brand-purple grid place-items-center font-bold text-4xl text-center text-[#632752]"
            style="aspect-ratio: 1"
        >
            {{ item.name }}
        </div>

        <div class="flex justify-between text-sm">
            <span class="font-semibold text-brand-green">
                {{ item.starting }}
            </span>

            <span
                v-if="item.best || item.new"
                class="bg-brand-purple text-white px-2"
            >
                {{ item.best ? 'Best Seller' : 'New' }}
            </span>
        </div>

        <p class="text-center">
            {{ item.name }}
        </p>

        <span></span>
    </nuxt-link>
</template>
