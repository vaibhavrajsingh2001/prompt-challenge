<template>
  <UContainer class="flex flex-col gap-8">
    <h1 class="text-2xl">
      Create new challenge
    </h1>
    <form class="flex flex-col gap-4" @submit.prevent="createChallenge">
      <label for="file-upload">
        Upload the image you want people to prompt for
      </label>
      <UInput id="file-upload" required type="file" name="image" accept="image/jpg,image/png" />
      <label for="challenge-name">
        Enter a name for the challenge
      </label>
      <UInput id="challenge-name" required type="text" name="title" placeholder="Acme challenge" />
      <UButton type="submit" label="Submit challenge" class="max-w-36" />
    </form>
  </UContainer>

</template>

<script setup lang="ts">
const toast = useToast()

async function createChallenge(e: Event) {
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)

  try {
    const response = await $fetch('/api/challenge', {
      method: 'POST',
      body: formData
    })
    console.log(response)

    toast.add({
      title: 'Challenge created successfully'
    })
    // You can add a success message or redirect here
  } catch (error) {
    console.error('Error creating challenge:', error)
    // You can add error handling here
  }
}
</script>