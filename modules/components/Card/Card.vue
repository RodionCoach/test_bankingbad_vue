<template>
  <div class="card" @dblclick="editMode = editingEnabled">
    <template v-if="editMode && editingEnabled">
      <input v-model="tempTitle" class="card-title-edit" placeholder="Title" />
      <textarea v-model="tempDesc" class="card-desc-edit" placeholder="Description"></textarea>

      <div class="card-actions">
        <button :disabled="!hasChanges" @click="saveChanges">Save Changes</button>
        <button @click="cancelEdit">Cancel</button>
        <button class="danger" @click="removeCard">Remove</button>
      </div>
    </template>

    <template v-else>
      <div class="card-header">
        <h4 class="card-title">{{ card.title || '(No title)' }}</h4>
        <button class="remove-btn" @click="removeCard">✕</button>
      </div>
      <p class="card-desc">{{ card.description || '(No description)' }}</p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  card: Object,
  editingEnabled: Boolean
})

const emit = defineEmits(['update', 'delete'])

const editMode = ref(false)
const tempTitle = ref(props.card.title)
const tempDesc = ref(props.card.description)

const hasChanges = computed(() =>
  tempTitle.value !== props.card.title ||
  tempDesc.value !== props.card.description
)

const saveChanges = () => {
  emit('update', {
    title: tempTitle.value,
    description: tempDesc.value,
    cardId: props.card.id
  })
  editMode.value = false
}

const cancelEdit = () => {
  tempTitle.value = props.card.title
  tempDesc.value = props.card.description
  editMode.value = false
}

const removeCard = () => {
  emit('delete', props.card.id)
}

watch(() => props.card, (newCard) => {
  tempTitle.value = newCard.title
  tempDesc.value = newCard.description
})
</script>

<style scoped>
.card {
  background: white;
  padding: 0.75rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-weight: bold;
  margin: 0;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  color: #b00;
  cursor: pointer;
}

.card-desc {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.card-title-edit,
.card-desc-edit {
  width: 100%;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 4px;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.danger {
  background-color: #ffdddd;
  border: 1px solid #cc0000;
  color: #b00;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
}
</style>
