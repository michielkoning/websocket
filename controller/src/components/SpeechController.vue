<script lang="ts" setup>
// import { onMounted, ref } from 'vue'

// const output = ref('')

// const colors = [
//   'aqua',
//   'azure',
//   'beige',
//   'bisque',
//   'black',
//   'blue',
//   'brown',
//   'chocolate',
//   'coral',
//   'crimson',
//   'cyan',
//   'fuchsia',
//   'ghostwhite',
//   'gold',
//   'goldenrod',
//   'gray',
//   'green',
//   'indigo',
//   'ivory',
//   'khaki',
//   'lavender',
//   'lime',
//   'linen',
//   'magenta',
//   'maroon',
//   'moccasin',
//   'navy',
//   'olive',
//   'orange',
//   'orchid',
//   'peru',
//   'pink',
//   'plum',
//   'purple',
//   'red',
//   'salmon',
//   'sienna',
//   'silver',
//   'snow',
//   'tan',
//   'teal',
//   'thistle',
//   'tomato',
//   'turquoise',
//   'violet',
//   'white',
//   'yellow'
// ]

// let recognition = null

// const startSpeech = () => {
//   if (!recognition) {
//     return
//   }
//   recognition.start()
//   console.log('Ready to receive a color command.')
// }

// onMounted(() => {
//   // const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
//   // const SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
//   // const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//   const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
//   const SpeechRecognitionEvent =
//     window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

//   recognition = new SpeechRecognition()

//   if (SpeechGrammarList) {
//     // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
//     // This code is provided as a demonstration of possible capability. You may choose not to use it.
//     var speechRecognitionList = new SpeechGrammarList()
//     var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
//     speechRecognitionList.addFromString(grammar, 1)
//     recognition.grammars = speechRecognitionList
//   }
//   recognition.continuous = false
//   recognition.lang = 'nl-NL'
//   recognition.interimResults = false
//   recognition.maxAlternatives = 1

//   recognition.onresult = function (event) {
//     // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
//     // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
//     // It has a getter so it can be accessed like an array
//     // The first [0] returns the SpeechRecognitionResult at the last position.
//     // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
//     // These also have getters so they can be accessed like arrays.
//     // The second [0] returns the SpeechRecognitionAlternative at position 0.
//     // We then return the transcript property of the SpeechRecognitionAlternative object
//     const color = event.results[0][0].transcript
//     output.value = 'Result received: ' + color + '.'
//   }

//   recognition.onspeechend = function () {
//     recognition.stop()
//   }

//   recognition.onnomatch = function (event) {
//     output.value = "I didn't recognise that color."
//   }

//   recognition.onerror = function (event) {
//     output.value = 'Error occurred in recognition: ' + event.error
//   }
// })
</script>

<template>
  <div>
    <!-- <button @click="startSpeech">startSpeech</button>
    {{ output }} -->
  </div>
</template>
