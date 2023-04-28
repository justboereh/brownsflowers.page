import { refDebounced, watchDebounced, whenever } from '@vueuse/core'
import type { Params, Bouquet, FetchRespone } from '@/index'

export default defineNuxtPlugin(async () => {
    const keptBouquets = ref<Array<Bouquet>>([])
    const bouquets = ref<Array<Bouquet>>([])
    const keep = ref<boolean>(false)
    const last = ref<string>()
    const URL = ref<string>('')

    const params = reactive<Params>({
        colors: [],
        flowers: [],
        occasions: [],
        styles: [],
        q: '',
    })

    const { data: fetchResponse, pending } = await useFetch<FetchRespone>(URL)

    watchDebounced(
        [params, keep],
        () => {
            console.log(keep.value)

            const searchParams = new URLSearchParams()

            if (params.q !== '') searchParams.set('q', params.q.trim())

            if (keep.value && last.value) {
                searchParams.set('last', last.value satisfies string)
            }

            for (const paramname of [
                'colors',
                'flowers',
                'occasions',
                'styles',
            ]) {
                if (params[paramname].length < 1) continue

                const values = (params[paramname] as string[])
                    .map((x) => x.trim())
                    .join(',')

                searchParams.set(paramname, values)
            }

            URL.value = `/api/bouquets?${searchParams.toString()}`
        },
        { immediate: true, debounce: 500 }
    )

    whenever(fetchResponse, ({ items, last: rLast }) => {
        keptBouquets.value = [...keptBouquets.value, ...bouquets.value]

        if (!keep.value) keptBouquets.value = []

        bouquets.value = items

        last.value = rLast
    })

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
                keep,
            },
        },
    }
})
