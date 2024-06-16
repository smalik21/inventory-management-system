"use client"

import { useState } from 'react';
import { Order } from '@/app/lib/types';
import Link from 'next/link';
import clsx from 'clsx';

interface OrderListProps {
   orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
   const [statusFilter, setStatusFilter] = useState<string>('');
   const [sortField, setSortField] = useState<string>('');

   const filteredOrders = orders
      .filter(order => !statusFilter || order.status === statusFilter)
      .sort((a, b) => {
         if (sortField === 'customer') {
            return a.customer.localeCompare(b.customer);
         } else if (sortField === 'itemCount') {
            return a.items.length - b.items.length;
         }
         return 0;
      });

   return (
      <div className="p-4 w-full">
         <h1 className='w-full text-3xl text-slate-400'>Orders</h1>
         <div className="flex justify-between my-4 text-slate-300">
            <div className="space-x-6">
               <span className='font-semibold text-slate-500'>SHOW: </span>
               <button className={clsx('btn', { 'text-orange-400 font-semibold': statusFilter === '' })} onClick={() => setStatusFilter('')}>All</button>
               <button className={clsx('btn', { 'text-orange-400 font-semibold': statusFilter === 'Pending' })} onClick={() => setStatusFilter('Pending')}>Pending</button>
               <button className={clsx('btn', { 'text-orange-400 font-semibold': statusFilter === 'Completed' })} onClick={() => setStatusFilter('Completed')}>Completed</button>
            </div>
            <div className="space-x-6">
               <span className='font-semibold text-slate-500'>SORT BY: </span>
               <button className={clsx('btn', { 'text-orange-400 font-semibold': sortField === 'customer' })} onClick={() => setSortField('customer')}>Customer</button>
               <button className={clsx('btn', { 'text-orange-400 font-semibold': sortField === 'itemCount' })} onClick={() => setSortField('itemCount')}>Item Count</button>
            </div>
         </div>
         <ol className="list-disc list-inside">
            {filteredOrders.map(order => (
               <li key={order.id} className="p-1 border-b w-full flex">
                  <Link href={`/orders/${order.id}`} className="hover:bg-slate-900 p-2 w-full flex justify-between gap-4 md:gap-16">
                     <span className=''>Order ID: {order.id}</span>
                     <span className=''>Customer: {order.customer}</span>
                     <span className=''>Status: {order.status}</span>
                     <span className=''>Items: {order.items.length}</span>
                  </Link>
               </li>
            ))}
         </ol>
      </div>
   );
};

export default OrderList;
