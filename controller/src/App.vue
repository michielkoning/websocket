<script setup lang="ts">
import BtnFullScreen from './components/BtnFullScreen.vue'
import ControlsGroup from './components/ControlsGroup.vue'
import GamepadControls from './components/GamepadControls.vue'
import SpeechController from './components/SpeechController.vue'
import AppSymbol from './components/AppSymbol.vue'
import { onMounted, ref, watch } from 'vue'

let ws: WebSocket | null = null

const wrapper = ref<null | HTMLDivElement>(null)
const direction = ref('')
const symbolSize = ref(1)
const symbolType = ref('left')

const setCommand = (value: string) => {
  setDirection(value)
}

watch(direction, () => {
  symbolType.value = direction.value
})

const setDirection = (value: string) => {
  if (!ws) {
    return
  }
  direction.value = value

  ws.send(direction.value)
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
    direction.value = event.data
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
  <div class="wrapper" :style="`--size: ${symbolSize}`">
    <GamepadControls @set-direction="setDirection" />
    <SpeechController class="btn-speech-recognition" @set-command="setCommand" />
    <BtnFullScreen class="btn-fullscreen" @set-fullscreen="setFullscreen" />

    <div class="canvas">
      <AppSymbol class="symbol" :type="symbolType" />
    </div>

    <div class="controls">
      <ControlsGroup :direction="direction" @set-direction="setDirection" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  block-size: 100svh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}

.canvas {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls {
  background: #3333ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-fullscreen {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  color: white;
}

.btn-speech-recognition {
  position: fixed;
  right: 3.75rem;
  bottom: 1rem;
  color: white;
}

.symbol {
  block-size: calc(var(--size) * 1svw + 5svw);
}
</style>
