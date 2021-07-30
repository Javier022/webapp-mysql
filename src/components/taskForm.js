import React, { useContext, useState, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DataContext } from "../context/dataContext";
import { validateInput } from "../utilities/validateInput";
import { notify } from "../utilities/toast";
import { api } from "../constants/api";
import Button from "./Utils/button";
import Input from "./Utils/input";
import Spinner from "../components/Utils/spinner/index";

const TaskForm = ({ type, name, message }) => {
  const [error, setError] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState(false);

  let refButton = useRef(null);

  const { tasks, createNewTask, updateTask } = useContext(DataContext);
  const history = useHistory();
  const { id } = useParams();

  console.log(tasks, "All tasks");

  const sendData = async (e) => {
    e.preventDefault();

    const errors = validateInput(title, description, type);

    if (Object.keys(errors).length !== 0) {
      return setError(errors);
    }

    const task = {
      title: title,
      description: description,
    };

    if (type === "create") {
      setLoad(true);
      refButton.current.disabled = true;
      const response = await createNewTask(task);

      if (response.succes) {
        setLoad(false);
        notify("success", message);
        return history.push("/");
      }
    }

    if (type === "update") {
      setLoad(true);
      const response = await updateTask(id, task);
      if (response.succes) {
        setLoad(false);
        notify("success", message);
        return history.push("/");
      }
    }
  };

  useEffect(() => {
    console.log("useeffect Form");
    if (Object.values(tasks).length !== 0 && type === "update") {
      const task = tasks[id];
      setTitle(task.title);
      setDescription(task.description);
    } else if (Object.values(tasks).length === 0) {
      // ir a traer la data de nuevo pero tocaria volver a parsearla
      //de alguna manera guardarla con react usando hooks como memo o use call
      // con caché tendría que investigar
      // o con LocalStorage
      console.log("again getData :(");
    }
  }, [id, tasks, type]);

  return (
    <>
      <div className="mt-8 w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          action={`${api}/tasks`}
          method="POST"
          onSubmit={(e) => sendData(e)}
        >
          <div className="mb-4">
            <Input
              label="título"
              placeHolder="title"
              handleChange={(e) => setTitle(e.target.value)}
              error={error.title}
              value={title}
              focus={true}
            />
          </div>
          <div className="mb-6">
            <Input
              label="descripción"
              placeHolder="decription"
              handleChange={(e) => setDescription(e.target.value)}
              error={type === "update" ? error.description : ""}
              value={description}
            />
          </div>
          <div className="flex justify-center">
            <Button refButton={refButton} name={name} />
          </div>
        </form>
      </div>
      {load && <Spinner />}
    </>
  );
};

export default TaskForm;
