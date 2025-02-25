<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { logout } from './services/api';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue'

  const router = useRouter()
  const userToken = ref<string | null>(localStorage.getItem('voll@token'))

  async function handleLogout() {
    try {
      const response = await logout()

      if (response.status === 204) {
        router.push('/login')

        userToken.value = null
        localStorage.removeItem('voll@token')
        localStorage.removeItem('voll@userId')
        localStorage.removeItem('voll@userName')
      }
    } catch(error) {
      console.log(error)
    }
  }
</script>

<template>
  <button @click.prevent="handleLogout" v-if="userToken">Sair</button>

  <RouterView />
</template>

<style scoped>
  button {
    background-color: tomato;
    border: 0;
    border-radius: 5px;
    color: #eee;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    position: absolute;
    top: 25px;
    right: 50px;
  }
</style>
