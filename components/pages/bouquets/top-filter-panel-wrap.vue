<script setup>
const {
    $bouquets: { params },
} = useNuxtApp()

const Props = defineProps({
    name: String,
})

function Update(value) {
    const index = params[Props.name].indexOf(value)

    if (index === -1) return params[Props.name].push(value)

    params[Props.name].splice(index, 1)
}
</script>

<template>
    <span
        v-for="value of params[name] || []"
        :key="value"
        class="bg-light-900 px-2 py-2 flex items-center gap-2"
    >
        {{ value }}

        <icon
            name="fluent:dismiss-16-regular"
            class="text-red-500"
            @click="Update(value)"
        />
    </span>
</template>
