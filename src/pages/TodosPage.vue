<style></style>
<template>
  <q-page padding>
    <!-- content -->
    <h3 class="tw-underline">Your Todos</h3>
    <q-form @submit="onSubmit" ref="form" class="q-mb-md">
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
    <todo-list class="q-mt-md"></todo-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import TodoList from 'src/components/TodoList.vue';
import { LocalStorage, QForm } from 'quasar';
import { useTaskStore } from 'src/stores/taskStore';

export default defineComponent({
  // name: 'PageName'
  components: {
    TodoList,
  },
  setup() {
    const taskStore = useTaskStore();
    taskStore.$subscribe(
      () => {
        LocalStorage.set('tasks', taskStore.tasks);
      },
      {
        detached: true,
      }
    );
    const task: Ref<string | null> = ref(null);
    const form = ref<QForm>();

    function onSubmit(): void {
      if (task.value) {
        taskStore.addTask(task.value);
        task.value = null;
        form.value?.resetValidation();
      }
    }

    return {
      taskStore,
      task,
      form,
      onSubmit,
    };
  },
});
</script>
