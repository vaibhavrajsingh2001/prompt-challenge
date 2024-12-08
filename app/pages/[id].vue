<template>
    <UContainer class="py-8">
        <div v-if="challenge">
            <h1 class="text-2xl font-bold mb-6">{{ challenge.title }}</h1>
            <img :src="`/images/challenges/${challenge.fileName}`" :alt="challenge.title"
                class="w-full max-w-2xl mx-auto mb-8 rounded-lg shadow-lg">
            <div class="max-w-2xl mx-auto">

                <UTextarea v-model="userPrompt" placeholder="Write your prompt here..." :rows="4" />

                <UButton class="mt-4" :loading="isGenerating" @click="submitPrompt">Generate Image</UButton>
            </div>
            <div v-if="generatedImage" class="mt-8">
                <h2 class="text-xl font-bold mb-4">Generated Image</h2>
                <img :src="generatedImage" alt="Generated image" class="w-full max-w-2xl mx-auto rounded-lg shadow-lg">
            </div>
        </div>
        <p v-else-if="error">{{ error }}</p>
        <p v-else>Loading...</p>
    </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const challengeId = route.params.id as string

interface Challenge {
    fileName: string;
    title: string;
}

const { data: challenge, error } = await useFetch<Challenge>(`/api/challenge/${challengeId}`)

const userPrompt = ref('')
const generatedImage = ref<string | null>(null)
const isGenerating = ref(false)

async function submitPrompt() {
    if (!userPrompt.value.trim()) {
        alert('Please enter a prompt')
        return
    }

    isGenerating.value = true
    try {

        const response = await $fetch(`/api/images/generate?prompt=${encodeURIComponent(userPrompt.value)}`)
        console.log(response)
        generatedImage.value = response
    } catch (error) {
        console.error('Error generating image:', error)
        alert('Failed to generate image. Please try again.')
    } finally {
        isGenerating.value = false
    }
}
</script>