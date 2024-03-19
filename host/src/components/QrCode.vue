<script lang="ts" setup>
import QRCode from 'qrcode'
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(async () => {
  QRCode.toCanvas(
    canvas.value,
    'http://192.168.1.37:8081',
    {
      width: 500
    },
    function (error) {
      if (error) console.error(error)
      console.log('success!')
    }
  )
})
</script>

<template>
  <canvas ref="canvas" width="200" height="200"></canvas>
</template>

<style scoped>
canvas {
  width: 25vw;
  height: 25vh;
}
</style>
