<script lang="ts" setup>
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="wrapper">
    <div class="item item1">{{ message }}</div>
    <div class="item item2"></div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100dvw;
  height: 100dvh;
  color: #fff;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.item1 {
  background: red;
}

.item2 {
  background: blue;
}
</style>
