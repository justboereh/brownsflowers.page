<script setup>
import { useLocalStorage } from '@vueuse/core'
import { nanoid } from 'nanoid'

const authCookie = useCookie('.auth_brownsflowers')
const Accounts = useLocalStorage('.accounts_brownsflowers', [])
const noAuth = computed(() => !authCookie.value || authCookie.value === '')

if (!noAuth.value) useRouter().push('/account')

const fullname = ref('')
const email = ref('')
const password = ref('')
const confirmpassword = ref('')

function SignUp() {
    if (fullname.value.trim() === '') return
    if (email.value.trim() === '') return
    if (password.value.trim() === '') return
    if (confirmpassword.value.trim() === '') return
    if (confirmpassword.value.trim() !== password.value.trim()) return

    for (const account of Accounts.value) {
        if (email.value.trim() === account.email) return
    }

    const account = {
        id: nanoid(),
        fullname: fullname.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
    }

    Accounts.value.push(account)

    authCookie.value = account.id

    useRouter().push('/account')
}
</script>

<template>
    <div class="p-4">
        <div class="mx-auto max-w-sm space-y-4">
            <h1 class="text-center">Sign up</h1>

            <form @submit.prevent="SignUp" class="flex flex-col gap-4">
                <bf-form-input
                    v-model="fullname"
                    name="full name"
                    type="text"
                    placeholder="John Appleseed"
                />

                <bf-form-input
                    v-model="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                />

                <bf-form-input
                    v-model="password"
                    name="password"
                    type="password"
                    placeholder="**********"
                />

                <bf-form-input
                    v-model="confirmpassword"
                    name="confirm password"
                    type="password"
                    placeholder="**********"
                />

                <button class="bg-brand-purple w-full text-white py-2">
                    Sign up
                </button>

                <hr />

                <nuxt-link
                    to="/account/login"
                    class="border border-brand-purple/50 w-full text-brand-purple/50 py-2 text-center"
                >
                    Log in
                </nuxt-link>
            </form>
        </div>
    </div>
</template>
