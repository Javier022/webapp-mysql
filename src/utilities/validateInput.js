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

export const hasError = (
  value,
  message,
  type = "",
  message2 = "",
  characters = 6
) => {
  let error = {};

  if (!value.trim()) {
    error.field = message;
  } else if (
    (type === "login" || type === "register") &&
    value.length < characters
  ) {
    error.field = message2;
  }
  return error;
};
