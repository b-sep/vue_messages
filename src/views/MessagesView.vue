<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'
  import { Subscription } from '@rails/actioncable';
  import MessagesContainer from '@/components/MessagesContainer.vue'
  import { getMessages } from '@/services/api';
  import type { Messages, wsMessage } from '../types/api'
  import consumer from '../action_cable/consumer'

  const error = ref('')
  const messages = ref<Messages | undefined>(undefined)
  const subscription = ref<Subscription | null>(null)

  function updateMessages(data: wsMessage) {
    if (!messages.value) {
      messages.value = {
        received_messages: [],
        sended_messages: []
      }
    }

    if (data.type === 'received') {
      if (data.received_at && data.from) {
        messages.value.received_messages = [
          ...messages.value.received_messages,
          { content: data.content, received_at: data.received_at, from: data.from }
        ]
      }
    } else {
      if (data.sended_at && data.to) {
        messages.value.sended_messages = [
          ...messages.value.sended_messages,
          { content: data.content, sended_at: data.sended_at, to: data.to }
        ]
      }
    }
  }

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

    subscription.value = consumer.subscriptions.create(
      { channel: 'MessageChannel', user_id: localStorage.getItem('voll@userId') },
      {
        received(data: wsMessage) {
          updateMessages(data)
        }
      }
    ) as Subscription
  })

  onUnmounted(() => {
    if (subscription.value) subscription.value.unsubscribe()
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
