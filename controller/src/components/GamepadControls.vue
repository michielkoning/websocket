<script lang="ts" setup>
import { onMounted } from 'vue'

const emits = defineEmits(['setDirection'])

onMounted(() => {
  window.addEventListener('gamepadconnected', (e) => {
    if (!navigator.getGamepads()[e.gamepad.index]) {
      return
    }
    setInterval(function () {
      const gp = navigator.getGamepads()[e.gamepad.index]
      let direction = ''

      if (!gp) {
        return
      }

      const axis = gp.axes[0]
      if (axis === 1) {
        direction = 'right'
      } else if (axis === -1) {
        direction = 'left'
      } else {
        const arrows = gp.axes[9]
        if (arrows < 1) {
          if (arrows > 0.5) {
            direction = 'left'
          } else {
            direction = 'right'
          }
        }
      }
      if (direction) {
        emits('setDirection', direction)
      }
    }, 100)
  })
})
</script>

<template>
  <div></div>
</template>
