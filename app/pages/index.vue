<template>
  <UContainer class="py-8">
    <h1 class="text-2xl font-bold mb-6">Challenges</h1>
    <div v-if="challenges?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="challenge in challenges" :key="challenge.fileName" class="flex flex-col">
        <template #header>
          {{ challenge.title }}
        </template>

        <img :src="`/images/challenges/${challenge.fileName}`" :alt="challenge.title" class="w-full h-48 object-cover">

        <template #footer>
          <UButton label="View Challenge" :to="`/${challenge.fileName}`" />
        </template>
      </UCard>
    </div>
    <p v-else>No challenges available.</p>
  </UContainer>
</template>

<script setup lang="ts">
interface Challenge {
  fileName: string;
  title: string;
  uploadedAt: string;
}

const { data: challenges } = await useFetch<Challenge[]>('/api/challenge')
</script>
