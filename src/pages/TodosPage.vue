<template>
  <q-page padding>
    <!-- content -->
    <h3>Your Todos</h3>
    <q-form
      @submit="onSubmit"
    >
      <q-input filled v-model="task" label="Task" hint="Task" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"/>
      <q-btn label="Submit" type="submit" color="primary"></q-btn>
    </q-form>
    <todo-list :tasks="tasks"
    ></todo-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { Todo } from 'src/components/models';
import TodoList from 'src/components/TodoList.vue';
export default defineComponent({
  // name: 'PageName'
  components: {
    TodoList
  },
  setup () {
    let id = 1;
    const task = ref(null)
    const tasks: Todo[] = reactive([]);

    return {
      task,
      tasks,
      onSubmit() {
        if (task.value) {
          tasks.push({
            id: ++id,
            content: task.value
          });
        }
      }
    }
  }
})
</script>
