import puppeteer from 'puppeteer'
import _ from 'lodash'
import { writeFileSync, readFileSync } from 'node:fs'

const Bouquets = JSON.parse(
    readFileSync('./Flowers.json', { encoding: 'utf-8' })
)
const Browser = await puppeteer.launch()

SearchOccasion('https://www.brownsflowers.net/passover/cat4220001', 'Passover')
SearchOccasion(
    'https://www.brownsflowers.net/anniversary/cat1000016',
    'Anniversary'
)
SearchOccasion('https://www.brownsflowers.net/birthday/cat1000017', 'Birthday')
SearchOccasion('https://www.brownsflowers.net/get-well/cat1000018', 'Get Well')
SearchOccasion(
    'https://www.brownsflowers.net/just-because/cat1080022',
    'Just Because'
)
SearchOccasion(
    'https://www.brownsflowers.net/love-romance/cat1000019',
    'Love Romance'
)
SearchOccasion(
    'https://www.brownsflowers.net/make-someone-smile/cat1080020',
    'Make Someone Smile'
)
SearchOccasion('https://www.brownsflowers.net/new-baby/cat1080021', 'New Baby')
SearchOccasion('https://www.brownsflowers.net/sympathy/cat1000009', 'Sympathy')
SearchOccasion(
    'https://www.brownsflowers.net/thank-you/cat1080019',
    'Thank You'
)
SearchOccasion('https://www.brownsflowers.net/wedding/cat1000010', 'Wedding')

async function SearchOccasion(url, occasion) {
    console.log(`Working: ${occasion}`)
    const page = await Browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle0' })

    await autoScroll(page)

    const bouquetsInOccasion = await page.evaluate(() => {
        const elements = document.querySelectorAll(
            '#productContainer .m-product-mini h2'
        )
        const bouquets = []

        for (const element of elements) {
            bouquets.push(element.innerText)
        }

        return bouquets
    })

    for (const bouquetname of bouquetsInOccasion) {
        const bouquetIndex = Bouquets.findIndex(
            ({ name }) => name === bouquetname
        )

        if (bouquetIndex < 0) continue

        const bouquet = Bouquets[bouquetIndex]

        if (!('occasions' in bouquet)) bouquet.occasions = []

        bouquet.occasions.push(occasion)

        Bouquets.splice(bouquetIndex, 1, bouquet)
    }

    console.log(`Done: ${occasion}`)

    writeFileSync('./Flowers.json', JSON.stringify(Bouquets, null, '\t'))
}

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0
            let distance = 100

            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight

                window.scrollBy(0, distance)

                totalHeight += distance

                if (totalHeight < scrollHeight - window.innerHeight) return

                const loader = document.querySelector('#productGridLoader')
                const loaderStyle = loader.getAttribute('style')
                if (loaderStyle.indexOf('display:') === -1) return

                clearInterval(timer)
                resolve()
            }, 100)
        })
    })
}
