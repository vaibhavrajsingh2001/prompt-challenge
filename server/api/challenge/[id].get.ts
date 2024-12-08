export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Challenge ID is required'
    })
  }

  const kv = hubKV()
  const challenge = await kv.get(`challenge:${id}`)

  if (!challenge) {
    throw createError({
      statusCode: 404,
      message: 'Challenge not found'
    })
  }

  return {
    fileName: id,
    // @ts-expect-error challenge.title is always defined
    title: challenge.title
  }
})