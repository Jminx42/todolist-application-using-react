import React, { useState } from "react";

//create your first component
const Home = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isDeleteVisible, setIsDeleteVisible] = useState();
  const [deleteIndex, setDeleteIndex] = useState();
  const validateTodo = (e) => {
    if (
      e.key == "Enter" &&
      newTodo !== "" &&
      todoList.indexOf(newTodo.toLowerCase()) == -1
    ) {
      setTodoList([...todoList, newTodo]);
      setNewTodo("");
    }
  };

  return (
    <div className="text-center h-100">
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
          return (
            <li key={index} onMouseOver={(index) => setDeleteIndex(index)}>
              {todo}

              <button className="btn">
                <i
                  className="bi bi-x-lg"
                  style={{
                    visibility: `${index !== "" ? "visible" : "hidden"}`,
                  }}
                ></i>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
