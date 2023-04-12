import React, { useState } from "react";
import Header from "./header.jsx";
import TaskInput from "./taskInput.jsx";
import TodoCounter from "./todoCounter.jsx";

//create your first component
const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [todoCounter, setTodoCounter] = useState(0);
  const [btnHover, setBtnHover] = useState(false);

  const addTask = (newTask) => {
    if (todoList.indexOf(newTask.toLowerCase()) === -1) {
      setTodoList([...todoList, newTask]);
      setTodoCounter(todoCounter + 1);
    }
  };

  const deleteTodo = (index) => {
    const newTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(newTodoList);
    setTodoCounter(newTodoList.length);
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
            return (
              <li
                className="list-group-item ps-4 d-flex justify-content-between"
                key={index}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="flex-grow-1">{todo}</span>
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
