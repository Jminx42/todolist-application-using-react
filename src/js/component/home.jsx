import React, { useState } from "react";

//create your first component
const Home = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const validateTodo = (e) => {
    if (e.key == "Enter") {
      if (newTodo !== "") {
        if (todoList.indexOf(newTodo.toLowerCase()) == -1) {
          setTodoList([...todoList, newTodo]);
          setNewTodo("");
        }
      }
    }
  };

  return (
    <div className="text-center">
      <input
        value={newTodo}
        placeholder="Add a new todo"
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
        onKeyUp={(e) => {
          validateTodo(e);
        }}
      />
      <ul>
        {todoList.map((todo, index) => {
          return <li key={index}>{todo}</li>;
        })}
      </ul>
    </div>
  );
};

export default Home;
