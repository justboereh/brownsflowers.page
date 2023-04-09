<script setup>
import Link from './link.vue'
import Sublinks from './sublinks.vue'
import Bouquets from './bouquets.vue'

const LinkTypes = {
    link: Link,
    sublinks: Sublinks,
    bouquets: Bouquets,
}

const Props = defineProps({ group: Object })
</script>

<template>
    <div v-if="group.text !== ''" class="flex items-center gap-2 px-4">
        <h2 class="text-sm text-black/50">{{ group.text }}</h2>

        <span class="flex-grow h-px bg-black/25" />
    </div>

    <component
        v-for="item of group.list"
        :is="LinkTypes[item.type]"
        :item="item.item"
    />

    <br />
</template>
