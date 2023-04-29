<script setup>
import { useLocalStorage } from '@vueuse/core'

const Tabs = {
    history: 'Order History',
    info: 'Account Info',
    password: 'Change Password',
    book: 'Address Book',
    logout: 'Sign out',
}

const selectedTab = ref('history')
const Accounts = useLocalStorage('.accounts_brownsflowers', [])
const authCookie = useCookie('.auth_brownsflowers')
const noAuth = computed(() => !authCookie.value || authCookie.value === '')

if (noAuth.value) useRouter().push('/account/login')

const Account = computed(() => {
    return Accounts.value.find(({ id }) => id === authCookie.value)
})

onBeforeMount(() => {
    if (Account.value) return
    authCookie.value = null

    useRouter().push('/account/login')
})
</script>

<template>
    <max-wrap>
        <div class="flex flex-col gap-4">
            <div
                class="flex w-full whitespace-nowrap gap-x-2 pb-2 overflow-x-auto"
            >
                <button
                    v-for="(text, name) in Tabs"
                    class="px-4 py-2 border border-transparent hover:border-brand-purple"
                    :class="
                        selectedTab === name
                            ? 'bg-brand-purple text-white border-brand-purple'
                            : ''
                    "
                    @click="selectedTab = name"
                >
                    {{ text }}
                </button>
            </div>

            <div>
                <keep-alive>
                    <pages-bouquets-account-tabs-tab :tab="selectedTab" />
                </keep-alive>
            </div>
        </div>
    </max-wrap>
</template>
