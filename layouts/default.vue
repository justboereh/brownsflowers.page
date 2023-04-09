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
