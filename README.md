# retofront_Nextline

Este componente muestra una lista de tareas y permite editar, actualizar y eliminar cada tarea.

## Propiedades

- `tasks` (Array): Arreglo que almacena las tareas obtenidas del servidor.
- `editModal` (Boolean): Variable que controla la visibilidad del modal de edición de tarea.
- `editedTask` (Object): Objeto que contiene los datos de la tarea que se está editando.

## Métodos

- `fetchTasks()`: Método que obtiene las tareas del servidor mediante una solicitud HTTP.
- `editTaskModal(task)`: Método que se llama cuando se hace clic en el botón de editar de una tarea. Establece la tarea seleccionada en `editedTask` y muestra el modal de edición.
- `editTask(task)`: Método que se llama para editar una tarea en el servidor. Hace una solicitud PUT con los datos actualizados de la tarea.
- `saveEditedTask()`: Método que se llama cuando se guarda la edición de una tarea. Llama a `editTask` y luego oculta el modal de edición.
- `deleteTask(taskId)`: Método que se llama para eliminar una tarea en el servidor. Hace una solicitud DELETE y actualiza la lista de tareas en el estado del componente.

## Uso

```vue
<template>
  <!-- Contenido del componente -->
</template>

<script>
export default {
  // Definición del componente
}
</script>

<style>
/* Estilos del componente */
</style>
