import React from "react";
import Layout from "../components/layout";
import TaskForm from "../components/taskForm";

const UpdateTask = () => {
  const action = {
    type: "update",
    name: "update Task",
    message: "task actualizada",
  };

  return (
    <Layout>
      <TaskForm {...action} />
    </Layout>
  );
};

export default UpdateTask;
