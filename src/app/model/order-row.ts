import {Product} from './product';

export interface OrderRow {
  orderRowId: number;
  productId: number;
  productDto: Product;
  productQuantity: number;
}
