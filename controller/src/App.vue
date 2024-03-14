<script setup lang="ts">
let ws: WebSocket | null = null

onMounted(() => {
  ws = new WebSocket('ws://localhost:8080')

  ws.onerror = function () {
    console.log('WebSocket error')
  }
  ws.onopen = function () {
    console.log('WebSocket connection established')
  }
  ws.onclose = function () {
    console.log('WebSocket connection closed')
    ws = null
  }
})

import { onMounted, ref } from 'vue'

const input = ref('')
const send = () => {
  if (!ws) {
    return
  }
  ws.send(input.value)
}
</script>

<template>
  <div>
    {{ input }}
    <input type="text" v-model="input" />
    <button @click="send">send</button>
  </div>
</template>
