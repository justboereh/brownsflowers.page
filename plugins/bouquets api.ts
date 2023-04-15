import { refDebounced, whenever } from '@vueuse/core'
import type { Params, Bouquet, FetchRespone } from '@/index'

function joinValues(arr: Array<string>) {
    return arr.map((x) => x.trim()).join(',')
}

export default defineNuxtPlugin(async () => {
    const keptBouquets = ref<Array<Bouquet>>([])
    const bouquets = ref<Array<Bouquet>>([])
    const last = ref<string>()

    const params = reactive<Params>({
        colors: [],
        flowers: [],
        occasions: [],
        styles: [],
        q: '',
        last: '',
    })

    const computedURL = computed<string>(() => {
        const searchParams = new URLSearchParams()

        if (params.q !== '') searchParams.set('q', params.q.trim())
        if (params.last !== '') searchParams.set('last', params.last)

        for (const paramname of ['colors', 'flowers', 'occasions', 'styles']) {
            if (params[paramname].length < 1) continue

            searchParams.set(
                paramname,
                joinValues(params[paramname] as string[])
            )
        }

        console.log(`/api/bouquets?${searchParams.toString()}`)

        return `/api/bouquets?${searchParams.toString()}`
    })

    const { data: fetchResponse, pending } = await useFetch<FetchRespone>(
        refDebounced(computedURL, 500),
        {
            immediate: true,
        }
    )

    whenever(
        fetchResponse,
        ({ items, last: rLast }) => {
            if (params.last) {
                keptBouquets.value = [...keptBouquets.value, ...bouquets.value]
            }

            bouquets.value = items

            last.value = rLast
        },
        { immediate: true }
    )

    return {
        provide: {
            bouquets: {
                list: computed<Bouquet[]>(() => [
                    ...keptBouquets.value,
                    ...bouquets.value,
                ]),
                pending,
                last,
                params,
            },
        },
    }
})
