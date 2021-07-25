import {UserDetails} from './user-details';
import {OrderRow} from './order-row';

export interface CartDetails {
  userDetails: UserDetails;
  orderRowDtos: OrderRow[];
}
