<script setup lang="ts">
import BtnFullScreen from './components/BtnFullScreen.vue'
import ImageGrid from './components/ImageGrid.vue'

const wrapper = ref<null | HTMLDivElement>(null)

let ws: WebSocket | null = null

const message = ref('')
onMounted(() => {
  ws = new WebSocket('ws://localhost:8080')

  ws.onerror = function () {
    console.log('WebSocket error')
  }
  ws.onmessage = function (event) {
    message.value = event.data
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

const setFullscreen = () => {
  if (!wrapper.value) {
    return
  }

  wrapper.value.requestFullscreen()
}
</script>

<template>
  <ImageGrid />
  <BtnFullScreen @setFullscreen="setFullscreen" class="btn-fullscreen" />
</template>

<style scoped>
.btn-fullscreen {
  position: fixed;
  right: 1em;
  bottom: 1em;
}
</style>
