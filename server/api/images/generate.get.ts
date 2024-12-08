export default defineEventHandler(async (event) => {
    // Get the prompt from the query parameters
    const query = getQuery(event)
    const prompt = query.prompt as string

    // Validate the prompt
    if (!prompt || typeof prompt !== 'string') {
        throw createError({
            statusCode: 400,
            message: 'A valid prompt is required'
        })
    }

    try {
        // Generate the image using hubAI
        const { image } = await hubAI().run('@cf/black-forest-labs/flux-1-schnell', {
            prompt: prompt,
        });

        const dataURI = `data:image/jpeg;charset=utf-8;base64,${image}`;

        console.log(dataURI)

        // Return the image
        return dataURI
    } catch (error) {
        console.error('Error generating image:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to generate image'
        })
    }
})