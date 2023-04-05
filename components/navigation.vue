<script setup>
const drawerEnabled = useState('useDrawerEnabled', () => false)
</script>

<template>
    <nav
        class="sticky top-0 h-16 px-4 bg-white shadow-lg shadow-black/5 border-b border-light-700"
    >
        <div
            class="h-full w-full flex items-center justify-between max-w-5xl mx-auto"
        >
            <a href="/" class="h-fit">
                <logo-full class="h-10" />
            </a>

            <button
                class="w-10 h-10 grid place-items-center border border-light-700 rounded"
                @click="drawerEnabled = true"
            >
                <icon name="fluent:line-horizontal-3-20-filled" />
            </button>
        </div>
    </nav>
</template>
