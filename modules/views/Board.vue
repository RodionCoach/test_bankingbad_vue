<template>
  <div class="board">
    <div class="columns">
      <BoardColumn v-for="column in columns" :key="column.id" :cards="column.cards || []" :title="column.title"
        :editable="!globalEditingDisabled && !column.editingDisabled" :sortOrder="column.sortOrder"
        @add-card="() => addCard(column.id)" @update-card="updateData => updateCard(column.id, updateData)"
        @delete-card="cardId => deleteCard(column.id, cardId)"
        @update-column-title="(e) => updateColumnTitle(column.id, e)" @delete-column="() => deleteColumn(column.id)"
        @sort-cards="order => sortCards(column.id, order)" @clear-cards="() => clearCards(column.id)"
        @toggle-editing="() => toggleColumnEditing(column.id)" />
    </div>

    <div class="board-actions">
      <ActionButton @click="addColumn" label="New Column" color="blue" />
      <ActionButton @click="shuffleColumns" label="Shuffle Columns" color="purple" />
      <ActionButton @click="shuffleCards" label="Shuffle Cards" color="blueViolet" />
      <ActionButton @click="toggleGlobalEditing" :label="globalEditingDisabled ? 'Enable Editing' : 'Disable Editing'"
        :color="globalEditingDisabled ? 'green' : 'orange'" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import BoardColumn from '../components/BoardColumn/BoardColumn.vue';
import ActionButton from '../../components/actionButton/ActionButton.vue';
import findColumnById from '../utils/findColumnById';
import { initialState, STORAGE_KEY, SORT_ASC_KEY, SORT_DESC_KEY } from '../utils/constants';

const loadState = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedSaveData = JSON.parse(savedData);
  if (parsedSaveData && Array.isArray(parsedSaveData)) {
    return parsedSaveData;
  }
  return initialState
};

const columns = reactive(loadState());
const globalEditingDisabled = ref(false);

watch(columns, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
}, { deep: true });

const addColumn = () => {
  columns.push({
    id: Date.now(),
    title: 'New Column',
    editingDisabled: false,
    cards: [],
  });
};

const updateColumnTitle = (columnId, e) => {
  const column = findColumnById(columns, columnId);
  const innerText = e.target.innerText
  if (column && innerText) column.title = innerText;
}

const deleteColumn = (columnId) => {
  const idx = columns.findColumnById(col => col.id === columnId);
  if (idx !== -1) columns.splice(idx, 1);
};

const addCard = (columnId) => {
  const column = findColumnById(columns, columnId);
  if (column) {
    column.cards.push({
      id: Date.now(),
      title: '',
      description: '',
    });
  }
};

const updateCard = (columnId, { cardId, title, description }) => {
  const column = findColumnById(columns, columnId)
  if (!column) return
  const card = column.cards.find(c => c.id === cardId)
  if (card) {
    card.title = title
    card.description = description
  }
}

const deleteCard = (columnId, cardId) => {
  const column = findColumnById(columns, columnId);
  if (column) {
    column.cards = column.cards.filter(card => card.id !== cardId);
  }
};

const sortCards = (columnId, ascending) => {
  const column = findColumnById(columns, columnId);
  if (column) {
    column.sortOrder = ascending ? SORT_ASC_KEY : SORT_DESC_KEY;
    column.cards.sort((a, b) => a.title.localeCompare(b.title) * (ascending ? 1 : -1));
  }
};

const clearCards = (columnId) => {
  const column = findColumnById(columns, columnId);
  if (column) column.cards = [];
};

const toggleColumnEditing = (columnId) => {
  const column = findColumnById(columns, columnId);
  if (column) column.editingDisabled = !column.editingDisabled;
};

const toggleGlobalEditing = () => {
  globalEditingDisabled.value = !globalEditingDisabled.value;
};

const shuffleColumns = () => {
  columns.sort(() => Math.random() - 0.5);
};

const shuffleCards = () => {
  columns.forEach(col => {
    col.cards.sort(() => Math.random() - 0.5);
    col.sortOrder = "";
  });
};
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 2rem;
  gap: 1rem;
}

.columns {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  flex: 1 1 400px;
  overflow-x: auto;
}

.board-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid #ccc;
}
</style>
