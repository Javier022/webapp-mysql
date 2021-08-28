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

export const hasError = (value, message, type = "", message2 = "") => {
  let error = {};

  if (!value.trim()) {
    error.field = message;
  } else if (type === "login" && value.length < 6) {
    error.field = message2;
  }

  return error;
};
