<script setup lang="ts">
defineEmits(['setFullscreen'])
</script>

<template>
  <button class="btn-fullscreen" @click="$emit('setFullscreen')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <polygon points="5.53,11.47 5.53,5.53 11.47,5.53 11.47,2.37 2.37,2.37 2.37,11.47 	" />
      <polygon points="20.53,5.53 26.47,5.53 26.47,11.47 29.63,11.47 29.63,2.37 20.53,2.37 	" />
      <polygon points="11.47,26.47 5.53,26.47 5.53,20.53 2.37,20.53 2.37,29.63 11.47,29.63 	" />
      <polygon points="26.47,20.53 26.47,26.47 20.53,26.47 20.53,29.63 29.63,29.63 29.63,20.53 	" />
    </svg>
  </button>
</template>

<style scoped>
.btn-fullscreen {
  cursor: pointer;
  background: transparent;
  border: 0;
}

svg {
  aspect-ratio: 1 / 1;
  block-size: 2rem;
  fill: currentColor;
}
</style>
