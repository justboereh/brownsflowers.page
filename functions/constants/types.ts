export type FlowerSize = {
    price?: string
    name: string
    images: Array<{
        thumbnail: string
        normal: string
        zoom: string
        alt: string
    }>
    size?: {
        width: string
        height: string
    }
}

export type Flower = {
    name: string
    slug: string
    description: string
    arrangement: string
    vase?: {
        img: string
        alt: string
    }
    ymal: Array<string>
    occasions?: Array<string>
    best: boolean
    new: boolean
    colors?: Array<string>
    flowers?: Array<string>
    styles?: Array<string>
    sizes: Array<FlowerSize>
}

export type FlowersSearchParams = {
    q?: string
    types?: string
    occasions?: string
    flowers?: string
    colors?: string
}

export interface Env {
    BOUQUETS: KVNamespace
}
