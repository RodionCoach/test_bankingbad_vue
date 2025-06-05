<template>
  <div class="board">
    <BoardColumn title="TODO" :cards="[]" />
    <BoardColumn title="In progress" :cards="[]" />
    <BoardColumn title="Done" :cards="[]" />
  </div>
</template>

<script setup>
import BoardColumn from '../components/BoardColumn/BoardColumn.vue'
</script>

<style scoped>
.board {
  display: flex;
  gap: 1.5rem;
  justify-content: start;
  align-items: flex-start;
  overflow-x: auto;
  padding-bottom: 2rem;
}
</style>