import React, { useState } from "react";

const TaskInput = ({ onAddTask }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const validateTodo = (e) => {
    if (e.key === "Enter" && newTodo.trim() !== "") {
      onAddTask(newTodo);
      setNewTodo("");
    }
  };

  return (
    <input
      className="form-control border-0"
      value={newTodo}
      placeholder="Enter a new todo"
      onChange={handleChange}
      onKeyUp={validateTodo}
    />
  );
};

export default TaskInput;
