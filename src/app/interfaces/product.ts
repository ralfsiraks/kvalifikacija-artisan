export interface Product {
  id: number;
  title: string;
  artist: string;
  height: number;
  width: number;
  description: string;
  price: number;
  old_price: null | number;
  image_url: string;
  category_id: number;
  category_title?: string;
}
