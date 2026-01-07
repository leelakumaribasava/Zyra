
import React, { useState, useEffect, useMemo } from 'react';
import { Page, Product, CustomizationState, CartItem } from './types';
import { PRODUCTS } from './constants';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import PDP from './pages/PDP';
import Studio from './pages/Studio';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Success from './pages/Success';
import Corporate from './pages/Corporate';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedDesigns, setSavedDesigns] = useState<CustomizationState[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navigate = (page: Page, product: Product | null = null) => {
    if (product) setSelectedProduct(product);
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
    navigate(Page.Cart);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const saveDesign = (design: CustomizationState) => {
    setSavedDesigns(prev => [...prev, design]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home onNavigate={navigate} />;
      case Page.Shop:
        return <Shop onNavigate={navigate} />;
      case Page.PDP:
        return selectedProduct ? (
          <PDP product={selectedProduct} onNavigate={navigate} />
        ) : (
          <Home onNavigate={navigate} />
        );
      case Page.Studio:
        return selectedProduct ? (
          <Studio product={selectedProduct} onNavigate={navigate} onAddToCart={addToCart} onSaveDesign={saveDesign} />
        ) : (
          <Home onNavigate={navigate} />
        );
      case Page.Cart:
        return <Cart items={cart} onNavigate={navigate} onRemove={removeFromCart} />;
      case Page.Checkout:
        return <Checkout items={cart} onNavigate={navigate} />;
      case Page.Account:
        return <Account savedDesigns={savedDesigns} onNavigate={navigate} />;
      case Page.Success:
        return <Success onNavigate={navigate} />;
      case Page.Corporate:
        return <Corporate onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col luxury-gradient text-white selection:bg-[#D4AF37] selection:text-black">
      <Header 
        currentPage={currentPage} 
        onNavigate={navigate} 
        cartCount={cart.length}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
