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

const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('https://reqres.in/api/users?delay=1')

  console.log('getUsers', data.data) ////
  return data.data
}

const { isPending, isError, isFetching, data, error } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers,
})
</script>

<template>
  <div>
    <h1>Simple</h1>
    <div v-if="isPending">isPending...</div>
    <div v-if="isFetching">isFetching...</div>
    <div v-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data">
      <li v-for="user in data" :key="user.id">
        {{ user.first_name }} {{ user.last_name }} - {{ user.email }}
      </li>
      <!-- {{ data }} -->
    </div>
  </div>
</template>
