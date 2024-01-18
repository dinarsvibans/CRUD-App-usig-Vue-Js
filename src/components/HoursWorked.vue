<template>
  <div>
    <span>{{ result }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['fixedTime'])

const hours = computed(() => Math.floor(props.fixedTime / (1000 * 60 * 60)))
const remainingMilliseconds = computed(() => props.fixedTime % (1000 * 60 * 60))
const minutes = computed(() => Math.floor(remainingMilliseconds.value / (1000 * 60)))
const result = computed(() => `${hours.value} hours and ${minutes.value} minutes`)
</script>
