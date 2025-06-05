<template>
  <div class="app">
    <Board title="TODO" cards="[]" />
  </div>
</template>

<script setup>
import Board from './modules/views/Board.vue'
</script>

<style>
.app {
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fb;
  min-height: 100vh;
}
</style>