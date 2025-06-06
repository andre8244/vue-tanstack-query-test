<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'

type Post = {
  title: string
  body: string
  userId: number
}

const { isPending, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: (newPost: Post) => {
    return axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
  },
})

function addPost() {
  mutate({
    title: 'My new post',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    userId: 1,
  })
}
</script>

<template>
  <div>
    <h1>Mutation</h1>
    <button @click="addPost">Create post</button>
    <div v-if="isPending">isPending...</div>
    <div v-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="isSuccess">Post added!</div>
  </div>
</template>
