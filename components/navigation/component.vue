<script setup>
import NavigationLink from '~/assets/navigation links'
import Link from './link.vue'
import Sublinks from './sublinks.vue'

const drawerEnabled = useState('useDrawerEnabled', () => false)

const types = {
    link: Link,
    sublinks: Sublinks,
}
</script>

<template>
    <nav
        class="sticky h-16 md-lg:h-24 px-4 top-0 bg-white shadow-lg shadow-black/5 border-b border-light-700 transition duration-200"
    >
        <div class="h-full w-full flex items-center gap-4 max-w-5xl mx-auto">
            <a href="/" class="h-full flex items-center">
                <logo-full class="h-2/3" />
            </a>

            <span class="flex-grow" />

            <div>
                <div class="flex items-center justify-end gap-4">
                    <nuxt-link
                        to="/account"
                        class="w-6 h-16 grid place-items-center"
                    >
                        <icon name="fluent:person-20-regular" />
                    </nuxt-link>

                    <nuxt-link
                        to="/account/cart"
                        class="w-6 h-16 grid place-items-center"
                    >
                        <icon name="fluent:cart-20-regular" />
                    </nuxt-link>

                    <button
                        class="md-lg:hidden w-10 h-10 grid place-items-center border border-light-700 rounded"
                        @click="drawerEnabled = true"
                    >
                        <icon name="fluent:line-horizontal-3-20-filled" />
                    </button>

                    <navigation-search class="<md-lg:hidden" />
                </div>

                <div
                    class="h-8 flex gap-4 justify-end <md-lg:hidden whitespace-nowrap"
                >
                    <component
                        v-for="item of NavigationLink[0].list"
                        :is="types[item.type]"
                        :item="item.item"
                    />
                </div>
            </div>
        </div>
    </nav>
</template>
