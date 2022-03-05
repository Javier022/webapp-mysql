export const validateInput = (title, description, type = "") => {
  let error = {};

  if (!title.trim()) {
    error.title = "title required";
  }

  if (type === "update" && !description.trim()) {
    error.description = "description required";
  } else if (type === "update" && description.length < 2) {
    error.description = "must be greater than 2 characters";
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
