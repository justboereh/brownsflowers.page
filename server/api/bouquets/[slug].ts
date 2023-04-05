export default defineEventHandler(async ({ context }) => {
    const params = context.params as Record<string, string>

    return await context.deta.Base('bouquets').get(params.slug)
})
