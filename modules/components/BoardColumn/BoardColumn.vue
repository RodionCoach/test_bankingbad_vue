<template>
  <div class="board-column">
    <div class="column-header">
      <div class="column-title" :contenteditable="editable" @blur="$emit('update-column-title', $event)"
        @keydown.enter.prevent="$emit('update-column-title', $event)">
        {{ title }}
      </div>
      <span class="count">{{ cards.length }}</span>
      <div class="column-controls">
        <ActionButton :label="editable ? 'Disable Editing' : 'Unlock Column'" :color="editable ? 'green' : 'orange'"
          @click="$emit('toggle-editing')" />
        <ActionButton label="Delete Column" color="black" @click="$emit('delete-column')" />
      </div>
    </div>

    <div class="cards">
      <Card v-for="card in cards" :key="card.id" :card="card" :editable="editable"
        @update="$emit('update-card', $event)" @delete="$emit('delete-card', $event)" />
    </div>

    <div v-if="editable" class="new-card">
      <ActionButton class="new-card-button" label="+New Card" color="blue" @click="$emit('add-card')" />
    </div>

    <div class="column-footer">
      <ActionButton :disabled="cards.length < 2 || !editable"
        :label="`Sort ${sortOrder === SORT_ASC_KEY ? 'Descending ↓' : 'Ascending ↑'}`"
        @click="$emit('sort-cards', !(sortOrder === SORT_ASC_KEY))" />
      <ActionButton :disabled="!editable" label="Clear All" color="red" @click="$emit('clear-cards')" />
    </div>
  </div>
</template>

<script setup>
import Card from '../Card/Card.vue';
import ActionButton from '../../../components/actionButton/ActionButton.vue';
import { SORT_ASC_KEY } from '../../utils/constants';

defineProps({
  title: String,
  cards: Array,
  editable: Boolean,
  sortOrder: String,
});

defineEmits([
  'add-card',
  'update-card',
  'delete-card',
  'update-column-title',
  'delete-column',
  'sort-cards',
  'clear-cards',
  'toggle-editing',
]);
</script>

<style scoped>
.board-column {
  background: #f4f4f5;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 400px;
}

.column-header {
  display: flex;
  flex-wrap: wrap;
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

.count {
  background: #e4e4e7;
  padding: 0.1rem 0.4rem;
  border-radius: 50%;
  font-size: 0.75rem;
}

.column-controls {
  display: flex;
  margin: 0.5rem;
  gap: 0.5rem;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.column-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid #d4d4d8;
}

.new-card {
  display: flex;
}

.new-card-button {
  flex: 1;
}
</style>