<script setup lang="ts">
import BtnFullScreen from './components/BtnFullScreen.vue'
import ControlsGroup from './components/ControlsGroup.vue'
import GamepadControls from './components/GamepadControls.vue'
import SpeechController from './components/SpeechController.vue'
import BtnNext from './components/BtnNext.vue'
import AppSymbol from './components/AppSymbol.vue'
import { onMounted, ref } from 'vue'

let ws: WebSocket | null = null

const page = ref(1)

const wrapper = ref<null | HTMLDivElement>(null)
const direction = ref('')
const symbolSize = ref(1)
const symbolType = ref('left')
const symbolTypes = ['left', 'top', 'right', 'down']
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

  if (!direction.value) {
    return
  }

  ws.send(direction.value)

  direction.value = ''
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

const reset = () => {
  const randomIndex = Math.floor(Math.random() * 4)
  symbolType.value = symbolTypes[randomIndex]
}

onMounted(() => {
  ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_SERVER)

  ws.onerror = () => {
    console.log('WebSocket error')
  }
  ws.onmessage = (event) => {
    page.value = page.value + 1
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
      <Transition @after-leave="reset">
        <AppSymbol
          v-if="page % 2 === 0"
          class="symbol"
          :type="symbolType"
          :style="{ scale: `calc(1 - (${page / 10}))` }"
        />
      </Transition>
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
  block-size: 5em;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
