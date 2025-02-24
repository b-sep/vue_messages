<script setup lang="ts">
  import MessagesContainer from '@/components/MessagesContainer.vue'
  import type { Messages } from '../types/api'
  import { onMounted, ref } from 'vue'
  import { getMessages } from '@/services/api';

  const messages = ref<Messages | undefined>(undefined)
  const error = ref('')

  async function retrieveMessages() {
    const userId = localStorage.getItem('voll@userId')

    if (userId) {
      try {
        const response = await getMessages(userId)

        if (response.data) {
          messages.value = response.data.messages
        } else if (response.status === 404) {
          error.value = 'Usuário não encontrado 🔎'
        } else if (response.status === 401) {
          error.value = 'Você não pode ver isso 🧐'
        }
      } catch {
        error.value = 'Ops 🥲'
      }
    }
  }

  onMounted(async () => {
    await retrieveMessages()
  })
</script>

<template>
  <MessagesContainer v-if="messages" :messages="messages" />
  <p v-else-if="error" class="error">{{ error }}</p>
  <p v-else class="loading">Carregando mensagens ...</p>
</template>

<style scoped>
  .error {
    color: red;
    font-size: 2rem;
    font-weight: 500;
    margin-top: 1rem;
    text-align: center;
  }

  .loading {
    font-size: 2rem;
  }
</style>
