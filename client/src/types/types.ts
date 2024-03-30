export interface Employee {
  _id: string;
  empId: number;
  username: string;
  password: string;
}

export interface Product {
  _id: string;
  productCode: number;
  productName: string;
  productQuantity: number;
  productPrice: number;
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
