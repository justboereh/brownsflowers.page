<script setup>
const drawerEnabled = useState('useDrawerEnabled', () => false)
</script>

<template>
    <div id="layout__default" class="min-h-screen">
        <navigation />
        <drawer />
        <main>
            <slot />
        </main>
    </div>
</template>
