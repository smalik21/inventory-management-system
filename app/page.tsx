"use client"

import { useState, useEffect } from 'react';
import OrderList from '@/app/components/OrderList';
import Inventory from '@/app/components/Inventory';
import data from '@/public/data.json';
import { Order, Item } from '@/app/lib/types';

const Home: React.FC = () => {
   const [orders, setOrders] = useState<Order[]>([]);
   const [items, setItems] = useState<Item[]>(data.items);

   useEffect(() => {
      const tempOrders: Order[] = data.orders.map((order) => ({
         id: order.id,
         customer: order.customer,
         items: order.items.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
         })),
         status: order.status === 'Pending' || order.status === 'Completed' ? order.status : 'Pending', // Ensure status is either 'Pending' or 'Completed'
      }));

      setOrders(tempOrders);
   }, []);

   return (
      <div className="space-y-10">
         <h1 className="text-center text-2xl font-bold mb-4">Inventory and Order Management System</h1>
         <OrderList orders={orders} />
         <Inventory items={items} setItems={setItems} />
      </div>
   );
};

export default Home;
