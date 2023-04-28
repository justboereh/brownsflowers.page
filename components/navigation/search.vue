<script setup lang="ts">
const searchText = useState('useSearchText') as Ref<string>

function Search() {
    if (searchText.value.trim() === '') return

    useRouter().push(
        '/bouquets?q=' + encodeURIComponent(searchText.value.trim())
    )
}
</script>

<template>
    <form
        class="border border-light-900 hover:border-brand-purple focus:border-brand-purple transition duration-200 w-xs <md-lg:w-full flex"
        @submit.prevent="Search"
    >
        <input
            v-model="searchText"
            class="outline-none px-2 h-10 border-transparent flex-grow min-w-0"
            type="text"
            placeholder="Search..."
            name="browns-flowers-search"
            id="browns-flowers-search-drawer"
        />

        <button
            class="w-10 h-10 disabled:text-black/50 transition duration-200"
            :disabled="searchText.trim() === ''"
        >
            <icon name="fluent:search-20-regular" />
        </button>
    </form>
</template>
