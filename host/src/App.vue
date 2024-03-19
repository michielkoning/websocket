<script setup lang="ts">
import BtnFullScreen from './components/BtnFullScreen.vue'
import AppSymbol from './components/AppSymbol.vue'
import ImageGrid from './components/ImageGrid.vue'
import { onMounted, ref, watch } from 'vue'

let ws: WebSocket | null = null

const wrapper = ref<null | HTMLDivElement>(null)
const direction = ref('')
const symbolTypes = ['left', 'top', 'right', 'down']
const symbolSize = ref(1)
const symbolType = ref('left')
const page = ref(1)

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
    console.log(event.data.value)
    page.value = Number(event.data)
  }

  ws.onopen = () => {
    console.log('WebSocket connection established')
  }
  ws.onclose = () => {
    console.log('WebSocket connection closed')
    ws = null
  }
})

const reset = () => {
  const randomIndex = Math.floor(Math.random() * 4)
  symbolType.value = symbolTypes[randomIndex]
}
</script>

<template>
  <div ref="wrapper" class="wrapper" :style="`--size: ${symbolSize}`">
    <BtnFullScreen class="btn-fullscreen" @set-fullscreen="setFullscreen" />

    <div class="canvas">
      <Transition @after-leave="reset">
        <AppSymbol
          v-if="page % 2 === 1"
          class="symbol"
          :type="symbolType"
          :style="{ scale: `calc(1 - (${page / 10}))` }"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  block-size: 100svh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.canvas {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.symbol {
  block-size: 10em;
}

.btn-fullscreen {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
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
