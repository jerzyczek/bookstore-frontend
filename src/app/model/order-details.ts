import {OrderItem} from './order-item';

export interface OrderDetails {
  price: number;
  shippingMethod: string;
  shippingPrice: number;
  trackingNumber: string;
  orderItem: OrderItem[];
}
