import React, { useState, useEffect } from "react";
import Header from "./header.jsx";
import TaskInput from "./taskInput.jsx";
import TodoCounter from "./todoCounter.jsx";

//create your first component
const Home = () => {
  const [todoList, setTodoList] = useState([{}]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [todoCounter, setTodoCounter] = useState(0);
  const [btnHover, setBtnHover] = useState(false);

  setTimeout(() => {
    setTodoCounter(todoList.length - 1);
  }, 100);

  useEffect(() => {
    getToDos();
  }, []);

  const getToDos = async () => {
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/Jminx42"
    );
    const data = await response.json();
    setTodoList(data);
  };

  const updateToDos = async (newTodoList) => {
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/Jminx42",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodoList),
      }
    );
    if (response.ok) {
      getToDos();
    }
  };

  const addTask = (newTask) => {
    if (todoList.findIndex((todo) => todo.label === newTask) === -1) {
      const newTodoList = [...todoList, { label: newTask, done: false }];
      setTodoList(newTodoList);
      setTodoCounter(newTodoList.length);
      updateToDos(newTodoList);
    }
  };

  const deleteTodo = (index) => {
    const newTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(newTodoList);
    setTodoCounter(newTodoList.length);
    updateToDos(newTodoList);
  };

  return (
    <div className="text-center h-100">
      <Header />
      <div className="col-5 mx-auto">
        <ul className="list-group text-start">
          <li className="list-group-item">
            <TaskInput onAddTask={addTask} />
          </li>
          {todoList.map((todo, index) => {
            if (!todo.hidden) {
              return (
                <li
                  className="list-group-item ps-4 d-flex justify-content-between"
                  key={index}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span className="flex-grow-1">{todo.label}</span>
                  {hoveredIndex === index ? (
                    <button
                      className={`btn border-0 text-danger ${
                        btnHover ? "opacity-50" : ""
                      } position-absolute top-50 end-0 translate-middle-y`}
                      onMouseEnter={() => setBtnHover(true)}
                      onMouseLeave={() => setBtnHover(false)}
                    >
                      <i
                        className="bi bi-x-lg"
                        onClick={() => deleteTodo(index)}
                      ></i>
                    </button>
                  ) : null}
                </li>
              );
            }
          })}
          <li className="list-group-item text-secondary text-opacity-50 fs-6">
            <TodoCounter count={todoCounter} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
