export const deleteTask = async (
  e,
  tasks,
  setTasks,
  deleteTaskById,
  token,
  notify
) => {
  const id = e.target.dataset.id;

  try {
    const result = await deleteTaskById(id, token);

    if (result.success) {
      delete tasks[id];

      setTasks({ ...tasks });
      notify("info", "task eliminada");
    } else notify("error", "error al eliminar la tarea");
  } catch (error) {
    throw new Error(error);
  }
};
