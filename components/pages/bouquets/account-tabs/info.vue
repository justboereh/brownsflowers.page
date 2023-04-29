<script setup>
import { objectEntries } from '@antfu/utils'
import { useLocalStorage, watchDebounced } from '@vueuse/core'

const { data: CountriesResponse } = await useFetch(
    'https://gist.githubusercontent.com/ebaranov/41bf38fdb1a2cb19a781/raw/fb097a60427717b262d5058633590749f366bd80/gistfile1.json'
)

const authCookie = useCookie('.auth_brownsflowers')
const Accounts = useLocalStorage('.accounts_brownsflowers', [])
const accountIndex = computed(() => {
    return Accounts.value.findIndex(({ id }) => id === authCookie.value)
})
const countries = computed(() => JSON.parse(CountriesResponse.value).countries)
const states = computed(() => {
    const country = countries.value.find(
        ({ country }) => country === Billing.country
    )

    return country ? country.states : []
})

const Billing = reactive({
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    zip: '',
})

if (Accounts.value[accountIndex.value].billing) {
    Object.assign(Billing, Accounts.value[accountIndex.value].billing)
}

watchDebounced(
    Billing,
    (value) => {
        if (!Accounts.value[accountIndex.value].billing) {
            Accounts.value[accountIndex.value].billing = {}
        }

        for (const key of Object.keys(value)) {
            Accounts.value[accountIndex.value].billing[key] = value[key]
        }
    },
    { debounce: 500 }
)
</script>

<template>
    <bf-divider number="1" text="Billing" />

    <br />

    <form @submit.prevent class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
            <bf-form-input
                v-model="Billing.first_name"
                name="first name"
                type="text"
            />

            <bf-form-input
                v-model="Billing.last_name"
                name="last name"
                type="text"
            />
        </div>

        <bf-form-input v-model="Billing.address" name="address" type="text" />

        <div class="grid md:grid-cols-3 gap-4">
            <bf-form-input
                class="md:col-span-2"
                v-model="Billing.city"
                name="city"
                type="text"
            />

            <bf-form-input v-model="Billing.zip" name="zip" type="number" />
        </div>

        <div class="flex flex-col">
            <label for="country">Country</label>
            <select
                v-model="Billing.country"
                class="outline-none border border-light-900 hover:border-brand-purple focus:border-brand-purple p-2"
                name="country"
            >
                <option v-for="country of countries" :value="country.country">
                    {{ country.country }}
                </option>
            </select>
        </div>

        <div class="flex flex-col">
            <label for="state">State/Province</label>
            <select
                v-model="Billing.state"
                class="outline-none border border-light-900 hover:border-brand-purple focus:border-brand-purple p-2"
                name="state"
            >
                <option v-for="state of states" :value="state">
                    {{ state }}
                </option>
            </select>
        </div>

        <bf-form-input
            v-model="Billing.phone"
            name="phone number"
            type="phone"
        />
    </form>
</template>
