<script setup lang="ts">
import BtnFullScreen from './components/BtnFullScreen.vue'
import ControlsGroup from './components/ControlsGroup.vue'
import { onMounted, ref } from 'vue'

let ws: WebSocket | null = null

const wrapper = ref<null | HTMLDivElement>(null)
const message = ref('')

const selectDirection = (value: string) => {
  if (!ws) {
    return
  }

  ws.send(value)
}

const setFullscreen = () => {
  if (!wrapper.value) {
    return
  }

  wrapper.value.requestFullscreen()
}

onMounted(() => {
  ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_SERVER)

  ws.onerror = () => {
    console.log('WebSocket error')
  }
  ws.onmessage = (event) => {
    message.value = event.data
  }
  ws.onopen = () => {
    console.log('WebSocket connection established')
  }
  ws.onclose = () => {
    console.log('WebSocket connection closed')
    ws = null
  }
})
</script>

<template>
  <div ref="wrapper"><ControlsGroup @select-direction="selectDirection" /></div>
  <BtnFullScreen class="btn-fullscreen" @set-fullscreen="setFullscreen" />
</template>

<style scoped>
.btn-fullscreen {
  position: fixed;
  right: 1em;
  bottom: 1em;
}
</style>
./components/ControlsGroup.vue
