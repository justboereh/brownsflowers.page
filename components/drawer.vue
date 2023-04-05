<script setup>
import { useWindowSize } from '@vueuse/core'

const { height: windowHeight } = useWindowSize()
const drawerEnabled = useState('useDrawerEnabled')
</script>

<template>
    <div
        class="fixed bottom-0 left-0 pr-30 transform transition duration-200 w-screen"
        :class="
            drawerEnabled
                ? '<md:(bg-black/50  backdrop-blur) md:(pointer-events-none)'
                : 'pointer-events-none'
        "
        :style="`height: ${windowHeight}px`"
        @click.self="drawerEnabled = false"
    >
        <div class="bg-red-500 p-4 h-full">why do that</div>
    </div>
</template>
