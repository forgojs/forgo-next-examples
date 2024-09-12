import * as webjsx from "webjsx";

/*
  The main Todo List component
*/
export const TodoList = () => {
  let todos: string[] = [];

  return new webjsx.Component({
    name: "todo-list",
    render(_props, component) {
      function onTodoAdd(text: string) {
        todos.push(text);
        console.log({
          todos,
        });
        component.update();
      }

      return (
        <div>
          <h1>Forgo Todos</h1>
          <ul>
            {todos.map((t) => (
              <li>{t}</li>
            ))}
          </ul>
          <AddTodo onAdd={onTodoAdd} />
        </div>
      );
    },
  });
};

/*
  Add a Todo Box
*/
interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo = (props: AddTodoProps) => {
  console.log({ a: "lalala", props });
  const input: { value?: HTMLInputElement } = {};

  const saveTodo = () => {
    const inputEl = input.value;
    if (inputEl) {
      props.onAdd(inputEl.value);
      inputEl.value = "";
      inputEl.focus();
    }
  };

  // Add the todo when enter is pressed
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      saveTodo();
    }
  };

  return new webjsx.Component({
    name: "add-todo",
    render() {
      return (
        <div>
          <input onkeydown={onKeyDown} type="text" ref={input} />
          <button onclick={saveTodo}>Add me!</button>
        </div>
      );
    },
  });
};

function ready(fn: any) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(() => {
  webjsx.mount(<TodoList />, document.getElementById("root"));
});
