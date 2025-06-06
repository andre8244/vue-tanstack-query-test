<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import axios from 'axios'

const pageSize = 3

const fetchPosts = async ({ pageParam = 0 }) => {
  return (
    axios
      // let's use pageSize of 1 so pageParam can be used as a cursor
      .get(`https://reqres.in/api/users?page=${pageParam}&per_page=${pageSize}&delay=1`, {
        headers: {
          'x-api-key': 'reqres-free-v1',
        },
      })
      .then((response) => {
        console.log('response data', response.data) ////
        return response.data
      })
  )
}

const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  isPending,
  isError,
} = useInfiniteQuery({
  queryKey: ['infinitePosts'],
  queryFn: fetchPosts,
  initialPageParam: 0,
  getNextPageParam: (lastPage) => {
    if (lastPage.page < lastPage.total_pages) {
      return lastPage.page + 1
    } else {
      // last page reached
      return undefined
    }
  },
})
</script>

<template>
  <div>
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <div v-else-if="data">
      <span v-if="isFetching && !isFetchingNextPage">Fetching...</span>
      <ul v-for="(page, index) in data.pages" :key="index">
        <li v-for="user in page.data" :key="user.id">
          {{ user.first_name }} {{ user.last_name }} - {{ user.email }}
        </li>
      </ul>
      <button @click="() => fetchNextPage()" :disabled="!hasNextPage || isFetchingNextPage">
        <span v-if="isFetchingNextPage">Loading more...</span>
        <span v-else-if="hasNextPage">Load More</span>
        <span v-else>Nothing more to load</span>
      </button>
    </div>
  </div>
</template>
