<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <VueQueryDevtools />
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <div>
          <RouterLink to="/">Simple test</RouterLink>
        </div>
        <div>
          <RouterLink to="/errorTest">Error test</RouterLink>
        </div>
        <div>
          <RouterLink to="/showVars">Show vars</RouterLink>
        </div>
        <div>
          <RouterLink to="/dependentQueries">Dependent queries</RouterLink>
        </div>
        <div>
          <RouterLink to="/paginatedQuery">Paginated query</RouterLink>
        </div>
        <div>
          <RouterLink to="/infiniteQuery">Infinite query</RouterLink>
        </div>
        <div>
          <RouterLink to="/mutation">Mutation</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
