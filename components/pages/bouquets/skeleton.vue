<template>
    <div
        v-for="layer of 6"
        :key="layer"
        class="flex gap-4 w-full mb-4 text-dark-50/75 text-2xl"
    >
        <div
            v-for="item of ['', ' ', '<md:hidden']"
            :key="item + layer"
            class="flex-grow animate-pulse flex flex-col gap-2"
            :class="item"
            :style="`animation-delay: ${layer * 100}ms;`"
        >
            <div
                class="bg-light-700 w-full rounded grid place-items-center"
                style="aspect-ratio: 4/5"
            >
                <icon name="fluent:image-16-regular" />
            </div>

            <div class="h-4 flex justify-between">
                <span class="h-full w-1/3 bg-light-700" />

                <span class="h-full w-1/5 bg-light-700" />
            </div>

            <div class="bg-light-500 h-4"></div>
        </div>
    </div>
</template>
