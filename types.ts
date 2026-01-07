
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage: string;
  colors: string[];
  sizes: string[];
  description: string;
  gsm: number;
  fabric: string;
  customizable: boolean;
}

export interface CustomizationState {
  productId: string;
  baseColor: string;
  size: string;
  text: string;
  font: string;
  threadColor: string;
  placement: 'chest' | 'back' | 'sleeve-left' | 'sleeve-right';
  logoUrl?: string;
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
