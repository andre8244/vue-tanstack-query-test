<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

const getResource = async (): Promise<User[]> => {
  const { data } = await axios.get('https://reqres.in/api/test/99', {
    headers: {
      'x-api-key': 'reqres-free-v1',
    },
  })
  return data.data
}

const { isPending, isError, isFetching, data, error, failureReason } = useQuery({
  queryKey: ['resource'],
  queryFn: getResource,
})
</script>

<template>
  <div>
    <h1>Error test</h1>
    <div v-if="isPending">isPending...</div>
    <div v-if="isFetching">isFetching...</div>
    <div v-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data">
      {{ data }}
    </div>
  </div>
</template>
