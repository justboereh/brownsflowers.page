<script setup>
import { useLocalStorage } from '@vueuse/core'

const authCookie = useCookie('.auth_brownsflowers')
const Accounts = useLocalStorage('.accounts_brownsflowers', [])
const noAuth = computed(() => !authCookie.value || authCookie.value === '')

if (!noAuth.value) useRouter().push('/account')

const email = ref('')
const password = ref('')

function LogIn() {
    for (const account of Accounts.value) {
        if (account.email !== email.value.trim()) continue
        if (account.password !== password.value.trim()) continue

        authCookie.value = account.id

        useRouter().push('/account')
    }
}
</script>

<template>
    <div class="p-4">
        <div class="mx-auto max-w-sm space-y-4">
            <h1 class="text-center">Log in</h1>

            <form @submit.prevent="LogIn" class="flex flex-col gap-4">
                <bf-form-input v-model="email" name="email" type="email" />

                <bf-form-input
                    v-model="password"
                    name="password"
                    type="password"
                />

                <button class="bg-brand-purple w-full text-white py-2">
                    Log in
                </button>

                <hr />

                <nuxt-link
                    to="/account/signup"
                    class="border border-brand-purple/50 w-full text-brand-purple/50 py-2 text-center"
                >
                    Sign up
                </nuxt-link>
            </form>
        </div>
    </div>
</template>
