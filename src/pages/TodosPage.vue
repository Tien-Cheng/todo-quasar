<style></style>
<template>
  <q-page padding>
    <!-- content -->
    <h3 class="tw-underline">Your Todos</h3>
    <q-form @submit="onSubmit" ref="form">
      <div class="row">
        <div class="col">
          <q-input
            class="col"
            filled
            v-model="task"
            label="Task"
            hint="Task"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </div>
        <div class="col q-pa-sm">
          <q-btn round type="submit" color="primary" icon="add"></q-btn>
        </div>
      </div>
    </q-form>
    <todo-list
      :tasks="tasks"
      class="q-mt-md"
      @delete-task="deleteTask"
      @edit-task="editTask"
    ></todo-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, Ref } from 'vue';
import { Todo } from 'src/components/models';
import TodoList from 'src/components/TodoList.vue';
import { QForm } from 'quasar';

export default defineComponent({
  // name: 'PageName'
  components: {
    TodoList,
  },
  setup() {
    let id = 0;
    const task: Ref<string | null >= ref(null);
    const tasks: Todo[] = reactive([]);
    const form = ref<QForm>();

    return {
      task,
      tasks,
      form,
      onSubmit() {
        if (task.value) {
          tasks.push({
            id: id++,
            content: task.value,
          });
          task.value = null;
          form.value?.resetValidation();
        }
      },
      deleteTask(id: number) {
        tasks.splice(tasks.findIndex(
          (todo) => todo.id === id
        ), 1)
      },
      editTask(task: Todo) {
        let idx = tasks.findIndex(
          (t) => t.id === task.id
        )
        tasks[idx].content = task.content
      }
    };
  },
});
</script>
