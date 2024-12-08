export default defineEventHandler(async (event) => {

  const { pathname } = event.context.params || {}
  setHeader(event, 'Content-Security-Policy', 'default-src \'none\';')
  return hubBlob().get(pathname)
})
