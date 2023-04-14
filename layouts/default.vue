<script setup>
useState('useDrawerEnabled', () => false)
useState('useSearchText', () => '')
</script>

<template>
    <div
        id="layout__default"
        class="min-h-screen overflow-x-hidden pt-16 md-lg:pt-24"
    >
        <navigation-component />
        <drawer-component />

        <main>
            <slot />
        </main>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

body {
    font-family: 'Montserrat', sans-serif;
}

main h1 {
    @apply text-3xl font-bold;
}
</style>
