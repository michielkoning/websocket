<script lang="ts" setup>
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/SpeechRecognition

import { onMounted, ref } from 'vue'

const emit = defineEmits(['setCommand'])

const isListening = ref(false)
const lang = 'nl-NL'
const phrases = ['links', 'rechts']
const commands = ['left', 'right']

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
  <div>
    <button @click="toggleRecognition">{{ isListening ? 'Stop' : 'Start' }} listening</button>
  </div>
</template>
