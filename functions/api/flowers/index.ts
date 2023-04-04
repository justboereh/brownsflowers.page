import Flowers from '~constants/flowers'
import type {FlowersSearchParams} from '~constansts/types'

const FlowersLimit = 16


export const onRequestGet: PagesFunction = ({ request }) => {
    const params = new URL(request.url).searchParams

    const flowersSection = 0
    const flowersResponse = []

    for (const [key, value] of Flowers.entries()) {
        if (flowersResponse.length === FlowersLimit) break

        const addFlower = true

        if (params.q)

    }

     return new Response(JSON.stringify(flowersResponse))
}
