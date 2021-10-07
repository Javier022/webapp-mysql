import React, { useState, useContext } from "react";
import { DataContext } from "../context/dataContext";

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

  const { createNewTask, loading, setLoading, useHistory } =
    useContext(DataContext);

  //router
  const history = useHistory();

  // action
  const action = {
    type: "create",
    name: "Save",
    message: "task creada",
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
      const request = await createNewTask(task);

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
      <TitlePage text="Add a task" mt={8} />

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
      {loading && <Screen children={<Spinner />} />}
    </Layout>
  );
};

export default AddTask;
