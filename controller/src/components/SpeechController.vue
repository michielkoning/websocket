<script lang="ts" setup>
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/SpeechRecognition

import { onMounted, ref } from 'vue'

const emit = defineEmits(['setCommand'])

const isListening = ref(false)
const lang = 'nl-NL'
const phrases = ['links', 'rechts', 'boven', 'onder']
const commands = ['left', 'right', 'up', 'down']

let recognition: any = null

const toggleRecognition = () => {
  if (isListening.value === true) {
    stopRecognition()
    isListening.value = false
  } else {
    startRecognition()
    isListening.value = true
  }
}

const stopRecognition = () => {
  if (recognition) recognition.stop()
}

const startRecognition = () => {
  if (recognition) {
    recognition.start()
    console.log('Speech recognition started')
  }
}

onMounted(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null
  if (!SpeechRecognition) return

  recognition = new SpeechRecognition()

  recognition.continuous = true
  recognition.lang = lang
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.onresult = (event: any) => {
    const result = event.results[event.results.length - 1][0].transcript
    phrases.forEach((phrase, index) => {
      if (result.includes(phrase)) emit('setCommand', commands[index])
    })
  }

  recognition.onspeechend = () => {
    console.log('Speech recognition ended')
    isListening.value = false
  }

  recognition.onerror = (event: any) => {
    console.error(event.error)
  }
})
</script>

<template>
  <button class="btn-speech-recognition" :class="{ 'is-on': isListening }" @click="toggleRecognition">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path d="M26.94,14.08c0-0.15-0.12-0.27-0.27-0.27h-1.99c-0.15,0-0.27,0.12-0.27,0.27c0,4.65-3.77,8.42-8.42,8.42
	s-8.42-3.77-8.42-8.42c0-0.15-0.12-0.27-0.27-0.27H5.33c-0.15,0-0.27,0.12-0.27,0.27c0,5.59,4.2,10.21,9.61,10.86v3.39H9.86
	c-0.45,0-0.82,0.47-0.82,1.06v1.19c0,0.15,0.09,0.27,0.21,0.27h13.51c0.11,0,0.21-0.12,0.21-0.27v-1.19c0-0.59-0.36-1.06-0.82-1.06
	h-4.95v-3.38C22.67,24.36,26.94,19.72,26.94,14.08L26.94,14.08z M16,19.71c3.11,0,5.64-2.49,5.64-5.57V6.72
	c0-3.08-2.52-5.57-5.64-5.57s-5.64,2.49-5.64,5.57v7.43C10.36,17.22,12.89,19.71,16,19.71z M12.88,6.72c0-1.68,1.39-3.05,3.12-3.05
	s3.12,1.37,3.12,3.05v7.43c0,1.68-1.39,3.05-3.12,3.05s-3.12-1.37-3.12-3.05V6.72z" />
    </svg>
  </button>
</template>

<style scoped>
.btn-speech-recognition {
  cursor: pointer;
  background: transparent;
  border: 0;
  opacity: 0.35;

  &.is-on {
    opacity: 1;
  }
}

svg {
  aspect-ratio: 1 / 1;
  block-size: 2rem;
  fill: currentColor;
}
</style>
