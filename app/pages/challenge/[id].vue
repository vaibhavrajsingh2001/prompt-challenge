<template>
    <UContainer>
        <div v-if="challenge">
            <h1 class="text-2xl font-bold mb-6">{{ challenge.title }}</h1>
            <img :src="`/images/challenges/${challenge.fileName}`" :alt="challenge.title"
                class="max-w-2xl max-h-80 mx-auto mb-8 rounded-lg shadow-lg">
            <div class="max-w-2xl mx-auto">
                <form label="Your prompt">
                    <UTextarea v-model="userPrompt" placeholder="Write your prompt here..." :rows="4" />
                </form>
                <UButton class="mt-4" @click="submitPrompt">Submit Prompt</UButton>
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

async function submitPrompt() {
    // TODO: Implement prompt submission logic
    console.log('Submitted prompt:', userPrompt.value)
    // You can add logic here to send the prompt to your backend
}
</script>