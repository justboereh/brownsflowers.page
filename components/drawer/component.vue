<script setup>
import { useElementBounding } from '@vueuse/core'

const drawerElement = ref(null)
const { bottom: drawerBottom } = useElementBounding(drawerElement)
const drawerEnabled = useState('useDrawerEnabled')
</script>

<template>
    <div
        ref="drawerElement"
        class="fixed bottom-0 left-0 transform transition duration-200 w-full overflow-hidden z-11"
        :class="
            drawerEnabled
                ? '<md-lg:(bg-black/50  backdrop-blur) md-lg:(pointer-events-none)'
                : 'pointer-events-none'
        "
        :style="`height: ${drawerBottom}px`"
        @click.self="drawerEnabled = false"
    >
        <div
            class="pr-20 transform transition duration-200 h-full w-full absolute left-0 top-0 pointer-events-none"
            :class="
                drawerEnabled ? 'md-lg:-translate-x-full' : '-translate-x-full'
            "
        >
            <div
                class="bg-white w-full h-full pointer-events-auto flex flex-col"
            >
                <drawer-content />
            </div>
        </div>
    </div>
</template>
