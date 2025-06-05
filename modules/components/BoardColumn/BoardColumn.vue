<template>
  <div class="board-column">
    <div class="column-header">
      <h3>{{ title }}</h3>
      <div class="column-actions">
        <button class="action-btn disable">Disable Editing</button>
        <button class="action-btn delete">Delete Column</button>
      </div>
    </div>

    <Card v-for="(card, index) in cards" :key="index" :title="card.title" :description="card.description"
      @update="(updated) => updateCard(index, updated)" @delete="deleteCard(index)" />

    <button class="new-card-btn">+ New Card</button>
    <div class="footer-actions">
      <button class="sort-btn">Sort</button>
      <button class="clear-btn">Clear All</button>
    </div>
    <p class="timestamp">Last edit 5 min ago</p>
  </div>
</template>

<script setup>
import Card from '../Card/Card.vue';

defineProps({
  title: String,
  cards: Array
})
</script>

<style scoped>
.board-column {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  width: 300px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.column-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #2d2f33;
}

.column-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
}

.action-btn.disable {
  background-color: #f4d35e;
  color: #333;
}

.action-btn.delete {
  background-color: #e63946;
  color: white;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.card {
  background-color: #f2f3f5;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.9rem;
  line-height: 1.3;
  cursor: pointer;
  border: 1px solid #e0e0e0;
}

.card-title {
  font-weight: 600;
  color: #2d2f33;
}

.card-description {
  color: #6c757d;
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

.new-card-btn {
  background: #dee2e6;
  border: none;
  border-radius: 8px;
  padding: 0.6rem;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: background 0.2s;
}

.new-card-btn:hover {
  background-color: #cfd4da;
}

.footer-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.sort-btn,
.clear-btn {
  font-size: 0.75rem;
  border: none;
  background: none;
  color: #6c757d;
  cursor: pointer;
}

.timestamp {
  font-size: 0.7rem;
  color: #adb5bd;
  text-align: center;
}
</style>