<script setup>
import { useLocalStorage } from '@vueuse/core'
import { watchPausable } from '@vueuse/shared'

const drawerEnabled = useState('useDrawerEnabled', () => false)
const searchText = useState('useSearchText', () => '')
</script>

<template>
    <div id="layout__default" class="min-h-screen overflow-x-hidden">
        <navigation-component />
        <drawer-component />

        <main>
            <slot />
        </main>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

body {
    font-family: 'Montserrat', sans-serif;
}

main h1 {
    @apply text-3xl font-bold;
}
</style>
