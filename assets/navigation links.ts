type Link = {
    text: string
    href: string
}

type Product = {
    image: string
    alt: string
    href: string
    price: string
}

type Bouquets = {
    list: Array<string>
}

type Sublinks = {
    text: string
    list: Array<LinksGroup>
}

type Links = {
    type: 'sublinks' | 'bouquets' | 'link'
    item: Sublinks | Bouquets | Link
}

type LinksGroup = {
    text: string
    list: Array<Links>
}

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
                            list: [
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Anniversary',
                                        href: '/bouquets?occasions=Anniversary',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Birthday',
                                        href: '/bouquets?occasions=Birthday',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Easter',
                                        href: '/bouquets?occasions=Easter',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Get Well',
                                        href: '/bouquets?occasions=Get Well',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Just Because',
                                        href: '/bouquets?occasions=Just Becuase',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Love & romance',
                                        href: '/bouquets?occasions=Love Romance',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Make Someone Smile',
                                        href: '/bouquets?occasions=Make Someone Smile',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'New Baby',
                                        href: '/bouquets?occasions=New Baby',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Passover',
                                        href: '/bouquets?occasions=Passover',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Sympathy',
                                        href: '/bouquets?occasions=Smypathy',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Thank You',
                                        href: '/bouquets?occasions=Thank You',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Wedding',
                                        href: '/bouquets?occasions=Wedding',
                                    },
                                },
                            ],
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
                            list: [
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Flower in a Gift',
                                        href: '/bouquets?flowers=Fiag',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Lavish',
                                        href: '/bouquets?flowers=Lavish',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Modern',
                                        href: '/bouquets?flowers=Modern',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Plants',
                                        href: '/bouquets?flowers=Plants',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Roses',
                                        href: '/bouquets?flowers=Roses',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Spring Bouquets',
                                        href: '/bouquets?flowers=Spring Bouquets',
                                    },
                                },
                                {
                                    type: 'link',
                                    item: {
                                        text: 'Tulips',
                                        href: '/bouquets?flowers=Tulips',
                                    },
                                },
                            ],
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
] as Array<LinksGroup>
