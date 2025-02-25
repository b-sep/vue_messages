<script setup lang="ts">
  import { ref } from 'vue';
  import { createMessage } from '@/services/api';
  import type { Messages, MessageForm } from '@/types/api'
  import Message from './Message.vue';

  defineProps<{
    messages: Messages
  }>()

  const form = ref<MessageForm>({ message: { recipient: '', content: '' }})
  const error = ref<string | null>(null)
  const createMessageSuccess = ref(false)

  async function onSubmit() {
    try {
      const response = await createMessage(form.value)
      const responseError = response.data?.error

      if (responseError) {
        error.value = responseError
        createMessageSuccess.value = false
      } else {
        createMessageSuccess.value = true
        error.value = null
      }
    } catch {
      error.value = 'Ops 🥲'
    }
  }
</script>

<template>
  <div>
    <section>
      <h1>Mensagens Enviadas</h1>

      <ul v-if="messages.sended_messages.length > 0">
        <Message
          v-for="(message, index) in messages.sended_messages"
          :key="index"
          :content="message.content"
          :sended_at="message.sended_at"
          :to="message.to"
        />
      </ul>
      <p v-else>Nenhuma mensagem enviada :(</p>
    </section>

    <section>
      <h1>Mensagens Recebidas</h1>

      <ul v-if="messages.received_messages.length > 0">
        <Message
          v-for="(message, index) in messages.received_messages"
          :key="index"
          :content="message.content"
          :received_at="message.received_at"
          :from="message.from"
        />
      </ul>
      <p v-else>Nenhuma mensagem recebida :(</p>
    </section>

    <section>
      <h1>Enviar Mensagem</h1>

      <form @submit.prevent="onSubmit">
        <textarea rows="30" v-model="form.message.content"></textarea>
        <input placeholder="email" required type="email" v-model="form.message.recipient"></input>

        <button type="submit">Enviar</button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="createMessageSuccess" class="success">Mensagem enviada :)</p>
    </section>
  </div>
</template>

<style scoped>
  .error {
    color: red;
    font-size: 1.5rem;
    font-weight: 500;
  }

  .success {
    color: green;
    font-size: 1.5rem;
    font-weight: 500;
  }

  section {
    padding: 1rem;
    text-align: center;
    width: 100%;
  }

  div {
    display: flex;
    justify-content: space-evenly;
    margin-top: 2rem;
    padding: 1rem;
  }

  form, ul {
    border: 1px solid #bbb;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    min-height: 80vh;
  }

  input, textarea {
    background-color: #eee;
    border: 1px solid #bbb;
    border-radius: 5px;
    padding: 0.5rem;
  }

  h1 {
    margin-bottom: 2rem;
  }

  p {
    color: #4E2862;
    font-weight: 400;
  }

  ul {
    max-height: 70vh;
    list-style: none;
    overflow-y: auto;
  }
</style>
