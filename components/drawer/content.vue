<script setup>
import NavigationLink from '@@/scripts/navigation links'
</script>

<template>
    <div class="p-4">
        <navigation-search />
    </div>

    <div class="relative overflow-x-hidden overflow-y-auto flex-grow">
        <drawer-content-group
            v-for="(group, index) of NavigationLink"
            :key="index"
            :group="group"
        />
    </div>
</template>
