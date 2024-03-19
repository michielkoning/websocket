<script setup lang="ts">
import BtnFullScreen from './components/BtnFullScreen.vue'
import AppSymbol from './components/AppSymbol.vue'
import ImageGrid from './components/ImageGrid.vue'
import { onMounted, ref, watch } from 'vue'

let ws: WebSocket | null = null

const wrapper = ref<null | HTMLDivElement>(null)
const direction = ref('')
const symbolSize = ref(1)
const symbolType = ref('left')

const setFullscreen = () => {
  if (!wrapper.value) {
    return
  }

  wrapper.value.requestFullscreen()
}

watch(direction, () => {
  symbolType.value = direction.value
  console.log(symbolType.value)
})

onMounted(() => {
  ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_SERVER)

  ws.onerror = () => {
    console.log('WebSocket error')
  }
  ws.onmessage = (event) => {
    console.log(event)
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
    <BtnFullScreen class="btn-fullscreen" @set-fullscreen="setFullscreen" />

    <div class="canvas">
      <AppSymbol class="symbol" :type="symbolType" />
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
</style>
