const FlowersLimit = 16
const ArrayableQueryNames = ['flowers', 'occasions', 'colors', 'styles']

export default defineEventHandler(async (event) => {
    const queryString = getQuery(event)

    const query: Record<string, string> = {}
    for (const queryname of ArrayableQueryNames) {
        if (!queryString[queryname]) continue

        for (const value of (queryString[queryname] as string).split(',')) {
            query[`${queryname}?contains`] = value
        }
    }

    let result = await event.context.deta.Base('bouquets').fetch(query, {
        limit: FlowersLimit,
        last: queryString.last ? queryString.last : undefined,
    })

    if (!queryString.q) return result

    let flowers: Array<Record<string, string>> = []

    const islast = false

    function flowerPassed(flower: Record<string, string>) {
        const isInName = flower.name.includes(queryString.q as string)
        const isInDesc = flower.description.includes(queryString.q as string)

        return isInName || isInDesc
    }

    function checkFlowers(list: Array<Record<string, string>>) {
        for (const flower of list) {
            if (flowers.length === FlowersLimit) break
            if (!flowerPassed(flower)) continue

            flowers.push(flower)
        }
    }

    checkFlowers(result.items)

    while (result.last && flowers.length < FlowersLimit) {
        result = await event.context.deta.Base('bouquets').fetch(query, {
            limit: FlowersLimit,
            last: queryString.last ? queryString.last : undefined,
        })

        checkFlowers(result.items)
    }

    return { last: result.last, count: flowers.length, items: flowers }
})
