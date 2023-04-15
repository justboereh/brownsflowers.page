declare module '#app' {
    interface NuxtApp {
        $budget: {
            list: Array<Bouquet>
            params: Params
            last: string
        }
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $budget: {
            list: Array<Bouquet>
            params: Params
            last: string
        }
    }
}

export {}

export type Params = {
    colors: Array<string>
    flowers: Array<string>
    styles: Array<string>
    occasions: Array<string>
    q: string
    last: string
    [index: string]: string | Array<string>
}

export type Bouquet = {
    name: string
    key: string
    starting: string
    description: string
    arrangement: string
    best: boolean
    new: boolean
    sizes: Array<{
        name: string
        price: string
        images: Array<{
            thumbnail: string
            normal: string
            zoom: string
            alt: string
        }>
    }>
    vase: Array<{
        img: string
        alt: string
    }>
    colors: Array<string>
    flowers: Array<string>
    occasions: Array<string>
    styles: Array<string>
    ymal: Array<string>
}

export type FetchRespone = {
    items: Array<Bouquet>
    last?: string
}
