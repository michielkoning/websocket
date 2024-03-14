<template>
  <div class="wrapper" ref="wrapper">
    <div class="item1"></div>
    <div class="item2"></div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100dvw;
  height: 100dvh;
}

.item1 {
  background: red;
}

.item2 {
  background: blue;
}
</style>
