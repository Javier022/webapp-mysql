import React from "react";
import Layout from "../components/layout";
import TaskForm from "../components/taskForm";

const AddTask = () => {
  const props = {
    type: "create",
    name: "add Task",
    message: "task creada",
  };

  return (
    <Layout>
      <TaskForm {...props} />
    </Layout>
  );
};

export default AddTask;
