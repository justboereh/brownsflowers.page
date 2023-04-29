<script setup>
defineProps({ tab: String })
const Tabs = {
    history: resolveComponent('pages/bouquets/account-tabs/history'),
    info: resolveComponent('pages/bouquets/account-tabs/info'),
    password: resolveComponent('pages/bouquets/account-tabs/password'),
    book: resolveComponent('pages/bouquets/account-tabs/book'),
    logout: resolveComponent('pages/bouquets/account-tabs/logout'),
}
</script>

<template>
    <component :is="Tabs[tab]" />
</template>
