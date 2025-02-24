<script setup lang="ts">
  import type { Messages } from '../types/api'
  import Message from './Message.vue';

  defineProps<{
    messages: Messages
  }>()
</script>

<template>
  <div>
    <section class="message-container">
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

    <section class="message-container">
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
  </div>
</template>

<style scoped>
  .message-container {
    height: 90vh;
    padding: 1rem;
    width: 700px;
    text-align: center;
  }

  div {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding: 1rem;
  }

  h1 {
    margin-bottom: 2rem;
  }

  p {
    color: #4E2862;
    font-weight: 400;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid #bbb;
    border-radius: 5px;
    max-height: 70vh;
    list-style: none;
    padding: 1rem;
    overflow-y: auto;
  }
</style>
