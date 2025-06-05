<template>
  <div class="board-column">
    <div class="column-header">
      <div class="column-title" contenteditable="true" :contenteditable="editingEnabled" @blur="emitTitle"
        @keydown.enter.prevent="emitTitle">
        {{ column.title }}
      </div>
      <div class="column-actions">
        <button @click="$emit('delete-column')">Delete Column</button>
      </div>
    </div>

    <div class="cards">
      <Card v-for="card in column.cards" :key="card.id" :card="card" :editingEnabled="editingEnabled"
        @update="card => $emit('update-card', { cardId: card.id, ...card })"
        @delete="cardId => $emit('delete-card', cardId)" />
    </div>

    <button class="add-card" @click="$emit('add-card')">New Card</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '../Card/Card.vue'

const props = defineProps({
  column: Object,
  editingEnabled: Boolean
})

const emit = defineEmits([
  'update-column',
  'delete-column',
  'add-card',
  'update-card',
  'delete-card'
])

const emitTitle = (e) => {
  const title = e.target.innerText.trim()
  if (title && title !== props.column.title) {
    emit('update-column', title)
  } else {
    e.target.innerText = props.column.title
  }
}
</script>

<style scoped>
.board-column {
  background: #f4f4f4;
  padding: 1rem;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.column-title {
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.25rem;
  border-bottom: 1px dashed #ccc;
  outline: none;
  cursor: text;
}

.column-actions button {
  background: transparent;
  border: none;
  color: red;
  cursor: pointer;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.add-card {
  margin-top: 1rem;
  background-color: #e0e0e0;
  border: none;
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;
  border-radius: 4px;
}
</style>
