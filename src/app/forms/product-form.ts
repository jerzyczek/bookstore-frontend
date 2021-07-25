import {CategoryDetails} from '../model/category';
import {AuthorDetails} from '../model/author';

export interface ProductForm {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imgURL: string;
  category: CategoryDetails;
  author: AuthorDetails;
}
