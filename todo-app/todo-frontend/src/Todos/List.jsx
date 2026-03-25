import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

return (
    <>
      {todos.map((todo, index) => {
        return (
          <React.Fragment key={todo.text}>
            {index > 0 && <hr />}
            <Todo
              onClickComplete={onClickComplete}
              onClickDelete={onClickDelete}
              todo={todo}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default TodoList;
