<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

const fetchPage = async (page: Ref<number>) => {
  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return axios
    .get(`https://jsonplaceholder.typicode.com/posts?_page=${page.value}&_limit=10`)
    .then((response) => {
      return response.data
    })
}

const page = ref(1)
const { isPending, isError, data, error, isFetching, isPlaceholderData } = useQuery({
  queryKey: ['paginatedPosts', page],
  queryFn: () => fetchPage(page),
  // placeholderData: keepPreviousData, ////
  placeholderData: (previousData) => previousData,
})
const prevPage = () => {
  page.value = Math.max(page.value - 1, 1)
}
const nextPage = () => {
  if (!isPlaceholderData.value) {
    page.value = page.value + 1
  }
}
</script>

<template>
  <div>
    <h1>Posts</h1>
    <p>Current Page: {{ page }} | Previous data: {{ isPlaceholderData }}</p>
    <button @click="prevPage">Prev Page</button>
    <button @click="nextPage">Next Page</button>
    <div v-if="isFetching">isFetching...</div>
    <div v-if="isPending">isPending...</div>
    <div v-else-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data">
      <ul>
        <li v-for="item in data" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
