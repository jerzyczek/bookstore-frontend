import {CategoryDetails} from './category';
import {AuthorDetails} from './author';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imgURL: string;
  category: CategoryDetails;
  author: AuthorDetails;
}
