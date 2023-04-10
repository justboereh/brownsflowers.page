import { readFileSync, writeFileSync } from 'node:fs'

const Bouquets = JSON.parse(
    readFileSync('./Flowers.json', { encoding: 'utf-8' })
)

const values = { occasions: [], colors: [], styles: [], flowers: [] }

for (const bouquet of Bouquets) {
    for (const filtername in values) {
        if (Object.hasOwnProperty.call(values, filtername)) {
            if (!(filtername in bouquet)) continue

            values[filtername] = [...values[filtername], ...bouquet[filtername]]
        }
    }
}

for (const filtername in values) {
    if (Object.hasOwnProperty.call(values, filtername)) {
        values[filtername] = values[filtername].filter((value, index, arr) => {
            return arr.indexOf(value) === index
        })
    }
}

writeFileSync(`./all possible values.json`, JSON.stringify(values))
