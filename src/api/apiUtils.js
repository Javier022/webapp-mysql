export const deleteTask = async (
  e,
  tasks,
  setTasks,
  deleteTaskById,
  notify
) => {
  const id = e.target.dataset.id;

  try {
    const result = await deleteTaskById(id);

    if (result.succes) {
      delete tasks[id];

      setTasks({ ...tasks });
      notify("info", "task eliminada");
    } else notify("error", "error al eliminar la tarea");
  } catch (error) {
    throw new Error(error);
  }
};
