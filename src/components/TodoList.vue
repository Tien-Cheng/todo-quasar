<template>
  <q-list bordered separator>
    <q-item-label header>Current Tasks</q-item-label>
    <q-item
      clickable
      v-ripple
      v-for="task in taskStore.remainingTasks"
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
            @click="taskStore.deleteTask(task.id)"
          ></q-btn>
        </div>
      </q-item-section>
    </q-item>
    <q-item-label v-if="taskStore.completedTasks.length > 0" header
      >Completed Tasks</q-item-label
    >
    <q-item
      clickable
      v-ripple
      v-for="task in taskStore.completedTasks"
      :key="task.id"
      class="q-pa-md"
    >
      <q-item-section side>
        <q-checkbox v-model="task.done"></q-checkbox>
      </q-item-section>
      <q-item-section class="text-strike">{{ task.content }}</q-item-section>
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
            @click="taskStore.deleteTask(task.id)"
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
          <q-input
            v-model="currentTask.content"
            label="Task"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          ></q-input>
          <q-btn type="submit" label="Edit Task" color="primary"></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue';
import { Todo } from './models';
import { useTaskStore } from '../stores/taskStore';

export default defineComponent({
  name: 'TodoList',
  props: {
    tasks: {
      type: Array as PropType<Todo[]>,
      default: () => [],
    },
  },
  emits: ['editTask'],
  setup() {
    const taskStore = useTaskStore();
    const edit = ref(false);
    const currentTask = reactive({} as Todo);
    function callEdit(content: string, id: number) {
      currentTask.content = content;
      currentTask.id = id;
      edit.value = true;
    }

    function onEdit() {
      if (currentTask.content) {
        taskStore.editTask(currentTask);
        edit.value = false;
      }
    }
    return {
      taskStore,
      edit,
      currentTask,
      callEdit,
      onEdit,
    };
  },
});
</script>
