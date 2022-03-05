import React, { useState } from "react";

import api from "../services/api";
import { useHistory } from "react-router-dom";
// componemts
import Input from "../components/Utils/input";
import Button from "../components/Utils/button";
import Layout from "../components/layout";
import Form from "../components/form";
import Screen from "../components/Utils/screen";
import Spinner from "../components/Utils/spinner";
import TitlePage from "../components/Utils/titlePage";

// utils
import { notify } from "../utilities/toast";
import { validateInput } from "../utilities/validateInput";
import { objectHasValues } from "../utilities/objectHasValues";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  //router
  const history = useHistory();

  // action
  const action = {
    type: "create",
    name: "Save",
    message: "task created",
  };

  const sendData = async (e) => {
    e.preventDefault();
    const errors = validateInput(title, description, action.type);

    if (objectHasValues(errors)) {
      return setError(errors);
    }

    const task = {
      title: title,
      description: description,
    };

    try {
      setLoading(true);
      const request = await api.post("/tasks", task);
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

  return (
    <Layout>
      <TitlePage text="Add a task" mt={8} />

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
        <div className="mb-6">
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

export default AddTask;
