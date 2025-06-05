<template>
    <div
      class="board-card"
      @dblclick="startEditing"
      @contextmenu.prevent="$emit('delete')"
    >
      <div v-if="isEditing" class="editable-content">
        <div
          class="card-title"
          contenteditable
          ref="titleRef"
          @input="onInput"
        >{{ localTitle }}</div>
        <div
          class="card-description"
          contenteditable
          ref="descRef"
          @input="onInput"
        >{{ localDescription }}</div>
  
        <div class="edit-buttons">
          <button
            class="save-btn"
            :disabled="!hasChanges"
            @click="saveChanges"
          >
            Save Changes
          </button>
          <button class="cancel-btn" @click="cancelEdit">Cancel</button>
        </div>
      </div>
  
      <div v-else>
        <p class="card-title">{{ title }}</p>
        <p class="card-description">{{ description }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue'
  
  const props = defineProps({
    title: String,
    description: String
  })
  const emit = defineEmits(['update', 'delete'])
  
  const isEditing = ref(false)
  const localTitle = ref(props.title)
  const localDescription = ref(props.description)
  
  const titleRef = ref(null)
  const descRef = ref(null)
  
  const hasChanges = computed(() => {
    return localTitle.value !== props.title || localDescription.value !== props.description
  })
  
  function startEditing() {
    isEditing.value = true
  }
  
  function onInput() {
    localTitle.value = titleRef.value?.innerText.trim()
    localDescription.value = descRef.value?.innerText.trim()
  }
  
  function saveChanges() {
    emit('update', {
      title: localTitle.value,
      description: localDescription.value
    })
    isEditing.value = false
  }
  
  function cancelEdit() {
    localTitle.value = props.title
    localDescription.value = props.description
    isEditing.value = false
  }
  </script>
  
  <style scoped>
  .board-card {
    background-color: #f2f3f5;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .board-card:hover {
    background-color: #e9ecef;
  }
  
  .card-title {
    font-weight: 600;
    color: #2d2f33;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
    outline: none;
  }
  
  .card-description {
    font-size: 0.8rem;
    color: #6c757d;
    outline: none;
  }
  
  .edit-buttons {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
  }
  
  .save-btn,
  .cancel-btn {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .save-btn {
    background-color: #0d6efd;
    color: white;
  }
  
  .save-btn:disabled {
    background-color: #a0bffb;
    cursor: not-allowed;
  }
  
  .cancel-btn {
    background-color: #dee2e6;
    color: #333;
  }
  
  .cancel-btn:hover {
    background-color: #cfd4da;
  }
  </style>