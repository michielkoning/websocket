<script lang="ts" setup>
defineProps<{
  direction: string
}>()
defineEmits(['setDirection'])
</script>

<template>
  <div class="controls-group">
    <button class="up" @click="$emit('setDirection', 'up')">Boven</button>
    <button class="left" @click="$emit('setDirection', 'left')">Links</button>
    <button class="right" @click="$emit('setDirection', 'right')">Rechts</button>
    <button class="down" @click="$emit('setDirection', 'down')">Onder</button>

    <svg class="background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path d="M12.95,8.13v-4.6c-4.64,1.13-8.29,4.78-9.42,9.42h4.6C8.99,10.73,10.73,8.99,12.95,8.13z" />
      <path d="M19.05,3.53v4.6c2.22,0.86,3.96,2.6,4.82,4.82h4.6C27.34,8.31,23.69,4.66,19.05,3.53z" />
      <path d="M19.05,23.87v4.6c4.64-1.13,8.29-4.78,9.42-9.42h-4.6C23.01,21.27,21.27,23.01,19.05,23.87z" />
      <path d="M12.95,28.47v-4.6c-2.22-0.86-3.96-2.6-4.82-4.82h-4.6C4.66,23.69,8.31,27.34,12.95,28.47z" />
      <path v-if="direction !== 'left'" d="M3.41,18.55h4.54c-0.27-0.84-0.4-1.69-0.4-2.55c0-0.86,0.13-1.71,0.4-2.55H3.41C3.24,14.3,3.15,15.16,3.15,16
	C3.15,16.84,3.24,17.7,3.41,18.55z" />
      <path v-if="direction !== 'right'" d="M28.58,13.45h-4.54c0.27,0.83,0.4,1.69,0.4,2.55c0,0.86-0.13,1.71-0.4,2.55h4.54c0.17-0.85,0.26-1.71,0.26-2.55
	C28.85,15.16,28.76,14.3,28.58,13.45z" />
      <path v-if="direction !== 'up'"
        d="M18.55,7.95V3.41c-1.7-0.35-3.4-0.35-5.1,0v4.54c0.83-0.27,1.69-0.4,2.55-0.4C16.86,7.55,17.71,7.68,18.55,7.95z" />
      <path v-if="direction !== 'down'"
        d="M13.45,24.05v4.54c1.7,0.35,3.4,0.34,5.1,0v-4.54C16.88,24.58,15.12,24.58,13.45,24.05z" />
    </svg>

  </div>
</template>

<style scoped>
.controls-group {
  position: relative;
  aspect-ratio: 1 / 1;
  width: 65svw;
  display: grid;
  grid-template-areas:
    '. n .'
    'w . e'
    '. s .'
  ;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

button {
  cursor: pointer;
  background: transparent;
  border: 0;
  overflow: hidden;
  text-indent: -3000em;
}

.up {
  grid-area: n;
}

.left {
  grid-area: w;
}

.right {
  grid-area: e;
}

.down {
  grid-area: s;
}

.background {
  pointer-events: none;
  position: absolute;
  inset: -2%;
  fill: rgba(255, 255, 255, 0.35);
}
</style>
