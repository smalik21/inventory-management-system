"use client"

// import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import OrderDetails from '@/app/components/OrderDetails';
import data from '@/public/data.json';
import { Order, Item } from '@/app/lib/types';

const OrderPage: React.FC = () => {
   const params = useParams();
   const id = params.id

   const items: Item[] = data.items;

   const orders: Order[] = data.orders.map((order) => ({
      id: order.id,
      customer: order.customer,
      items: order.items.map((item) => ({
         id: item.id,
         name: item.name,
         quantity: item.quantity,
      })),
      status: order.status === 'Pending' || order.status === 'Completed' ? order.status : 'Pending', // Ensure status is either 'Pending' or 'Completed'
   }));

   return <OrderDetails orders={orders} items={items} />;
};

export default OrderPage;
