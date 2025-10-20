<script setup lang="ts">
import { ref } from 'vue'

//data
const name = ref('Rachel')
const href = ref('https://www.scrimba.com')
const disabled = ref(true)
const attributes = {
  id: 'big_emoji',
  class: 'waving',
}
const coding_years = ref(5)
const getFormattedDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-UK', options)
}
const username = ref('rachelktyjohnson')
const event = ref('click')
const blockLeave = () => {
  alert("You can't leave!")
}
</script>

<template>
  <span v-bind="attributes">👋🏻</span>
  <a-button type="primary">Antd button</a-button>
  <h1>
    Hi, my name is
    <!--
    CHALLENGE: Using the v-on directive, make it so that when our name is clicked, the blockLeave() function is called
    SYNTAX: v-on:[event]="call the function"
    -->
    <a v-bind:href="href + '/@' + username" target="_blank" v-on:click.prevent="blockLeave()">{{ name }}</a>
  </h1>
  <a :href target="_blank">
    <a-button :disabled>Click to visit my favourite website! If you can...</a-button>
  </a>
  <h2 v-on:[event]="coding_years++">
    {{ coding_years > 0 ? `I have been coding for ${coding_years} years` : 'I am a newbie!' }}
  </h2>
  <h3>Today is {{ getFormattedDate(new Date()) }}</h3>
</template>
