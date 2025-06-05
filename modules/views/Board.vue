<template>
  <div class="board">
    <div class="board-actions">
      <button @click="addColumn">New Column</button>
      <button @click="shuffleColumns">Shuffle Columns</button>
      <button @click="shuffleCards">Shuffle Cards</button>
      <button @click="toggleEditing">{{ editingEnabled ? 'Disable' : 'Enable' }} Editing</button>
    </div>

    <div class="columns">
      <BoardColumn v-for="col in columns" :key="col.id" :column="col" :editingEnabled="editingEnabled"
        @update-column="updateColumn(col.id, $event)" @delete-column="deleteColumn(col.id)" @add-card="addCard(col.id)"
        @update-card="updateCard(col.id, $event)" @delete-card="deleteCard(col.id, $event)" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import BoardColumn from '../components/BoardColumn/BoardColumn.vue'

const STORAGE_KEY = 'kanban-columns'

function generateId() {
  return crypto.randomUUID()
}

const getInitialData = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return JSON.parse(saved)

  return [
    {
      id: generateId(),
      title: 'TODO',
      cards: [
        { id: generateId(), title: 'Add login form', description: 'Design and build UI' },
        { id: generateId(), title: 'Fix bug', description: 'Auth flow issue' }
      ]
    },
    {
      id: generateId(),
      title: 'In Progress',
      cards: [
        { id: generateId(), title: 'Build card UI', description: 'Make component editable' }
      ]
    },
    {
      id: generateId(),
      title: 'Done',
      cards: [
        { id: generateId(), title: 'Setup project', description: 'Create base structure' }
      ]
    }
  ]
}

const columns = reactive(getInitialData())
const editingEnabled = ref(true)

watch(columns, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(columns))
}, { deep: true })

function addColumn() {
  columns.push({ id: generateId(), title: 'New Column', cards: [] })
}

function updateColumn(columnId, newTitle) {
  const column = columns.find(c => c.id === columnId)
  if (column) column.title = newTitle
}

function deleteColumn(columnId) {
  const index = columns.findIndex(c => c.id === columnId)
  if (index !== -1) columns.splice(index, 1)
}

function addCard(columnId) {
  const column = columns.find(c => c.id === columnId)
  if (column) {
    column.cards.push({ id: generateId(), title: '', description: '' })
  }
}

function updateCard(columnId, { cardId, title, description }) {
  const column = columns.find(c => c.id === columnId)
  if (!column) return
  const card = column.cards.find(c => c.id === cardId)
  if (card) {
    card.title = title
    card.description = description
  }
}

function deleteCard(columnId, cardId) {
  const column = columns.find(c => c.id === columnId)
  if (column) {
    column.cards = column.cards.filter(c => c.id !== cardId)
  }
}

function toggleEditing() {
  editingEnabled.value = !editingEnabled.value
}

function shuffleColumns() {
  columns.sort(() => Math.random() - 0.5)
}

function shuffleCards() {
  columns.forEach(col => {
    col.cards.sort(() => Math.random() - 0.5)
  })
}
</script>

<style scoped>
.board {
  padding: 1rem;
}

.board-actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.columns {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
</style>
