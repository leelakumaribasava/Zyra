
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subCategory?: string;
  collection?: string;
  gender: 'Men' | 'Women' | 'Kids' | 'Unisex';
  image: string;
  hoverImage: string;
  colors: string[];
  sizes: string[];
  description: string;
  gsm: number;
  fabric: string;
  customizable: boolean;
  tags?: string[];
}

export interface CustomizationState {
  productId: string;
  baseColor: string;
  size: string;
  fit: 'Slim' | 'Regular' | 'Relaxed';
  fabric: string;
  text: string;
  font: string;
  threadColor: string;
  placement: 'chest' | 'back' | 'sleeve-left' | 'sleeve-right' | 'nape';
  details: {
    collar: string;
    stitching: 'Tone-on-tone' | 'Contrast Gold' | 'Silver Lux';
    sleeves: string;
  };
  price: number;
}

export interface CartItem {
  id: string;
  product: Product;
  customization?: CustomizationState;
  quantity: number;
}

export enum Page {
  Home = 'home',
  Shop = 'shop',
  PDP = 'pdp',
  Studio = 'studio',
  Cart = 'cart',
  Checkout = 'checkout',
  Account = 'account',
  Success = 'success',
  Corporate = 'corporate',
  Gift = 'gift'
}
