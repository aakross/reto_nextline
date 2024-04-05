<template>
  <v-container class="mt-10">
    <v-card class="mx-auto" max-width="500">
      <v-card-title class="text-center">Crear Nueva Tarea</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="createTask">
          <v-text-field v-model="newTask.title" label="Título" required></v-text-field>
          <v-select v-model="newTask.is_completed" :items="[0, 1]" label="¿Completada?"></v-select>
          <v-text-field v-model="newTask.due_date" label="Fecha de Vencimiento" type="date" required></v-text-field>
          <v-textarea v-model="newTask.comments" label="Comentarios" rows="3"></v-textarea>
          <v-textarea v-model="newTask.description" label="Descripción" rows="5"></v-textarea>
          <v-text-field v-model="newTask.tags" label="Etiquetas"></v-text-field>
          <v-btn color="primary" type="submit">Crear Tarea</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newTask: {
        title: '',
        is_completed: 0,
        due_date: '',
        comments: '',
        description: '',
        tags: ''
      }
    };
  },
  methods: {
    async createTask() {
      try {
        const response = await fetch('https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: this.newTask.title,
            is_completed: this.newTask.is_completed,
            due_date: this.newTask.due_date,
            comments: this.newTask.comments,
            description: this.newTask.description,
            tags: this.newTask.tags
          })
        });
        const data = await response.json();
        console.log('Tarea creada:', data);
        // Limpiar el formulario después de crear la tarea
        this.newTask.title = '';
        this.newTask.is_completed = 0;
        this.newTask.due_date = '';
        this.newTask.comments = '';
        this.newTask.description = '';
        this.newTask.tags = '';
      } catch (error) {
        console.error('Error al crear la tarea:', error);
      }
    }
  }
};
</script>
