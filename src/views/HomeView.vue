<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import axios from 'axios'

const getUsers = async () => {
  const { data } = await axios.get('https://reqres.in/api/users?delay=2')

  console.log('getUsers', data.data) ////
  return data.data
}

const { isPending, isError, isFetching, data, error } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers,
})

// const mutation = useMutation({ ////
//   mutationFn: postTodo,
//   onSuccess: () => {
//     // Invalidate and refetch
//     queryClient.invalidateQueries({ queryKey: ['todos'] })
//   },
// })
</script>

<template>
  <div>
    <h1>Users</h1>
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
