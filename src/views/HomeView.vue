<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'

  const userName = localStorage.getItem('voll@userName')
</script>

<template>
  <h1>
    Bem vindo {{ userName }}
  </h1>

  <div>
    <RouterLink to="/mensagens">Mensagens</RouterLink>
  </div>

  <RouterView />
</template>

<style scoped>
  div {
    font-size: 2rem;
  }

  div a:hover {
    text-decoration: underline;
    text-underline-offset: 8px;
  }

  h1 {
    margin-top: 2rem;
    text-align: center;
  }
</style>
