<script setup lang="ts">
  import { ref } from 'vue'
  import { login } from '@/services/api'
  // https://router.vuejs.org/guide/advanced/composition-api.html
  import { useRouter } from 'vue-router'

  import type { LoginForm } from '@/types/api'

  const router = useRouter()
  const form = ref<LoginForm>({ email_address: '' })
  const error = ref<string | null>(null)

  async function onSubmit() {
    try {
      const response = await login(form.value)

      if (response.data) {
        router.push('/')

        localStorage.setItem('voll@token', response.data.token)
        localStorage.setItem('voll@userId', response.data.user_id.toString())
        localStorage.setItem('voll@userName', response.data.user_name)
      } else if (response.status === 401) {
        error.value = 'Ops 🥲'
      }
    } catch {
      error.value = 'Ops 🥲'
    }
  }
</script>

<template>
  <section class="login-container">
    <form @submit.prevent="onSubmit" aria-label="login">
      <input autofocus placeholder="Digite seu email" required type="email" v-model="form.email_address"></input>

      <button type="submit">Entrar</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<style scoped>
  .login-container, form {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
  }

  .login-container {
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 80vh;
    margin: 2rem auto;
    max-width: 40%;
    min-width: 400px;
  }

  .error {
    color: tomato;
    font-size: 2rem;
    font-weight: 500;
  }

  h2 {
    font-weight: 400;
  }

  form {
    gap: 1rem;
  }

  button, input {
    border-radius: 5px;
    font-size: 1.5rem;
    min-width: 260px;
    width: 35%;
  }

  input {
    background-color: #e7e9ea;
    border: 1px solid #bbb;
    color: #222;
    height: 3rem;
    padding: 0 1rem;
  }

  button {
    background-color: #3A48AB;
    border: 0;
    color: #eee;
    cursor: pointer;
    padding: 0.5rem 1rem;
  }
</style>
