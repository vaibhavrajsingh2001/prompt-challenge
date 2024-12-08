export default defineEventHandler(async (event) => {

  const { pathname } = event.context.params || {}
  console.log('get iamge endpoint hit', pathname)
  setHeader(event, 'Content-Security-Policy', 'default-src \'none\';')
  return hubBlob().get(pathname)
})
