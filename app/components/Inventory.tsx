"use client"

import { useState } from 'react';
import { Item } from '@/app/lib/types';
import clsx from 'clsx';

interface InventoryProps {
   items: Item[];
   setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const Inventory: React.FC<InventoryProps> = ({ items, setItems }) => {
   const [stockFilter, setStockFilter] = useState<string>('');
   const [newItem, setNewItem] = useState<{ name: string; stock: number }>({ name: '', stock: 0 });
   const [editItemId, setEditItemId] = useState<number | null>(null);
   const [editedItem, setEditedItem] = useState<{ id: number; name: string; stock: number }>({
      id: 0,
      name: '',
      stock: 0,
   });

   const filteredItems = items.filter(item => {
      if (stockFilter === 'inStock') {
         return item.stock > 0;
      } else if (stockFilter === 'outOfStock') {
         return item.stock === 0;
      }
      return true;
   });

   const addItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (newItem.name === "") return;
      setItems([...items, { id: items.length + 1, ...newItem }]);
      setNewItem({ name: '', stock: 0 });
   };

   const deleteItem = (id: number) => {
      setItems(items.filter(item => item.id !== id));
   };

   const startEditItem = (item: Item) => {
      setEditItemId(item.id);
      setEditedItem({ ...item });
   };

   const cancelEdit = () => {
      setEditItemId(null);
      setEditedItem({ id: 0, name: '', stock: 0 });
   };

   const saveEditedItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (editedItem.name === "") return;
      const updatedItems = items.map(item =>
         item.id === editedItem.id ? { ...editedItem } : item
      );
      setItems(updatedItems);
      setEditItemId(null);
      setEditedItem({ id: 0, name: '', stock: 0 });
   };

   return (
      <div className="p-4 w-full">
         <h1 className='w-full text-3xl text-slate-400'>Inventory</h1>
         <div className="flex justify-between my-4 text-slate-300">
            <div className="space-x-6">
               <button className={clsx('btn', { 'text-orange-400 font-semibold': stockFilter === '' })} onClick={() => setStockFilter('')}>All</button>
               <button className={clsx('btn', { 'text-orange-400 font-semibold': stockFilter === 'inStock' })} onClick={() => setStockFilter('inStock')}>In Stock</button>
               <button className={clsx('btn', { 'text-orange-400 font-semibold': stockFilter === 'outOfStock' })} onClick={() => setStockFilter('outOfStock')}>Out of Stock</button>
            </div>
            <form onSubmit={addItem} className="space-x-6">
               <input
                  type="text"
                  placeholder="Item name"
                  value={newItem.name}
                  onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                  className="input w-40 bg-slate-400 px-2 py-1 text-black placeholder:text-slate-700 rounded-md border border-black outline-none"
               />
               <input
                  type="number"
                  placeholder="Quantity"
                  value={newItem.stock}
                  onChange={e => setNewItem({ ...newItem, stock: parseInt(e.target.value, 10) })}
                  className="input w-40 bg-slate-400 px-2 py-1 text-black placeholder:text-slate-700 rounded-md border border-black outline-none"
               />
               <button className="btn px-4 py-1 bg-green-800 hover:bg-green-700 active:bg-green-900 rounded-full" type='submit'>Add Item</button>
            </form>
         </div>

         <ul className="list-disc list-inside">
            {filteredItems.map(item => (
               <li key={item.id} className="p-2 border-b flex justify-between">
                  {editItemId === item.id ? (
                     <form className='w-full flex justify-between' onSubmit={saveEditedItem}>
                        <input
                           type="text"
                           placeholder="Item name"
                           value={editedItem.name}
                           onChange={e =>
                              setEditedItem({ ...editedItem, name: e.target.value })
                           }
                           className="input w-40 bg-slate-400 px-2 py-1 text-black placeholder:text-slate-700 rounded-md border border-black outline-none"
                        />
                        <input
                           type="number"
                           placeholder="Stock"
                           value={editedItem.stock}
                           onChange={e =>
                              setEditedItem({
                                 ...editedItem,
                                 stock: parseInt(e.target.value, 10),
                              })
                           }
                           className="input w-40 bg-slate-400 px-2 py-1 text-black placeholder:text-slate-700 rounded-md border border-black outline-none"
                        />
                        <div className="space-x-2">
                           <button type='submit' className="btn right-0 px-4 py-1 rounded-full bg-green-800 hover:bg-green-700 active:bg-green-900">
                              Save
                           </button>
                           <button className="btn right-0 px-4 py-1 rounded-full bg-slate-800 hover:bg-slate-700 active:bg-slate-900" onClick={cancelEdit}>
                              Cancel
                           </button>
                        </div>
                     </form>
                  ) : (
                     <div className="w-full p-2 flex justify-between">
                        <span>{item.name}</span>
                        <span>Stock: {item.stock}</span>
                        <div className="space-x-2">
                           <button
                              className="btn right-0 px-4 py-1 rounded-full bg-orange-800 hover:bg-orange-700 active:bg-orange-900"
                              onClick={() => startEditItem(item)}
                           >
                              Edit
                           </button>
                           <button className="btn right-0 px-4 py-1 rounded-full bg-red-800 hover:bg-red-700 active:bg-red-900" onClick={() => deleteItem(item.id)}>
                              Delete
                           </button>
                        </div>
                     </div>
                  )}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Inventory;
