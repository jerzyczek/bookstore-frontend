import {OrderRowRequest} from './order-row-request';

export interface Order {
  shippingMethod: string;
  orderRowRequest: OrderRowRequest[];
}
