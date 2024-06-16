
export interface Item {
  id: number;
  name: string;
  stock: number;
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
}

export interface Order {
  id: number;
  customer: string;
  items: OrderItem[];
  status: "Pending" | "Completed";
}
