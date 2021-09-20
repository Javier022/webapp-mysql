import React, { useState, useContext } from "react";
import { DataContext } from "../context/dataContext";

// componemts
import Input from "../components/Utils/input";
import Button from "../components/Utils/button";
import Layout from "../components/layout";
import Form from "../components/form";
import Spinner from "../components/Utils/spinner";
import { notify } from "../utilities/toast";

// utils
import { validateInput } from "../utilities/validateInput";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({});

  const { token, createNewTask, loading, setLoading, useHistory } =
    useContext(DataContext);

  //router
  const history = useHistory();

  // action
  const action = {
    type: "create",
    name: "add Task",
    message: "task creada",
  };

  const sendData = async (e) => {
    e.preventDefault();

    const errors = validateInput(title, description, action.type);

    if (Object.values(errors).length !== 0) {
      return setError(errors);
    }

    const task = {
      title: title,
      description: description,
    };

    try {
      setLoading(true);
      const request = await createNewTask(task, token);

      if (request.success === true) {
        setLoading(false);
        notify("success", action.message);
        return history.push("/home");
      } else {
        setLoading(false);
        notify("error", "ocurrio un error");
      }
    } catch (error) {
      setLoading(false);
      notify("error", error.message);
    }
  };

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
        <div className="mb-6">
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
      {loading && <Spinner />}
    </Layout>
  );
};

export default AddTask;
