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

    if (result.success) {
      delete tasks[id];

      setTasks({ ...tasks });
      notify("success", "task eliminada");
    }
  } catch (error) {
    notify("error", error.message);
  }
};
