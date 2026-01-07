
import React from 'react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'h1',
    name: 'The Zyra Hoodie',
    price: 185,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
    colors: ['#0F0F0F', '#3D2B1F', '#000080', '#2E3B2E'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'A heavyweight premium hoodie crafted from 450 GSM French Terry cotton. Designed for the perfect relaxed luxury silhouette.',
    gsm: 450,
    fabric: 'French Terry Cotton',
    customizable: true
  },
  {
    id: 't1',
    name: 'Bespoke Essential Tee',
    price: 95,
    category: 'Tees',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF', '#0F0F0F', '#D4AF37'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The ultimate luxury tee. 280 GSM premium cotton with a silk-like finish.',
    gsm: 280,
    fabric: 'Supima Cotton',
    customizable: true
  },
  {
    id: 'h2',
    name: 'Graphite Oversized Zip',
    price: 210,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    colors: ['#2A2A2A', '#1A1A1A'],
    sizes: ['M', 'L', 'XL'],
    description: 'Double-layered hood with silver-toned hardware and bespoke embroidery details.',
    gsm: 500,
    fabric: 'Organic Cotton Mix',
    customizable: true
  },
  {
    id: 's1',
    name: 'Signature Sweatshirt',
    price: 160,
    category: 'Sweatshirts',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1578681994506-38fbd0131f1f?auto=format&fit=crop&w=800&q=80',
    colors: ['#3D2B1F', '#4A0E0E'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Classic fit luxury sweatshirt with brushed interior for ultimate comfort.',
    gsm: 400,
    fabric: 'Cotton Fleece',
    customizable: true
  }
];

export const THREAD_COLORS = [
  { name: 'Gold', hex: '#D4AF37' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Rose Gold', hex: '#B76E79' },
  { name: 'Midnight Black', hex: '#000000' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Deep Wine', hex: '#4A0E0E' },
  { name: 'Forest Green', hex: '#1B3022' }
];

export const FONTS = [
  'Playfair Display',
  'Plus Jakarta Sans',
  'Cormorant Garamond',
  'Montserrat',
  'Bebas Neue'
];
