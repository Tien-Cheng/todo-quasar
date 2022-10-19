<template>
  <q-list bordered separator>
    <q-item-label header>Current Tasks</q-item-label>
    <q-item
      clickable
      v-ripple
      v-for="task in remainingTasks"
      :key="task.id"
      class="q-pa-md"
    >
      <q-item-section side>
        <q-checkbox v-model="task.done"></q-checkbox>
      </q-item-section>
      <q-item-section>{{ task.content }}</q-item-section>
      <q-item-section side>
        <div class="q-gutter-sm">
          <q-btn
            round
            icon="edit"
            @click="callEdit(task.content, task.id)"
          ></q-btn>
          <q-btn
            round
            color="negative"
            icon="delete"
            @click="$emit('deleteTask', task.id)"
          ></q-btn>
        </div>
      </q-item-section>
    </q-item>
    <q-item-label v-if="completedTasks.length > 0" header>Completed Tasks</q-item-label>
    <q-item
      clickable
      v-ripple
      v-for="task in completedTasks"
      :key="task.id"
      class="q-pa-md"
    >
      <q-item-section side>
        <q-checkbox v-model="task.done"></q-checkbox>
      </q-item-section>
      <q-item-section>{{ task.content }}</q-item-section>
      <q-item-section side>
        <div class="q-gutter-sm">
          <q-btn
            round
            icon="edit"
            @click="callEdit(task.content, task.id)"
          ></q-btn>
          <q-btn
            round
            color="negative"
            icon="delete"
            @click="$emit('deleteTask', task.id)"
          ></q-btn>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
  <q-dialog v-model="edit">
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit Task</div>
        <q-form @submit="onEdit">
          <q-input v-model="currentTask.content" label="Task"></q-input>
          <q-btn
            type="submit"
            label="Edit Task"
            color="primary"
            v-close-popup
          ></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, reactive, ref } from 'vue';
import { Todo } from './models';

export default defineComponent({
  name: 'TodoList',
  props: {
    tasks: {
      type: Array as PropType<Todo[]>,
      default: () => [],
    },
  },
  emits: ['editTask'],
  setup(props, ctx) {
    const edit = ref(false);
    const currentTask = reactive({} as Todo);
    const completedTasks = computed(() => {
      return props.tasks.filter((t) => t.done);
    });
    const remainingTasks = computed(() => {
      return props.tasks.filter((t) => !t.done);
    });
    function callEdit(content: string, id: number) {
      currentTask.content = content;
      currentTask.id = id;
      edit.value = true;
    }

    function onEdit() {
      if (currentTask.content) {
        ctx.emit('editTask', currentTask);
      }
    }
    return {
      remainingTasks,
      completedTasks,
      edit,
      currentTask,
      callEdit,
      onEdit,
    };
  },
});
</script>
