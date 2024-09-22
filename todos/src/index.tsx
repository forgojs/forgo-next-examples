/** @jsx webjsx.createElement */
import * as webjsx from "webjsx";
import { applyDiff } from "webjsx";

declare module "webjsx" {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * Props for the <todo-item> element.
       *
       * @property id - Unique identifier for the todo item.
       * @property text - The text content of the todo item.
       */
      "todo-item": {
        id: string;
        text: string;
        key?: string;
      };

      /**
       * Props for the <todo-input> element.
       *
       * This component does not accept any props.
       */
      "todo-input": {};

      /**
       * Props for the <todo-list> element.
       *
       * @property todos - A JSON string representing an array of todo items.
       */
      "todo-list": {
        todos: string;
      };
    }
  }
}

// Define the TodoItem Web Component
class TodoItem extends HTMLElement {
  static get observedAttributes() {
    return ["text", "id"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue && (name === "text" || name === "id")) {
      this.render();
    }
  }

  render() {
    const text = this.getAttribute("text") || "";
    const id = this.getAttribute("id") || "";

    const handleDelete = () => {
      this.dispatchEvent(
        new CustomEvent("delete", {
          detail: { id },
          bubbles: true,
          composed: true,
        })
      );
    };

    const vdom = (
      <li class="todo-item">
        <span>{text}</span>
        <button onclick={handleDelete}>Delete</button>
      </li>
    );

    applyDiff(this, vdom);
  }
}

if (!customElements.get("todo-item")) {
  customElements.define("todo-item", TodoItem);
}

// Define the TodoList Web Component
// Define the TodoList Web Component
class TodoList extends HTMLElement {
  static get observedAttributes() {
    return ["todos"];
  }

  private ulElement: HTMLElement; // Reference to the <ul> element

  constructor() {
    super();
    this.ulElement = document.createElement("ul");
    this.ulElement.className = "todo-list";
  }

  connectedCallback() {
    this.render();
    this.appendChild(this.ulElement); // Append the <ul> once
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (name === "todos") {
      this.render();
    }
  }

  render() {
    const todosAttr = this.getAttribute("todos");
    let todos: { id: string; text: string }[] = [];

    try {
      todos = todosAttr ? JSON.parse(todosAttr) : [];
    } catch (error) {
      console.error("Invalid todos attribute:", error);
    }

    const vdom = todos.map((todo) => (
      <todo-item key={todo.id} id={todo.id} text={todo.text}></todo-item>
    ));

    applyDiff(this.ulElement, vdom); // Apply diff directly to the <ul>
  }
}

if (!customElements.get("todo-list")) {
  customElements.define("todo-list", TodoList);
}

// Define the TodoInput Web Component
class TodoInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const handleAdd = () => {
      const input = this.querySelector("input") as HTMLInputElement;
      const text = input.value.trim();
      if (text) {
        this.dispatchEvent(
          new CustomEvent("add", {
            detail: { text },
            bubbles: true,
            composed: true,
          })
        );
        input.value = "";
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleAdd();
      }
    };

    const vdom = (
      <div class="todo-input">
        <input
          type="text"
          placeholder="Enter a new todo"
          onkeypress={handleKeyPress}
        />
        <button onclick={handleAdd}>Add</button>
      </div>
    );

    applyDiff(this, vdom);
  }
}

if (!customElements.get("todo-input")) {
  customElements.define("todo-input", TodoInput);
}

// Define the main App component
const App = () => {
  let todos: { id: string; text: string }[] = [];

  const handleAdd = (event: Event) => {
    const customEvent = event as CustomEvent<{ text: string }>;
    const newTodo = {
      id: Date.now().toString(),
      text: customEvent.detail.text,
    };
    todos = [...todos, newTodo];
    update();
  };

  const handleDelete = (event: Event) => {
    const customEvent = event as CustomEvent<{ id: string }>;
    const idToDelete = customEvent.detail.id;
    todos = todos.filter((todo) => todo.id !== idToDelete);
    update();
  };

  const update = () => {
    const vdom = (
      <div class="app">
        <h1>Todo List</h1>
        <todo-input></todo-input>
        <todo-list todos={JSON.stringify(todos)}></todo-list>
      </div>
    );
    const container = document.getElementById("app");
    if (container) {
      applyDiff(container, vdom);
    }
  };

  // Initial render
  update();

  // Event listeners for adding and deleting todos
  const container = document.getElementById("app");
  if (container) {
    container.addEventListener("add", handleAdd);
    container.addEventListener("delete", handleDelete);
  }
};

// Initialize the App
App();

// Optional: Add some basic styles
const style = document.createElement("style");
style.textContent = `
  .app {
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .todo-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .todo-input input {
    flex: 1;
    padding: 8px;
    font-size: 16px;
  }
  .todo-input button {
    padding: 8px 12px;
    font-size: 16px;
  }
  .todo-list {
    list-style: none;
    padding: 0;
  }
  .todo-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
  }
  .todo-item button {
    background: #ff4d4d;
    border: none;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
  }
  .todo-item button:hover {
    background: #ff1a1a;
  }
`;
document.head.appendChild(style);
