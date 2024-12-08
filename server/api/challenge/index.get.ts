export default defineEventHandler(async () => {
  const kv = hubKV()
  const challenges = await kv.keys('challenge:')

  const challengeList = await Promise.all(
    challenges.map(async (key) => {
      const challenge = await kv.get(key)
      return challenge
    })
  )

  return challengeList
})