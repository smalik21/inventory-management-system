"use client"

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Order, Item } from '@/app/lib/types';

interface OrderDetailsProps {
   orders: Order[];
   items: Item[];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orders, items }: OrderDetailsProps) => {
   const params = useParams();
   const id = params.id
   const order = orders.find(order => order.id === Number(id));

   const [orderStatus, setOrderStatus] = useState(order?.status || '');

   const handleComplete = () => {
      if (order) {
         setOrderStatus('Completed');
         // Update order status in the database or state
      }
   };

   if (!order) return <p>Order not found.</p>;

   return (
      <div className="w-full p-4 ">
         <h1 className="text-center text-2xl font-bold mb-16">Inventory and Order Management System</h1>
         <h1 className='w-full text-3xl text-slate-400 mb-8'>Order Details</h1>
         <div className='flex flex-col gap-4 mb-8'>
            <h1>Order ID: {order.id}</h1>
            <p>Customer: {order.customer}</p>
            <p>Status: {orderStatus}</p>
            <ul className="list-disc list-inside">
               {order.items.map(item => {
                  const stockItem = items.find(i => i.id === item.id);
                  return (
                     <li key={item.id}>
                        {item.name} - Quantity: {item.quantity} (Stock: {stockItem?.stock || 0})
                     </li>
                  );
               })}
            </ul>
         </div>
         {orderStatus === 'Pending' && (
            <button className="btn border border-black px-4 py-4 rounded-lg bg-green-700" onClick={handleComplete}>Mark as Completed</button>
         )}
         {orderStatus === 'Completed' && (
            <button className="btn border border-black px-4 py-4 rounded-lg bg-slate-600" onClick={handleComplete}>✅ Order Completed</button>
         )}
      </div>
   );
};

export default OrderDetails;
