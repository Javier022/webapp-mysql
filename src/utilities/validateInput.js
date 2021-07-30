export const validateInput = (title, description, type = "") => {
  let error = {};

  if (!title.trim()) {
    error.title = "título requerido";
  }

  if (type === "update" && !description.trim()) {
    error.description = "descripción requerida";
  } else if (type === "update" && description.length < 2) {
    error.description = "debe ser mayor a 2 caracteres";
  }

  return error;
};
