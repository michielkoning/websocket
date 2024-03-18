<script setup lang="ts">
import BtnFullScreen from './components/BtnFullScreen.vue'
import ControlsGroup from './components/ControlsGroup.vue'
import GamepadControls from './components/GamepadControls.vue'
import { onMounted, ref } from 'vue'
import SpeechController from './components/SpeechController.vue';

let ws: WebSocket | null = null

const wrapper = ref<null | HTMLDivElement>(null)
const message = ref('asdsd')

const setCommand = (value: string) => {
  setDirection(value)
}

const setDirection = (value: string) => {
  if (!ws) {
    return
  }
  message.value = value

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
  <GamepadControls @set-direction="setDirection" />
  <SpeechController @set-command="setCommand" />
  <ControlsGroup @set-direction="setDirection" />
  <BtnFullScreen class="btn-fullscreen" @set-fullscreen="setFullscreen" />
</template>

<style scoped>
.btn-fullscreen {
  position: fixed;
  right: 1em;
  bottom: 1em;
}
</style>
