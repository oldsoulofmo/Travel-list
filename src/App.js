import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

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

  function handleClearEls() {
    const confirmed = window.confirm("Are you sure :) ? ");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Header />;
      <Form onAddItems={addItems} />
      <PackingList
        items={items}
        onDelete={handleDeleteItems}
        onToggle={handleToggleItem}
        onClear={handleClearEls}
        key={items.id}
      />
      <Stats items={items} />
    </div>
  );
}
