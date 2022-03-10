import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/dataContext";

import api from "../services/api";
import { useHistory, useParams } from "react-router-dom";
// componets
import Layout from "../components/layout";
import Form from "../components/form";
import Input from "../components/Utils/input";
import Button from "../components/Utils/button";
import Screen from "../components/Utils/screen";
import Spinner from "../components/Utils/spinner";
import TitlePage from "../components/Utils/titlePage";

// utils
import { objectHasValues } from "../utilities/objectHasValues";
import { validateInput } from "../utilities/validateInput";
import { notify } from "../utilities/toast";

const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const { tasks } = useContext(DataContext);

  // router
  const history = useHistory();
  const { id } = useParams();

  const action = {
    type: "update",
    name: "Save",
    message: "task updated",
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
      const request = await api.put(`/tasks/${id}`, task);
      if (request.status === 200 && request.data.success === true) {
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
    if (objectHasValues(tasks)) {
      const task = tasks[id];
      setTitle(task.title);
      setDescription(task.description);
    } else if (Object.values(tasks).length === 0) {
      // ir a traer la data de nuevo pero habria que volver a parsearla
      // console.log("get data again");
    }
  }, [id, tasks]);

  return (
    <Layout>
      <TitlePage text="Update task" mt={8} />
      <Form handleSubmit={(e) => sendData(e)}>
        <div className="mb-4">
          <Input
            placeHolder="title"
            value={title}
            handleChange={(e) => setTitle(e.target.value)}
            focus={true}
            error={error?.title}
          />
        </div>
        <div className="mb-4">
          <Input
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
