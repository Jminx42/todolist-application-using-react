import React, { useState } from "react";

//create your first component
const Home = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [todoCounter, setTodoCounter] = useState(0);
  const [btnHover, setBtnHover] = useState(false);

  const validateTodo = (e) => {
    if (
      e.key == "Enter" &&
      newTodo !== "" &&
      todoList.indexOf(newTodo.toLowerCase()) == -1
    ) {
      setTodoList([...todoList, newTodo]);
      setTodoCounter(todoCounter + 1);
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    const newTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(newTodoList);
    setTodoCounter(newTodoList.length);
  };

  return (
    <div className="text-center h-100">
      <h1 className="display-2 text-secondary opacity-50">todos</h1>
      <div className="col-5 mx-auto"></div>

      <div className="col-5 mx-auto">
        <ul className="list-group text-start">
          <li className="list-group-item">
            <input
              className="form-control border-0"
              value={newTodo}
              placeholder="Enter a new todo"
              onChange={(e) => {
                setNewTodo(e.target.value);
              }}
              onKeyUp={(e) => {
                validateTodo(e);
              }}
            />
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
            <div className="todo-counter">
              {todoCounter === 0
                ? "No tasks left"
                : `${todoCounter} ${todoCounter > 1 ? " tasks " : "task"} left`}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
