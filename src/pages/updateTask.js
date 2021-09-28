import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { DataContext } from "../context/dataContext";

// componets
import Layout from "../components/layout";
import Form from "../components/form";
import Input from "../components/Utils/input";
import Button from "../components/Utils/button";
import Screen from "../components/Utils/screen";
import Spinner from "../components/Utils/spinner";

// utils
import { objectHasValues } from "../utilities/objectHasValues";
import { validateInput } from "../utilities/validateInput";
import { notify } from "../utilities/toast";

const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({});

  const { updateTask, loading, setLoading, tasks } = useContext(DataContext);

  // router
  const history = useHistory();
  const { id } = useParams();

  const action = {
    type: "update",
    name: "update Task",
    message: "task actualizada",
  };

  const sendData = async (e) => {
    e.preventDefault();

    const errors = validateInput(title, description, action.type);

    if (objectHasValues(errors)) {
      return setError(errors);
    }

    const task = {
      title,
      description,
    };

    try {
      setLoading(true);
      const request = await updateTask(id, task);

      if (request.success === true) {
        setLoading(false);
        notify("success", action.message);
        return history.push("/home");
      }
    } catch (error) {
      setLoading(false);
      notify("error", error.message);
    }
  };

  useEffect(() => {
    if (Object.values(tasks).length !== 0) {
      const task = tasks[id];
      setTitle(task.title);
      setDescription(task.description);
    } else if (Object.values(tasks).length === 0) {
      // ir a traer la data de nuevo pero tocaria volver a parsearla
      //de alguna manera guardarla con react usando hooks como memo o use call
      // con caché tendría que investigar
      // o con LocalStorage
      console.log("get data again");
    }
  }, [id, tasks]);

  return (
    <Layout>
      <Form handleSubmit={(e) => sendData(e)}>
        <div className="mb-4">
          <Input
            label="título"
            placeHolder="title"
            value={title}
            handleChange={(e) => setTitle(e.target.value)}
            focus={true}
            error={error?.title}
          />
        </div>
        <div className="mb-4">
          <Input
            label="descripción"
            placeHolder="description"
            value={description}
            handleChange={(e) => setDescription(e.target.value)}
            error={error?.description}
          />
        </div>
        <div className="flex justify-center">
          <Button name={action.name} />
        </div>
      </Form>
      {loading && <Screen children={<Spinner />} />}
    </Layout>
  );
};

export default UpdateTask;
