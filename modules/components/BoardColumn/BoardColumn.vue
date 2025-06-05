<template>
  <div class="board-column">
    <div class="column-header">
      <div class="column-title" :contenteditable="!column.disabled" @blur="emitTitle"
        @keydown.enter.prevent="emitTitle">
        {{ column.title }} ({{ column.cards.length }})
      </div>
      <div class="column-actions">
        <button @click="$emit('toggle-disable')">
          {{ column.disabled ? 'Enable Editing' : 'Disable Editing' }}
        </button>
        <button @click="$emit('delete-column')">Delete Column</button>
      </div>
    </div>

    <div class="cards">
      <Card v-for="card in sortedCards" :key="card.id" :card="card" :editingEnabled="!column.disabled"
        @update="card => $emit('update-card', { cardId: card.id, ...card })"
        @delete="cardId => $emit('delete-card', cardId)" />
    </div>

    <div class="column-footer">
      <button @click="toggleSort">
        Sort ({{ sortOrder === 'asc' ? '↑' : '↓' }})
      </button>
      <button @click="$emit('clear-cards')">Clear All</button>
      <button class="add-card" @click="$emit('add-card')" :disabled="column.disabled">
        + New Card
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Card from '../Card/Card.vue'

const props = defineProps({
  column: Object
})

const emit = defineEmits([
  'update-column',
  'delete-column',
  'add-card',
  'update-card',
  'delete-card',
  'clear-cards',
  'toggle-disable'
])

const sortOrder = ref('asc')

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const sortedCards = computed(() => {
  return [...props.column.cards].sort((a, b) => {
    const result = a.title.localeCompare(b.title)
    return sortOrder.value === 'asc' ? result : -result
  })
})

const emitTitle = (e) => {
  const fullText = e.target.innerText
  const stripped = fullText.replace(/\(\d+\)$/, '').trim()
  if (stripped && stripped !== props.column.title) {
    emit('update-column', stripped)
  } else {
    e.target.innerText = `${props.column.title} (${props.column.cards.length})`
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
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-title {
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.25rem;
  border-bottom: 1px dashed #ccc;
  outline: none;
  cursor: text;
  flex: 1;
}

.column-actions button {
  margin-left: 0.25rem;
  background: transparent;
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.column-footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.column-footer button {
  padding: 0.4rem;
  border-radius: 4px;
  border: none;
  background-color: #e0e0e0;
  cursor: pointer;
}

.add-card {
  background-color: #cce5ff;
  font-weight: bold;
}
</style>
