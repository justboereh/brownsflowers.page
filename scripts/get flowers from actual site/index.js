import puppeteer from 'puppeteer'
import _ from 'lodash'
import { writeFileSync } from 'node:fs'

let Flowers = []
const DataLogs = {
    flowers: {
        total: 0,
        completed: 0,
    },

    filters: {
        total: 0,
        completed: 0,
    },
}
const Browser = await puppeteer.launch()

SearchFlowers('https://www.brownsflowers.net/roses/cat1000012')
SearchFlowers('https://www.brownsflowers.net/lavish/cat1010005')
SearchFlowers('https://www.brownsflowers.net/modern/cat1080001')
SearchFlowers('https://www.brownsflowers.net/spring-bouquets/cat1000013')
SearchFlowers('https://www.brownsflowers.net/flowers-in-a-gift/cat1080003')
SearchFlowers('https://www.brownsflowers.net/plants/cat1010006')
SearchFlowers('https://www.brownsflowers.net/tulips/cat1080002')

async function SearchFlowers(url) {
    const page = await Browser.newPage()

    page.on('console', async (msg) => {
        const args = msg.args()

        for (let i = 0; i < args.length; ++i) {
            const text = await args[i].jsonValue()

            if (!String(text).includes('node:')) return

            console.log(text)
        }
    })

    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.setViewport({ width: 1920, height: 1080 })

    const filters = await getFilters(page)

    DataLogs.filters.total += filters.length

    page.close()

    const Main = async (filteritem) => {
        const filterpage = await Browser.newPage()

        await filterpage.goto(url + filteritem.href, {
            waitUntil: 'networkidle0',
        })

        await autoScroll(filterpage)

        const newFlowers = await getFlowers(filterpage)

        for (const newflower of newFlowers) {
            const index = Flowers.findIndex(
                ({ name }) => name === newflower.name
            )

            if (index < 0) {
                Flowers.push(newflower)

                continue
            }

            const flower = Flowers[index]

            const filterarr = flower[filteritem.name] || []
            filterarr.push(filteritem.value)

            flower[filteritem.name] = filterarr

            Flowers[index] = _.merge(Flowers[index], flower)

            delete Flowers[index].href
        }

        DataLogs.filters.completed += 1
        DataLogs.flowers.completed += newFlowers.length

        console.log(
            `Flowers: ${DataLogs.flowers.completed} / ${DataLogs.flowers.total} ----- Filters: ${DataLogs.filters.completed} / ${DataLogs.filters.total}`
        )

        writeFileSync('./Flowers.json', JSON.stringify(Flowers, null, '\t'))

        filterpage.close()
    }

    for (const filteritem of filters) await Main(filteritem)
}

async function getFilters(page) {
    return await page.evaluate(() => {
        function capitalizeFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        }

        const filters = []
        const elements = document.querySelectorAll('#filterNav fieldset')

        for (const filterEl of elements) {
            let legend = capitalizeFirstLetter(
                filterEl.querySelector('legend').innerText
            )

            if (legend === 'Price ranges') continue

            const inputs = filterEl.querySelectorAll('ul > li  > input')

            for (const input of inputs) {
                filters.push({
                    name: legend + 's',
                    value: input.getAttribute('name'),
                    href: input.value,
                })
            }
        }

        return filters
    })
}

async function getFlowers(page) {
    /** Basic Flower Info: name, best, new, slug, img, href */
    let flowers = await page.evaluate(() => {
        const flowers = []

        const links = document.querySelectorAll(
            '#productContainer > .m-product-mini a'
        )

        for (const link of links) {
            const name = link.querySelector('h2').innerText.trim()
            const best = link.querySelector(
                '[alt="Best Seller Flower Arrangement"]'
            )
            const isnew = link.querySelector(
                '[alt="New Flower Arrangement by Brown\'s Flowers"]'
            )
            const img = link.querySelector('figure > img').href
            const slug = name
                .toLowerCase()
                .replaceAll(' ', '-')
                .replaceAll(/[^a-zA-Z0-9\-]/g, '')

            flowers.push({
                name,
                img,
                slug,
                href: link.href,
                best: !!best,
                new: !!isnew,
            })
        }

        return flowers
    })

    DataLogs.flowers.total += flowers.length

    /** More Flower Info: prices, sizes, arrangment, vase, description, you may also like */
    for (let index = 0; index < flowers.length; index++) {
        const flower = flowers[index]

        await page.goto(flower.href, { waitUntil: 'networkidle0' })

        flower.description = await page.evaluate(() => {
            const element = document.querySelector('.m-pdp-tabs-description')

            return element ? element.innerText : ''
        })

        flower.arrangement = await page.evaluate(() => {
            const element = document.querySelector('#arrngDescp')

            return element ? element.innerText : ''
        })

        flower.vase = await page.evaluate(() => {
            const element = document.querySelector('.m-pdp-tabs-vase-img img')

            if (!element) return

            return {
                img: element.src,
                alt: element.getAttribute('alt'),
            }
        })

        flower.ymal = await page.evaluate(() => {
            const ymal = []

            const elements = document.querySelectorAll(
                '.ymalPdp .m-product-mini .m-category-flower-link'
            )

            for (const element of elements) ymal.push(element.innerText)

            return ymal
        })

        flower.sizes = await page.evaluate(() => {
            function capitalize(str) {
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
            }

            const sizes = []

            const sizeElements = document.querySelectorAll('#sizeRadios > div')

            for (const element of sizeElements) {
                const size = {
                    name: capitalize(
                        element.querySelector('.label-alt-text').innerText
                    ),
                    images: [],
                }

                element.querySelector('[type="radio"]').click()

                const imageElements =
                    document.querySelectorAll('#pdpThumbImg a img')

                for (const element of imageElements) {
                    const id = element.src.split('/').slice(-1)

                    const url = '//assets.eflorist.com/assets/products'

                    size.images.push({
                        thumbnail: element.src,
                        normal: `${url}/PHR_/${id}`,
                        zoom: `${url}/PZM_/${id}`,
                        alt: element.getAttribute('alt'),
                    })
                }

                sizes.push(size)
            }

            return sizes
        })

        flowers[index] = flower
    }

    return flowers
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



/** */

