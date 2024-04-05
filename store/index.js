export const state = () => ({
    tasks: [],
});

export const mutations = {
    setTasks(state, tasks) {
        state.tasks = tasks;
    },
    updateTask(state, updatedTask) {
        const index = state.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
            state.tasks.splice(index, 1, updatedTask);
        }
    },
    deleteTask(state, taskId) {
        state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
};

export const actions = {
    async fetchTasks({ commit }) {
        // Llamada a la API
        try {
            const response = await fetch('https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks', {
                headers: {
                    'Authorization': 'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'
                }
            });
            const data = await response.json();
            commit('setTasks', data);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    },
    async editTask({ commit }, task) {
        // Llamada a la API para editar la tarea
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
            commit('updateTask', data);
        } catch (error) {
            console.error('Error al editar la tarea:', error);
        }
    },
    async deleteTask({ commit }, taskId) {
        // Llamada a la API para eliminar la tarea
        try {
            await fetch(`https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'
                }
            });
            commit('deleteTask', taskId);
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    },
};