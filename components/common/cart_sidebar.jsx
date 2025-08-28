"use client";
import { useState, createContext, useContext } from "react";
import { X, Plus, Minus, ShoppingBag, CreditCard, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Button from "./button";
import { CartIcon } from "./icons";
import BookTag from "./bookTag";

// Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1-physical",
      productId: "1",
      title: "Stormlight Archive: The Way of Kings",
      writer: "Brandon Sanderson",
      image: "/book.jpg",
      bookType: "physical",
      price: 19.0,
      discountedPrice: 23.5,
      quantity: 2
    },
    {
      id: "2-ebook",
      productId: "2", 
      title: "The Island of Doctor Moreau",
      writer: "H.G. Wells",
      image: "/book.jpg",
      bookType: "ebook",
      price: 15.0,
      discountedPrice: 18.0,
      quantity: 1
    },
    {
      id: "3-audiobook",
      productId: "3",
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
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          // Only allow quantity changes for physical books
          if (item.bookType === 'physical') {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = (book) => {
    const existingItem = cartItems.find(item => 
      item.id === book.id
    );
    
    if (existingItem && existingItem.bookType === 'physical') {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else if (!existingItem) {
      setCartItems(prev => [...prev, { ...book, quantity: book.quantity || 1 }]);
    }
    // For ebook and audiobook, don't add duplicates since they're digital
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setShowPaymentMethods(false);
  };

  const proceedToPayment = () => {
    setShowPaymentMethods(true);
  };

  const backToCart = () => {
    setShowPaymentMethods(false);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      showPaymentMethods,
      toggleCart,
      updateQuantity,
      removeFromCart,
      addToCart,
      getTotalItems,
      getTotalPrice,
      proceedToPayment,
      backToCart
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

// Cart Icon Component
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

  const getDisplayName = (type) => {
    switch (type) {
      case 'physical':
        return 'Physical';
      case 'ebook':
        return 'E-book';
      case 'audiobook':
        return 'Audio Book';
      default:
        return type;
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTagStyle(type)}`}>
      {getDisplayName(type)}
    </span>
  );
};

// Payment Methods Component
const PaymentMethods = () => {
  const { getTotalPrice, backToCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('');
  const totalPrice = getTotalPrice();

  const paymentMethods = [
    {
      id: 'khalti',
      name: 'Khalti',
      description: 'Pay with Khalti digital wallet',
      url: 'https://khalti.com/payment',
      logoUrl: 'https://khaltibyime.khalti.com/wp-content/uploads/2025/07/Logo-for-Blog.png',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800'
    },
    {
      id: 'esewa',
      name: 'eSewa',
      description: 'Pay with eSewa digital wallet',
      url: 'https://esewa.com.np/payment',
      logoUrl: '/esewa.png',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      url: 'https://www.paypal.com/checkoutnow',
      logoUrl: 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Pay with credit or debit card',
      url: 'https://checkout.stripe.com',
      logoUrl: 'https://stripe.com/img/v3/home/twitter.png',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-800'
    }
  ];

  const handlePaymentMethodSelect = (method) => {
    setSelectedMethod(method.id);
  };

  const handleProceedToPayment = () => {
    const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);
    if (selectedPaymentMethod) {
      window.open(selectedPaymentMethod.url, '_blank');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={backToCart}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            Payment Methods
          </h2>
        </div>
      </div>

      {/* Payment Methods List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedMethod === method.id
                  ? `${method.borderColor} ${method.bgColor}`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => handlePaymentMethodSelect(method)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img 
                    src={method.logoUrl} 
                    alt={`${method.name} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div 
                    className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-600 text-xs font-bold"
                    style={{display: 'none'}}
                  >
                    {method.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${selectedMethod === method.id ? method.textColor : 'text-gray-900'}`}>
                    {method.name}
                  </h3>
                  <p className={`text-sm ${selectedMethod === method.id ? method.textColor : 'text-gray-600'}`}>
                    {method.description}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === method.id
                    ? `${method.borderColor.replace('border-', 'border-')} bg-current`
                    : 'border-gray-300'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-xl font-bold text-green-600">
            NRs. {totalPrice.toFixed(2)}
          </span>
        </div>
        
        <button
          onClick={handleProceedToPayment}
          disabled={!selectedMethod}
          className={`w-full font-semibold py-3 px-4 rounded-md transition-colors duration-200 ${
            selectedMethod
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedMethod ? 'Proceed to Payment' : 'Select a Payment Method'}
        </button>
      </div>
    </div>
  );
};

// Cart Item Component
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const canChangeQuantity = item.bookType === 'physical';

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
          <BookTypeTag type={item.bookType} />
          {!canChangeQuantity && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Digital
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-start flex-col">
            <span className="font-bold text-sm">NRs. {item.price.toFixed(2)}</span>
            {item.discountedPrice && (
              <span className="text-xs text-gray-500 line-through">
                NRs. {item.discountedPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {canChangeQuantity ? (
              <>
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
              </>
            ) : (
              <div className="flex items-center">
                <span className="w-8 text-center text-sm font-medium text-gray-500">
                  1
                </span>
                <span className="text-xs text-gray-400 ml-2">Digital Copy</span>
              </div>
            )}
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

// Cart View Component
const CartView = () => {
  const { cartItems, getTotalPrice, proceedToPayment } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const totalPrice = getTotalPrice();

  const handleApplyPromo = () => {
    console.log('Applying promo code:', promoCode);
  };

  const getCartSummary = () => {
    const physicalBooks = cartItems.filter(item => item.bookType === 'physical').length;
    const digitalBooks = cartItems.filter(item => item.bookType !== 'physical').length;
    return { physicalBooks, digitalBooks };
  };

  const { physicalBooks, digitalBooks } = getCartSummary();

  return (
    <div className="flex flex-col h-full">
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
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="border-t border-gray-200 p-4">
          {/* Cart Summary */}
          {(physicalBooks > 0 || digitalBooks > 0) && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 space-y-1">
                {physicalBooks > 0 && (
                  <div className="flex justify-between">
                    <span>Physical books ({physicalBooks})</span>
                    <span>Ships in 2-3 days</span>
                  </div>
                )}
                {digitalBooks > 0 && (
                  <div className="flex justify-between">
                    <span>Digital books ({digitalBooks})</span>
                    <span>Instant delivery</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold text-green-600">
              NRs. {totalPrice.toFixed(2)}
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
          <button 
            onClick={proceedToPayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

// Cart Sidebar Component
const CartSidebar = () => {
  const { cartItems, isCartOpen, toggleCart, showPaymentMethods } = useCart();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-opacity-50 z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleCart}
      />
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {showPaymentMethods ? (
          <PaymentMethods />
        ) : (
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
            
            <CartView />
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;