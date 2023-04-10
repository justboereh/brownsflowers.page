import { Deta } from 'deta'
import { readFileSync, writeFileSync } from 'node:fs'
import { config } from 'dotenv'

config()

const Bouquets = JSON.parse(
    readFileSync('./Flowers.json', { encoding: 'utf-8' })
)

const deta = Deta(process.env.DETA_PROJECT_KEY, process.env.DETA_AUTH)

for (let index = 0; index < Bouquets.length; index += 24) {
    const chunkOfBouquets = Bouquets.slice(index, index + 24)

    writeFileSync(
        `./chunks/chunk-${index / 24}.json`,
        JSON.stringify({ items: chunkOfBouquets })
    )
}
