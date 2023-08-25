import { useState } from "react";
import "./index.css";

// App

export default function App() {
  const [items, setItems] = useState([]);
  function addItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <>
      <Header />;
      <Form onAddItems={addItems} />
      <PackingList
        items={items}
        onDelete={handleDeleteItems}
        onToggle={handleToggleItem}
        key={items.id}
      />
    </>
  );
}

function Header() {
  return (
    <header>
      <h1>Travel list</h1>
    </header>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleForm(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    setDescription("");
    setQuantity(1);

    onAddItems(newItem);
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleForm}>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
            <option value={n} key={n}>
              {n}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="item ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

function PackingList({ items, onDelete, onToggle }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDelete={onDelete}
            onToggle={onToggle}
            key={item.key}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDelete, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>&times;</button>
    </li>
  );
}
