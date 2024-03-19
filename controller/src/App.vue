<script setup lang="ts">
import BtnFullScreen from './components/BtnFullScreen.vue'
import ControlsGroup from './components/ControlsGroup.vue'
import GamepadControls from './components/GamepadControls.vue'
import SpeechController from './components/SpeechController.vue'
import BtnNext from './components/BtnNext.vue'
import AppSymbol from './components/AppSymbol.vue'
import { onMounted, ref, watch } from 'vue'

let ws: WebSocket | null = null

const wrapper = ref<null | HTMLDivElement>(null)
const direction = ref('')
const symbolSize = ref(1)
const symbolType = ref('left')
const isFullscreen = ref(false)

const setCommand = (value: string) => {
  setDirection(value)
}

const setDirection = (value: string) => {
  direction.value = value
}

const submit = () => {
  if (!ws) {
    return
  }

  ws.send(direction.value)
}

const setFullscreen = () => {
  if (!wrapper.value) {
    return
  }

  if (!isFullscreen.value) {
    wrapper.value.requestFullscreen()
  } else {
    document.exitFullscreen()
  }

  isFullscreen.value = !isFullscreen.value
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
  <div ref="wrapper" class="wrapper" :style="`--size: ${symbolSize}`">
    <GamepadControls @set-direction="setDirection" @submit="setDirection" />
    <div class="buttons">
      <BtnFullScreen class="btn-fullscreen" @set-fullscreen="setFullscreen" />
      <SpeechController class="btn-speech-recognition" @set-command="setCommand" />
      <BtnNext class="btn-next" @submit="submit" />
    </div>

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

.buttons {
  position: fixed;
  display: flex;
  gap: 1rem;
  inset: auto 1rem 1rem;
}

.btn-next {
  margin-left: auto;
}

.symbol {
  block-size: calc(var(--size) * 1svw + 5svw);
}
</style>
