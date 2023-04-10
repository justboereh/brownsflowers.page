import { writeFileSync, readFileSync } from 'node:fs'

const Bouquets = JSON.parse(
    readFileSync('./Flowers.json', { encoding: 'utf-8' })
)

Bouquets.map((bouquet) => {
    if (!('colors' in bouquet)) return bouquet

    bouquet.colors = bouquet.colors.map((color) => color.toUpperCase())
    bouquet.colors = bouquet.colors.filter(
        (color, index, arr) => arr.indexOf(color) === index
    )

    return bouquet
})

Bouquets.map((bouquet) => {
    if (!('slug' in bouquet)) return bouquet

    bouquet.key = bouquet.slug
    delete bouquet.slug

    return bouquet
})

writeFileSync('./Flowers.json', JSON.stringify(Bouquets, null, '\t'))
