import { flowers, occasions } from './all possible filters'

function sort(arr: Array<string>) {
    return arr.sort(function (a: string, b: string) {
        return ('' + a).localeCompare(b)
    })
}

const flowerLinks = sort(flowers).map((flower) => ({
    type: 'link',
    item: {
        text: flower,
        href: `/bouquets?flowers=${flower}`,
    },
}))

const occasionLinks = sort(occasions).map((occasion) => ({
    type: 'link',
    item: {
        text: occasion,
        href: `/bouquets?occasions=${occasion}`,
    },
}))

export default [
    {
        text: '',
        list: [
            {
                type: 'link',
                item: {
                    text: 'Easter Flowers',
                    href: '/bouquets?occasions=Easter Flowers',
                },
            },
            {
                type: 'sublinks',
                item: {
                    text: 'Occasions',
                    list: [
                        {
                            text: 'Featured Bouquets',
                            list: [
                                {
                                    type: 'bouquets',
                                    item: {
                                        list: [
                                            'telefloras-magical-muse-bouquet',
                                            'goodness-and-light-bouquet',
                                            'telefloras-lavender-in-bloom-bouquet',
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            text: 'Occasions',
                            list: occasionLinks,
                        },
                    ],
                },
            },
            {
                type: 'sublinks',
                item: {
                    text: 'Flowers',
                    list: [
                        {
                            text: 'Featured Bouquets',
                            list: [
                                {
                                    type: 'bouquets',
                                    item: {
                                        list: [
                                            'telefloras-aqua-allure-bouquet',
                                            'blush-life-bouquet',
                                            'spring-sonata',
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            text: 'Flowers',
                            list: flowerLinks,
                        },
                    ],
                },
            },
            {
                type: 'link',
                item: {
                    text: 'About Us',
                    href: '/about-us',
                },
            },
            {
                type: 'link',
                item: {
                    text: 'Help',
                    href: '/help',
                },
            },
        ],
    },
    {
        text: 'Customer Service',
        list: [
            {
                type: 'link',
                item: {
                    text: '(479) 754 - 3436',
                    external: true,
                    href: 'tel:4797543436',
                },
            },
            {
                type: 'link',
                item: {
                    text: '(800) 944-1160',
                    external: true,
                    href: 'tel:8009441160',
                },
            },
            {
                type: 'link',
                item: {
                    icon: 'logos:facebook',
                    external: true,
                    text: 'Facebook',
                    href: '//www.facebook.com/Browns-Flowers-110960495633094/',
                },
            },
        ],
    },
]
