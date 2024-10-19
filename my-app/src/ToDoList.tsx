import React, { useState } from "react";
import { useParams } from "react-router-dom";  // Import useParams to get the URL parameters
import { dummyGroceryList } from "./constant";  // Import your grocery list data

interface GroceryItem {
  name: string;
  isPurchased: boolean;
}

export const ToDoList = () => {
  const { name } = useParams<{ name: string }>();
  const [items, setItems] = useState<GroceryItem[]>(dummyGroceryList);
  const [numBought, setNumBought] = useState(0);

  const handleCheckboxClick = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].isPurchased = !updatedItems[index].isPurchased;
    setItems(updatedItems);
    const boughtCount = updatedItems.filter(item => item.isPurchased).length;
    setNumBought(boughtCount);
  };

  // Handle delete button click to remove an item
  const handleDelete = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    const boughtCount = updatedItems.filter(item => item.isPurchased).length;
    setNumBought(boughtCount);
  };

  return (
    <div className="to-do-list-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", height: "80vh", marginTop: "5vh" }}>
      <h1>{name}'s To Do List</h1>
      <h3>Items bought: {numBought}</h3>
      <form>
        {items.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id={`item-${index}`}  
              checked={item.isPurchased}
              onChange={() => handleCheckboxClick(index)}
            />
            <label htmlFor={`item-${index}`} style={{ marginLeft: "8px" }}>
              {item.name}
            </label>
            <button
              type="button"
              data-testid={`delete-button-${index}`}  // Add data-testid for the delete button
              onClick={() => handleDelete(index)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </form>
    </div>
  );
};
