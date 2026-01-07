
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'st-1',
    name: 'Heavyweight Box Tee',
    price: 110,
    category: 'Oversized Tees',
    collection: 'Luxury Streetwear',
    gender: 'Unisex',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    colors: ['#0F0F0F', '#F5F5F5', '#4A0E0E'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The definitive luxury streetwear silhouette. Dropped shoulders, wide sleeves, and a structure that holds its shape.',
    gsm: 320,
    fabric: 'Compact Jersey Cotton',
    customizable: true,
    tags: ['Trending on Instagram', 'Luxury Streetwear']
  },
  {
    id: 'st-2',
    name: 'Signature Oversized Hoodie',
    price: 220,
    category: 'Hoodies',
    collection: 'Zuno Signature Series',
    gender: 'Unisex',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
    colors: ['#2A2A2A', '#000080'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Double-layered hood, kangaroo pocket, and rib-knit cuffs.',
    gsm: 480,
    fabric: 'French Terry Cotton',
    customizable: true,
    tags: ['Zuno Signature Series', 'Winter 2025']
  }
];

export const FABRICS = [
  { name: 'Supima Cotton', price: 0, tag: 'Year-Round', desc: 'Silky smooth, extra-long staple fibers.' },
  { name: 'French Terry', price: 25, tag: 'Winter', desc: 'Heavyweight loopback for structure.' },
  { name: 'Cashmere Blend', price: 85, tag: 'Premium', desc: 'Ultimate softness with thermal regulation.' }
];

export const THREAD_COLORS = [
  { name: 'Gold', hex: '#D4AF37' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Midnight Black', hex: '#000000' },
  { name: 'Pure White', hex: '#FFFFFF' }
];

export const FONTS = ['Playfair Display', 'Plus Jakarta Sans', 'Bebas Neue', 'Cormorant Garamond'];

export const STYLE_DETAILS = {
  collars: ['Classic Crew', 'Ribbed Mock', 'Deep V-Neck'],
  sleeves: ['Standard Hem', 'Double Ribbed', 'Raw Cut'],
  stitching: ['Tone-on-tone', 'Contrast Gold', 'Silver Lux']
};
