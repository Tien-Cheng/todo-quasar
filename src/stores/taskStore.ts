import { defineStore } from 'pinia';
import { Todo } from 'src/components/models';
import { computed, reactive, Ref, ref } from 'vue';

export const useTaskStore = defineStore('tasks', () => {
  // Define state
  const tasks: Todo[] = reactive([]);
  const id: Ref<number> = ref(0);


  // Define computed properties
  const completedTasks = computed(() => tasks.filter((t) => t.done));
  const remainingTasks = computed(() => tasks.filter((t) => !t.done));


  // Define actions
  function addTask(content: string): void {
    tasks.push({
      id: id.value++,
      content: content,
      done: false
    })
  }

  function editTask(task: Todo): void {
    const idx = tasks.findIndex((t) => t.id === task.id);
    if (idx !== -1) { // if todo is present
      tasks[idx].content = task.content
    }
  }

  function deleteTask(id: number) {
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx !== -1) {
      tasks.splice(idx, 1);
    }
  }

  return {
    tasks,
    completedTasks,
    remainingTasks,
    addTask,
    editTask,
    deleteTask
  }
})

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2;
    }
  },

  actions: {
    increment () {
      this.counter++;
    }
  }
});
