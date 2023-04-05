export default defineEventHandler(async (event) => {

    return await event.context.deta.Base('bouquets').fetch()
})
