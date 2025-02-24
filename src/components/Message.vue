<script setup lang="ts">
  defineProps<{ content: String, sended_at?: String, to?: String, from?: String, received_at?: String }>()
</script>

<template>
  <li :class="sended_at ? 'sended' : 'received'">
    <p>
      {{ sended_at ? 'Para: ' : 'De: ' }}
      <span>{{ sended_at ? to : from }}</span>
    </p>
    <p>
      {{ content }}
    </p>
    <p class="hour">
      {{ sended_at || received_at }}
    </p>
  </li>
</template>

<style scoped>
  .hour {
    font-style: italic;
    font-weight: 300;
    font-size: 0.8rem;
  }

  .sended {
    background-color: lightgreen;
  }

  .received {
    background-color: lightblue;
  }

  li {
    border: 1px solid #bbb;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    line-height: 1.5rem;
    padding: 0.5rem;
    text-align: left;
  }
</style>
