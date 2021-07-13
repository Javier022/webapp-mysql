import React from "react";
import TasksPage from "./pages/tasks";
import { DataProvider } from "./context/dataContext";

function App() {
  return (
    <DataProvider>
      <TasksPage />
    </DataProvider>
  );
}

export default App;
