<template>
    <button class="action-button" :style="{
        backgroundColor: colorMap[color] || colorMap.gray,
    }">
        {{ label }}
        <slot />
    </button>
</template>

<script setup>
defineProps({
    label: String,
    color: {
        type: String,
        default: 'gray'
    }
});

const colorMap = {
    blue: '#3b82f6',
    red: '#ef4444',
    green: '#22c55e',
    orange: '#f97316',
    black: '#18181b',
    gray: '#6b7280',
    purple: '#800080',
    blueViolet: '#8a2be2'
};

</script>

<style scoped>
.action-button {
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.3rem 0.7rem;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease;
    white-space: nowrap;
    color: white;
}

.action-button:hover {
    opacity: 0.8;
}

.action-button:disabled {
    opacity: 0.5;
    cursor: initial;
}
</style>