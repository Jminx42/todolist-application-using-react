import React from "react";

const TodoCounter = ({ count }) => {
  return (
    <div className="todo-counter">
      {count === 0
        ? "No tasks left"
        : `${count} ${count > 1 ? " tasks " : "task"} left`}
    </div>
  );
};

export default TodoCounter;
