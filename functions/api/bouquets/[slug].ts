interface Env {
    BOUQUETS: KVNamespace
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { params, env } = context

    console.log(await env.BOUQUETS.list())

    const flower = await env.BOUQUETS.get(params.slug as string)

    if (!flower) return new Response('Invalid', { status: 404 })

    return new Response(flower)
}
