import { parse } from 'qs'

const FlowersLimit = 16
const ArrayableQueryNames = ['flowers', 'occasions', 'colors', 'styles']

export default defineEventHandler(async ({ node, context }) => {
    const qs = parse((node.req.url as string).split('?').splice(1, 1).join(''))
    const query: Record<string, string> = {}

    for (const queryname of ArrayableQueryNames) {
        if (!qs[queryname]) continue

        for (const value of (qs[queryname] as string).split(',')) {
            query[`${queryname}?contains`] = value
        }
    }

    let result = await context.deta.Base('bouquets').fetch(query, {
        limit: FlowersLimit,
        last: qs.last ? qs.last : undefined,
    })

    if (!qs.q) return result

    let flowers: Array<Record<string, string>> = []

    const islast = false

    function flowerPassed(flower: Record<string, string>) {
        const isInName = flower.name.includes(qs.q as string)
        const isInDesc = flower.description.includes(qs.q as string)

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
        result = await context.deta.Base('bouquets').fetch(query, {
            limit: FlowersLimit,
            last: qs.last ? qs.last : undefined,
        })

        checkFlowers(result.items)
    }

    return { last: result.last, count: flowers.length, items: flowers }
})
