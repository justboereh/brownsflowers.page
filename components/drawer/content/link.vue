<script setup>
const Props = defineProps({ item: Object })
</script>

<template>
    <div class="px-4">
        <nuxt-link
            :to="item.href ? item.href : ''"
            class="w-full flex items-center gap-2 py-1 px-4"
        >
            {{ item.text }}

            <icon
                v-if="item.external"
                name="fluent:open-16-regular"
                class="w-3"
            />
        </nuxt-link>
    </div>
</template>
