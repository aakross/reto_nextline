<template>
  <v-container>
    <h1 class="display-1 mb-5">Tareas</h1>
    <v-list>
      <v-list-item v-for="task in tasks" :key="task.id">
        <v-list-item-title>{{ task.title }}</v-list-item-title>
        <v-spacer></v-spacer>
        <v-btn @click="editTaskModal(task)" color="primary" class="mr-2">Editar</v-btn>
        <v-btn @click="deleteTask(task.id)" color="success">Terminar</v-btn>
      </v-list-item>
    </v-list>

    <v-dialog v-model="editModal" max-width="500px">
      <!-- <template v-slot:activator="{ on }"></template> -->
      <v-card>
        <v-card-title>Editar Tarea</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedTask.title" label="Título"></v-text-field>
          <v-text-field v-model="editedTask.comments" label="Comentarios"></v-text-field>
          <v-text-field v-model="editedTask.description" label="Descripción"></v-text-field>
          <v-text-field v-model="editedTask.tags" label="Tags"></v-text-field>
          <v-text-field v-model="editedTask.due_date" label="Fecha de Vencimiento" type="date"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveEditedTask">Guardar</v-btn>
          <v-btn color="error" @click="editModal = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tasks: [], // Aquí almacenaremos las tareas obtenidas del endpoint
      editModal: false,
      editedTask: {
        id: null,
        title: '',
        is_completed: false,
        due_date: '',
        comments: '',
        description: '',
        tags: ''
      }
    };
  },
  async mounted() {
    // Llamada a la API 
    await this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await fetch('https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks', {
          headers: {
            'Authorization': 'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'
          }
        });
        const data = await response.json();
        // Almacenamos las tareas en el estado del componente
        this.tasks = data;
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    },
    async editTask(task) {
      try {
        const response = await fetch(`https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${task.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            token: '',
            title: task.title,
            is_completed: task.is_completed,
            due_date: task.due_date,
            comments: task.comments,
            description: task.description,
            tags: task.tags
          })
        });
        const data = await response.json();
        console.log('Tarea editada:', data);
        // Actualizar la tarea editada en el estado
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks.splice(index, 1, data);
        }
      } catch (error) {
        console.error('Error al editar la tarea:', error);
      }
    },
    editTaskModal(task) {
      this.editedTask = { ...task };
      this.editModal = true;
    },
    async saveEditedTask() {
      await this.editTask(this.editedTask);
      this.editModal = false;
    },
    async deleteTask(taskId) {
      try {
        await fetch(`https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'
          }
        });
        // Eliminar la tarea de la lista
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        console.log('Tarea eliminada:', taskId);
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
      }
    }
  }
};
</script>

<style>
.v-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>