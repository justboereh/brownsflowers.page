import Flowers from '~constants/flowers'

interface Env {
    Flowers: KVNamespace
}

export const onRequestGet: PagesFunction = ({ params }) => {
    if (!Flowers.has(params.slug)) return new Response('Invalid', { status: 404 })

    return new Response(JSON.stringify(Flowers.get(params.slug)))
}