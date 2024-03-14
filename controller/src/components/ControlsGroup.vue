<script lang="ts" setup>
defineEmits(['setDirection'])
</script>

<template>
  <div class="wrapper">
    <div class="item">
      <button @click="$emit('setDirection', 'left')">left</button>
    </div>
    <div class="item">
      <button @click="$emit('setDirection', 'right')">right</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100dvw;
  height: 100dvh;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  cursor: pointer;
  width: 10em;
  height: 10em;
  border-radius: 50%;
  background: transparent;
  border: 0;
  background: #ccc;
  color: #000;
}

button:hover {
  text-decoration: underline;
}
</style>
