import React, { useState, useEffect } from 'react';

const RestaurantAdminDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch total orders
      const ordersResponse = await fetch('/api/orders');
      if (!ordersResponse.ok) {
        throw new Error('Failed to fetch orders');
      }
      const ordersData = await ordersResponse.json();
      setTotalOrders(ordersData.length);

      // Calculate total revenue
      const revenue = ordersData.reduce((total, order) => total + order.totalAmount, 0);
      setTotalRevenue(revenue);

      // Fetch popular items
      const itemsResponse = await fetch('/api/popular-items');
      if (!itemsResponse.ok) {
        throw new Error('Failed to fetch popular items');
      }
      const itemsData = await itemsResponse.json();
      setPopularItems(itemsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error.message);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Total Orders: {totalOrders}</h2>
        <h2>Total Revenue: ${totalRevenue}</h2>
      </div>
      <div>
        <h2>Popular Menu Items</h2>
        <ul>
          {popularItems.map(item => (
            <li key={item._id}>
              {item.name} - {item.ordersCount} orders
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantAdminDashboard;
