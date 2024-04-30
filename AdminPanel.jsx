import React, { useState } from 'react';

const RestaurantAdminPanel = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  const handleMenuItemAdd = () => {
    const newItemId = Math.random().toString(36).substr(2, 9);
    const newItem = { _id: newItemId, ...newMenuItem };
    setMenuItems([...menuItems, newItem]);
    setNewMenuItem({ name: '', description: '', price: '', category: '' });
  };

  const handleMenuItemDelete = (itemId) => {
    const updatedMenuItems = menuItems.filter(item => item._id !== itemId);
    setMenuItems(updatedMenuItems);
  };

  return (
    <div>
      <h1>Restaurant Admin Panel</h1>
      <div>
        <h2>Add New Menu Item</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newMenuItem.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newMenuItem.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={newMenuItem.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newMenuItem.category}
          onChange={handleInputChange}
        />
        <button onClick={handleMenuItemAdd}>Add New Item</button>
      </div>
      <div>
        <h2>Menu Items</h2>
        <ul>
          {menuItems.map(item => (
            <li key={item._id}>
              <div>
                <strong>{item.name}</strong> - {item.description} - ${item.price} - {item.category}
              </div>
              <button onClick={() => handleMenuItemDelete(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantAdminPanel;
