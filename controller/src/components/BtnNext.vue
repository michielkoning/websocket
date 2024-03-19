<script setup lang="ts">
defineEmits(['submit'])
</script>

<template>
  <button class="btn-fullscreen" @click="$emit('submit')">
    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"
      />
    </svg>
  </button>
</template>

<style scoped>
.btn-fullscreen {
  cursor: pointer;
  background: transparent;
  border: 0;
  color: #fff;
  opacity: 0.5;
  transition: opacity 0.2s ease-out;

  &:hover {
    opacity: 1;
  }
}

svg {
  aspect-ratio: 1 / 1;
  block-size: 3rem;
  fill: currentColor;
}
</style>
