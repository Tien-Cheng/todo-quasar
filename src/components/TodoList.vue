<template>
  <div>My component</div>
  <ol v-for="task in tasks" :key="task.id">
    <li>{{ task.id }}. {{ task.content }}</li>
  </ol>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Todo } from './models';
export default defineComponent({
  name: 'TodoList',
  props: {
    tasks: {
      type: Array as PropType<Todo[]>,
      default: () => []
    }
  }
})
</script>
