export interface Employee {
  _id: string;
  empId: number;
  username: string;
  password: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  imagePath: string;
  stockQuantity: number;
  category: Category;
  featured: boolean;
}

export interface Order {
  _id: string;
  orderNumber: number;
  orderDate: Date;
  customerNumber: number;
  product: Product;
  productQuantity: number;
  totalAmount: number;
  modeOfPayment: string;
}
