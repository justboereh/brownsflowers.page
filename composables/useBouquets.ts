import { refDebounced, whenever } from '@vueuse/core'
import type { Params, Bouquet, FetchRespone } from '@/index'

function joinValues(arr: Array<string>) {
    return encodeURIComponent(arr.map((x) => x.trim()).join(','))
}

export default async () => {
    const keptBouquets = ref<Array<Bouquet>>([])
    const bouquets = ref<Array<Bouquet>>([])
    const last = ref<string>()

    const params: Params = reactive({
        colors: [],
        flowers: [],
        occasions: [],
        styles: [],
        q: '',
        last: '',
    })

    const computedURL = computed<string>(() => {
        const searchParams = new URLSearchParams()

        searchParams.set('colors', joinValues(params.colors))
        searchParams.set('styles', joinValues(params.styles))
        searchParams.set('flowers', joinValues(params.flowers))
        searchParams.set('occasions', joinValues(params.occasions))
        searchParams.set('q', encodeURIComponent(params.q.trim()))
        searchParams.set('last', params.last)

        return `/api/bouquets?${searchParams.toString}`
    })

    const { data: fetchResponse } = await useFetch<FetchRespone>(
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
        list: computed<Array<Bouquet>>(() => [
            ...keptBouquets.value,
            ...bouquets.value,
        ]),
        last,
        params,
    }
}
