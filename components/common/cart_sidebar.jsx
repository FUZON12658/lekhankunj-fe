"use client";
import { useState, createContext, useContext } from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Button from "./button";
import { CartIcon } from "./icons";
import BookTag from "./bookTag";

// Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Stormlight Archive: The Way of Kings",
      writer: "Brandon Sanderson",
      image: "/book.jpg",
      bookType: "physical", // physical, ebook, or audiobook
      price: 19.0,
      discountedPrice: 23.5,
      quantity: 2
    },
    {
      id: 2,
      title: "The Island of Doctor Morea",
      writer: "H.G. Wells",
      image: "/book.jpg",
      bookType: "ebook",
      price: 15.0,
      discountedPrice: 18.0,
      quantity: 1
    },
    {
      id: 3,
      title: "Dune",
      writer: "Frank Herbert",
      image: "/book.jpg",
      bookType: "audiobook",
      price: 25.0,
      discountedPrice: 30.0,
      quantity: 1
    }
  ]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = (book) => {
    const existingItem = cartItems.find(item => 
      item.id === book.id && item.bookType === book.bookType
    );
    
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      setCartItems(prev => [...prev, { ...book, quantity: 1 }]);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      toggleCart,
      updateQuantity,
      removeFromCart,
      addToCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Icon Component (Updated)
export const CartIconTrigger = ({ className }) => {
  const { toggleCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div className="relative cursor-pointer" onClick={toggleCart}>
      <CartIcon className={className} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};

// Book Type Tag Component
const BookTypeTag = ({ type }) => {
  const getTagStyle = (type) => {
    switch (type) {
      case 'physical':
        return 'bg-blue-100 text-blue-800';
      case 'ebook':
        return 'bg-green-100 text-green-800';
      case 'audiobook':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTagStyle(type)}`}>
      {type}
    </span>
  );
};

// Cart Item Component
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 p-4 border-b border-gray-200">
      <div className="w-16 h-20 relative flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover rounded"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-gray-600 mt-1">by {item.writer}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <BookTag tag={item.bookType} />
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">${item.price.toFixed(2)}</span>
            {item.discountedPrice && (
              <span className="text-xs text-gray-500 line-through">
                ${item.discountedPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-gray-400 hover:text-red-500 transition-colors p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Cart Sidebar Component
const CartSidebar = () => {
  const { cartItems, isCartOpen, toggleCart, getTotalPrice } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const totalPrice = getTotalPrice();

  const handleApplyPromo = () => {
    // Handle promo code application logic here
    console.log('Applying promo code:', promoCode);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0  bg-opacity-50 z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleCart}
      />
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart ({cartItems.length})
            </h2>
            <button
              onClick={toggleCart}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="w-16 h-16 mb-4" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm mt-2">Add some books to get started!</p>
              </div>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <CartItem key={`${item.id}-${item.bookType}`} item={item} />
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              {/* Total */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-green-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              
              {/* Promo Code Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
                >
                  Apply
                </button>
              </div>
              
              {/* Proceed to Checkout */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;