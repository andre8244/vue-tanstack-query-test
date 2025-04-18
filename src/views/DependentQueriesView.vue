<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { computed } from 'vue'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

const userId = computed(() => (users.value?.length ? users.value[0].id : undefined))
const isGetUserQueryEnabled = computed(() => !!userId.value)

const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('https://reqres.in/api/users?delay=1')
  return data.data
}

const getUser = async (userId: number): Promise<User> => {
  const { data } = await axios.get(`https://reqres.in/api/users/${userId}?delay=1`)
  return data.data
}

const {
  isPending: isPendingUsers,
  isError: isErrorUsers,
  isFetching: isFetchingUsers,
  data: users,
  error: errorUsers,
} = useQuery({
  queryKey: ['dqUsers'],
  queryFn: getUsers,
})

const {
  isPending: isPendingUser,
  isError: isErrorUser,
  isFetching: isFetchingUser,
  data: user,
  error: errorUser,
} = useQuery({
  queryKey: ['dqUser'],
  queryFn: () => getUser(userId.value!),
  enabled: isGetUserQueryEnabled,
})
</script>

<template>
  <div>
    <h1>Dependent queries</h1>
    <div style="color: green; margin-bottom: 2rem">
      <div v-if="isFetchingUsers">isFetchingUsers...</div>
      <div v-if="isPendingUsers">isPendingUsers...</div>
      <div v-else-if="isErrorUsers">An error has occurred: {{ errorUsers }}</div>
    </div>
    <div style="color: blue">
      <div v-if="isFetchingUser">isFetchingUser...</div>
      <div v-if="isPendingUser">isPendingUser...</div>
      <div v-else-if="isErrorUser">An error has occurred: {{ errorUser }}</div>
      <div v-else-if="user">{{ user.first_name }} {{ user.last_name }} - {{ user.email }}</div>
    </div>
  </div>
</template>
