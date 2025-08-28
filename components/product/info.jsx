// import { useState } from "react";
// import BookTag from "@/components/common/bookTag";
// import Button from "@/components/common/button";
// import Image from "next/image";
// import { useCart } from "../common/cart_sidebar";

// const StockStatus = ({ status }) => {
//   const stockStatusText =
//     status === "in_stock"
//       ? "In stock"
//       : status === "low_stock"
//       ? "Low stock"
//       : "Out of stock";
//   const stockColor =
//     status === "in_stock"
//       ? "bg-green-500"
//       : status === "low_stock"
//       ? "bg-orange-500"
//       : "bg-red-500";

//   return (
//     <div className="flex items-center space-x-2">
//       <div className={`w-3 h-3 ${stockColor} rounded-full`}></div>
//       <span className="text-primary-500">{stockStatusText}</span>
//     </div>
//   );
// };

// const BookTypeSelector = ({ product, selectedTypes, onTypeChange, onQuantityChange, quantities }) => {
//   const bookTypes = [
//     {
//       id: 'physical',
//       name: 'Physical Book',
//       price: product.pricing.physicalBook || product.pricing.basePrice,
//       allowQuantity: true
//     },
//     {
//       id: 'ebook',
//       name: 'E-book',
//       price: product.pricing.ebook || (product.pricing.basePrice * 0.7), // 30% cheaper than physical
//       allowQuantity: false
//     },
//     {
//       id: 'audiobook',
//       name: 'Audio Book',
//       price: product.pricing.audiobook || (product.pricing.basePrice * 1.2), // 20% more expensive
//       allowQuantity: false
//     }
//   ];

//   const handleTypeToggle = (typeId) => {
//     const newSelectedTypes = selectedTypes.includes(typeId)
//       ? selectedTypes.filter(id => id !== typeId)
//       : [...selectedTypes, typeId];
    
//     onTypeChange(newSelectedTypes);
//   };

//   const handleQuantityChange = (typeId, change) => {
//     const currentQuantity = quantities[typeId] || 1;
//     const newQuantity = Math.max(1, currentQuantity + change);
//     onQuantityChange(typeId, newQuantity);
//   };

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold text-primary-700">Select Book Type(s)</h3>
      
//       {bookTypes.map((type) => (
//         <div key={type.id} className="border border-primary-300 rounded-lg p-4">
//           <div className="flex items-center space-x-3">
//             <input
//               type="checkbox"
//               id={type.id}
//               checked={selectedTypes.includes(type.id)}
//               onChange={() => handleTypeToggle(type.id)}
//               className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-primary-300 rounded"
//             />
//             <label htmlFor={type.id} className="flex-1 cursor-pointer">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <span className="text-primary-700 font-medium">{type.name}</span>
//                   <div className="text-sm text-primary-500">
//                     {product.pricing.currency} {type.price.toFixed(2)}
//                   </div>
//                 </div>
                
//                 {selectedTypes.includes(type.id) && type.allowQuantity && (
//                   <div className="flex items-center space-x-2 px-3 py-1 border border-primary-400 rounded-full">
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleQuantityChange(type.id, -1);
//                       }}
//                       className="text-primary-600 hover:text-primary-800"
//                     >
//                       -
//                     </button>
//                     <span className="w-8 text-center text-sm">
//                       {quantities[type.id] || 1}
//                     </span>
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleQuantityChange(type.id, 1);
//                       }}
//                       className="text-primary-600 hover:text-primary-800"
//                     >
//                       +
//                     </button>
//                   </div>
//                 )}
                
//                 {selectedTypes.includes(type.id) && !type.allowQuantity && (
//                   <span className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded">
//                     Digital Copy
//                   </span>
//                 )}
//               </div>
//             </label>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const Info = ({ product }) => {
//   const [selectedTypes, setSelectedTypes] = useState(['physical']);
//   const [quantities, setQuantities] = useState({ physical: 1 });
//   const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
//   const [isShippingOpen, setIsShippingOpen] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);

//   // Get cart context
//   const { addToCart } = useCart();

//   // Enhanced product with pricing for different formats
//   const enhancedProduct = {
//     ...product,
//     pricing: {
//       ...product.pricing,
//       physicalBook: product.pricing.basePrice,
//       ebook: Math.round(product.pricing.basePrice * 0.7), // 30% cheaper
//       audiobook: Math.round(product.pricing.basePrice * 1.2) // 20% more expensive
//     }
//   };

//   const calculateTotalPrice = () => {
//     let total = 0;
//     selectedTypes.forEach(typeId => {
//       let price;
//       switch(typeId) {
//         case 'physical':
//           price = enhancedProduct.pricing.physicalBook;
//           break;
//         case 'ebook':
//           price = enhancedProduct.pricing.ebook;
//           break;
//         case 'audiobook':
//           price = enhancedProduct.pricing.audiobook;
//           break;
//         default:
//           price = 0;
//       }
//       const quantity = typeId === 'physical' ? (quantities[typeId] || 1) : 1;
//       total += price * quantity;
//     });
//     return total;
//   };

//   const handleAddToCart = async () => {
//     if (selectedTypes.length === 0) return;
    
//     setIsAdding(true);
    
//     try {
//       // Add each selected type as a separate cart item
//       const cartPromises = selectedTypes.map(typeId => {
//         const cartItem = {
//           id: `${product.id}-${typeId}`,
//           productId: product.id,
//           title: product.title,
//           writer: product.author.name,
//           image: product.images.primary,
//           bookType: typeId,
//           price: typeId === 'physical' ? enhancedProduct.pricing.physicalBook :
//                  typeId === 'ebook' ? enhancedProduct.pricing.ebook :
//                  enhancedProduct.pricing.audiobook,
//           quantity: typeId === 'physical' ? (quantities[typeId] || 1) : 1,
//           discountedPrice: null // Add if you have sale prices
//         };
        
//         return addToCart(cartItem);
//       });
      
//       await Promise.all(cartPromises);
      
//       // Optional: Show success feedback
//       // You could add a toast notification here
//       console.log('Successfully added to cart');
      
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       // Optional: Show error feedback
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   const handleBuyNow = async () => {
//     if (selectedTypes.length === 0) return;
    
//     // First add to cart
//     await handleAddToCart();
    
//     // Then redirect to checkout or open cart
//     // You could implement immediate checkout logic here
//     console.log('Proceeding to checkout');
//   };

//   const totalPrice = calculateTotalPrice();

//   return (
//     <div className="container py-8 relative">
//       <div className="grid grid-cols-2 gap-12">
//         <div className="space-y-4">
//           <div className="text-primary-500">
//             <span className="hover:underline cursor-pointer">
//               {product.author.name}
//             </span>
//           </div>
//           <div>
//             <div className="flex items-start justify-between">
//               <h1 className="font-recoleta text-header-1 text-primary-700">
//                 {product.title}
//               </h1>
//             </div>
//             <p className="text-primary-500">{product.publisher}</p>
//             <p className="text-sm text-primary-500">ISBN: {product.isbn}</p>
//           </div>

//           <div className="flex gap-4">
//             {product.format.map((value) => (
//               <BookTag key={value} tag={value} />
//             ))}
//           </div>

//           <StockStatus status={product.stock.status} />

//           {/* Book Type Selection */}
//           <BookTypeSelector 
//             product={enhancedProduct}
//             selectedTypes={selectedTypes}
//             onTypeChange={setSelectedTypes}
//             onQuantityChange={(typeId, quantity) => {
//               setQuantities(prev => ({ ...prev, [typeId]: quantity }));
//             }}
//             quantities={quantities}
//           />

//           {/* Total Price */}
//           <div className="text-header-2 font-recoleta text-primary-700 py-4 border-t border-primary-300">
//             Total: {product.pricing.currency} {totalPrice.toFixed(2)}
//             {selectedTypes.length > 1 && (
//               <div className="text-sm text-primary-500 font-normal">
//                 ({selectedTypes.length} item{selectedTypes.length > 1 ? 's' : ''} selected)
//               </div>
//             )}
//           </div>

//           {/* Action buttons */}
//           <div className="flex space-x-3">
//             <Button
//               text={isAdding ? "Adding..." : "Add to cart"}
//               style="line"
//               color="primary"
//               size="medium"
//               onClick={handleAddToCart}
//               disabled={selectedTypes.length === 0 || isAdding}
//             />

//             <Button
//               text="Buy Now"
//               style="fill"
//               color="info-green"
//               size="medium"
//               onClick={handleBuyNow}
//               disabled={selectedTypes.length === 0 || isAdding}
//             />
//           </div>

//           {/* Selected Items Summary */}
//           {selectedTypes.length > 0 && (
//             <div className="bg-primary-50 p-4 rounded-lg">
//               <h4 className="text-sm font-semibold text-primary-700 mb-2">Selected Items:</h4>
//               <div className="space-y-1">
//                 {selectedTypes.map(typeId => {
//                   const typeName = typeId === 'physical' ? 'Physical Book' :
//                                  typeId === 'ebook' ? 'E-book' : 'Audio Book';
//                   const price = typeId === 'physical' ? enhancedProduct.pricing.physicalBook :
//                                typeId === 'ebook' ? enhancedProduct.pricing.ebook :
//                                enhancedProduct.pricing.audiobook;
//                   const quantity = typeId === 'physical' ? (quantities[typeId] || 1) : 1;
                  
//                   return (
//                     <div key={typeId} className="flex justify-between text-sm text-primary-600">
//                       <span>{typeName} {quantity > 1 ? `× ${quantity}` : ''}</span>
//                       <span>{product.pricing.currency} {(price * quantity).toFixed(2)}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Collapsible sections */}
//           <div className="py-8">
//             {/* Description */}
//             <div className="border-t border-primary-500 py-4">
//               <button
//                 onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
//                 className="flex items-center justify-between w-full text-left"
//               >
//                 <h3 className="text-body-2 text-primary-700">Description</h3>
//               </button>
//               {isDescriptionOpen && (
//                 <div className="py-4 text-sm text-primary-500">
//                   <p>{product.description.full}</p>
//                   <div>
//                     <h4 className="text-body-2 font-semibold text-primary-700 py-4">
//                       Why You Should Read {product.title}
//                     </h4>
//                     <ul className="list-disc pl-5 space-y-1">
//                       {product.description.highlights.map(
//                         (highlight, index) => (
//                           <li key={index}>
//                             <strong>{highlight.title} : </strong>
//                             {highlight.description}
//                           </li>
//                         )
//                       )}
//                     </ul>
//                   </div>
//                   <p className="pt-2">
//                     <em>{product.description.tagline}</em>
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Shipping */}
//             <div className="border-t border-primary-500 py-4">
//               <button
//                 onClick={() => setIsShippingOpen(!isShippingOpen)}
//                 className="flex items-center justify-between w-full text-left"
//               >
//                 <h3 className="text-body-2 text-primary-700">Shipping</h3>
//               </button>
//               {isShippingOpen && (
//                 <div className="py-4 text-sm text-gray-600 space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <h4 className="font-medium text-gray-900">
//                         Inside Valley
//                       </h4>
//                       <p>
//                         Estimated delivery date:{" "}
//                         {product.shipping.insideValley.estimatedDelivery}
//                       </p>
//                       <p className="text-xs">
//                         {product.shipping.insideValley.description}
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-900">
//                         Outside Valley
//                       </h4>
//                       <p>
//                         Estimated delivery date:{" "}
//                         {product.shipping.outsideValley.estimatedDelivery}
//                       </p>
//                       <p className="text-xs">
//                         {product.shipping.outsideValley.description}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
//                     <strong>Note:</strong> Digital products (E-books and Audio books) are delivered instantly via email after payment confirmation.
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="h-[60rem] w-[41.15rem] sticky top-28 overflow-hidden rounded-sm">
//           <Image
//             src={product.images.primary}
//             alt={product.images.altText}
//             width={640}
//             height={960}
//             className="w-full h-full object-contain rounded-sm shadow-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Info;

"use client"

import { useState } from "react";
import BookTag from "@/components/common/bookTag";
import Button from "@/components/common/button";
import Image from "next/image";
import { useCart } from "../common/cart_sidebar";

const StockStatus = ({ status }) => {
  const stockStatusText =
    status === "in_stock"
      ? "In stock"
      : status === "low_stock"
      ? "Low stock"
      : "Out of stock";
  const stockColor =
    status === "in_stock"
      ? "bg-green-500"
      : status === "low_stock"
      ? "bg-orange-500"
      : "bg-red-500";

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 ${stockColor} rounded-full`}></div>
      <span className="text-primary-500">{stockStatusText}</span>
    </div>
  );
};

const BookTypeSelector = ({ product, selectedTypes, onTypeChange, onQuantityChange, quantities }) => {
  const bookTypes = [
    {
      id: 'physical',
      name: 'Physical Book',
      price: product.pricing.physicalBook || product.pricing.basePrice,
      allowQuantity: true
    },
    {
      id: 'ebook',
      name: 'E-book',
      price: product.pricing.ebook || (product.pricing.basePrice * 0.7), // 30% cheaper than physical
      allowQuantity: false
    },
    {
      id: 'audiobook',
      name: 'Audio Book',
      price: product.pricing.audiobook || (product.pricing.basePrice * 1.2), // 20% more expensive
      allowQuantity: false
    }
  ];

  const handleTypeToggle = (typeId) => {
    const newSelectedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    
    onTypeChange(newSelectedTypes);
  };

  const handleQuantityChange = (typeId, change) => {
    const currentQuantity = quantities[typeId] || 1;
    const newQuantity = Math.max(1, currentQuantity + change);
    onQuantityChange(typeId, newQuantity);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary-700">Select Book Type(s)</h3>
      
      {bookTypes.map((type) => (
        <div key={type.id} className="border border-primary-300 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={type.id}
              checked={selectedTypes.includes(type.id)}
              onChange={() => handleTypeToggle(type.id)}
              className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-primary-300 rounded"
            />
            <label htmlFor={type.id} className="flex-1 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-primary-700 font-medium">{type.name}</span>
                  <div className="text-sm text-primary-500">
                    {product.pricing.currency} {type.price.toFixed(2)}
                  </div>
                </div>
                
                {selectedTypes.includes(type.id) && type.allowQuantity && (
                  <div className="flex items-center space-x-2 px-3 py-1 border border-primary-400 rounded-full">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuantityChange(type.id, -1);
                      }}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm">
                      {quantities[type.id] || 1}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuantityChange(type.id, 1);
                      }}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      +
                    </button>
                  </div>
                )}
                
                {selectedTypes.includes(type.id) && !type.allowQuantity && (
                  <span className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded">
                    Digital Copy
                  </span>
                )}
              </div>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

const Info = ({ product }) => {
  const [selectedTypes, setSelectedTypes] = useState(['physical']);
  const [quantities, setQuantities] = useState({ physical: 1 });
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Get cart context
  const { addToCart } = useCart();

  // Enhanced product with pricing for different formats
  const enhancedProduct = {
    ...product,
    pricing: {
      ...product.pricing,
      physicalBook: product.pricing.basePrice,
      ebook: Math.round(product.pricing.basePrice * 0.7), // 30% cheaper
      audiobook: Math.round(product.pricing.basePrice * 1.2) // 20% more expensive
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    selectedTypes.forEach(typeId => {
      let price;
      switch(typeId) {
        case 'physical':
          price = enhancedProduct.pricing.physicalBook;
          break;
        case 'ebook':
          price = enhancedProduct.pricing.ebook;
          break;
        case 'audiobook':
          price = enhancedProduct.pricing.audiobook;
          break;
        default:
          price = 0;
      }
      const quantity = typeId === 'physical' ? (quantities[typeId] || 1) : 1;
      total += price * quantity;
    });
    return total;
  };

  const handleAddToCart = async () => {
    if (selectedTypes.length === 0) return;
    
    setIsAdding(true);
    
    try {
      // Add each selected type as a separate cart item
      const cartPromises = selectedTypes.map(typeId => {
        const cartItem = {
          id: `${product.id}-${typeId}`,
          productId: product.id,
          title: product.title,
          writer: product.author.name,
          image: product.images.primary,
          bookType: typeId,
          price: typeId === 'physical' ? enhancedProduct.pricing.physicalBook :
                 typeId === 'ebook' ? enhancedProduct.pricing.ebook :
                 enhancedProduct.pricing.audiobook,
          quantity: typeId === 'physical' ? (quantities[typeId] || 1) : 1,
          discountedPrice: null // Add if you have sale prices
        };
        
        return addToCart(cartItem);
      });
      
      await Promise.all(cartPromises);
      
      // Optional: Show success feedback
      // You could add a toast notification here
      console.log('Successfully added to cart');
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Optional: Show error feedback
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (selectedTypes.length === 0) return;
    
    // First add to cart
    await handleAddToCart();
    
    // Then redirect to checkout or open cart
    // You could implement immediate checkout logic here
    console.log('Proceeding to checkout');
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="container py-8">
      {/* Main grid layout */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Left section - Book Image */}
        <div className="col-span-2">
          <div className="">
            <div className="w-[10.75rem] min-w-full overflow-hidden rounded-sm">
              <Image
                src={product.images.primary}
                alt={product.images.altText}
                width={300}
                height={533}
                className="w-full h-full object-contain bg-red-500 rounded-sm shadow-lg"
              />
            </div>
          </div>
          <div className="space-y-4 w-[370%] mt-10 relative z-40">
            <div className="border-t border-primary-500 pt-4">
              <button
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-body-2 text-primary-700">Description</h3>
                <span className="text-primary-500">
                  {isDescriptionOpen ? '−' : '+'}
                </span>
              </button>
              {isDescriptionOpen && (
                <div className="pt-4 text-sm text-primary-500">
                  <p className="mb-4">{product.description.full}</p>
                  <div>
                    <h4 className="text-body-2 font-semibold text-primary-700 mb-3">
                      Why You Should Read {product.title}
                    </h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {product.description.highlights.map(
                        (highlight, index) => (
                          <li key={index}>
                            <strong>{highlight.title}:</strong>{' '}
                            {highlight.description}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <p className="pt-3 italic">
                    {product.description.tagline}
                  </p>
                </div>
              )}
            </div>

            {/* Shipping Section */}
            <div className="border-t border-primary-500 pt-4">
              <button
                onClick={() => setIsShippingOpen(!isShippingOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-body-2 text-primary-700">Shipping</h3>
                <span className="text-primary-500">
                  {isShippingOpen ? '−' : '+'}
                </span>
              </button>
              {isShippingOpen && (
                <div className="pt-4 text-sm text-gray-600 space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Inside Valley
                      </h4>
                      <p>
                        Estimated delivery date:{" "}
                        {product.shipping.insideValley.estimatedDelivery}
                      </p>
                      <p className="text-xs">
                        {product.shipping.insideValley.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Outside Valley
                      </h4>
                      <p>
                        Estimated delivery date:{" "}
                        {product.shipping.outsideValley.estimatedDelivery}
                      </p>
                      <p className="text-xs">
                        {product.shipping.outsideValley.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
                    <strong>Note:</strong> Digital products (E-books and Audio books) are delivered instantly via email after payment confirmation.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle section - Book Details and Description */}
        <div className="col-span-5 space-y-4 sticky top-28">
          {/* Author */}
          <div className="text-primary-500">
            <span className="hover:underline cursor-pointer">
              {product.author.name}
            </span>
          </div>

          {/* Title and Publisher */}
          <div>
            <h1 className="font-recoleta text-header-2 text-primary-700 mb-2">
              {product.title}
            </h1>
            <p className="text-primary-500 mb-1">{product.publisher}</p>
            <p className="text-sm text-primary-500">ISBN: {product.isbn}</p>
          </div>

          {/* Tags */}
          <div className="flex gap-4">
            {product.format.map((value) => (
              <BookTag key={value} tag={value} />
            ))}
          </div>

          {/* Stock Status */}
          <StockStatus status={product.stock.status} />

          {/* Description Section */}
        </div>

        {/* Right section - Book Type Selector and Purchase */}
        <div className="col-span-5">
          <div className="sticky top-28 space-y-6">
            {/* Book Type Selection */}
            <BookTypeSelector 
              product={enhancedProduct}
              selectedTypes={selectedTypes}
              onTypeChange={setSelectedTypes}
              onQuantityChange={(typeId, quantity) => {
                setQuantities(prev => ({ ...prev, [typeId]: quantity }));
              }}
              quantities={quantities}
            />

            {/* Total Price */}
            <div className="text-header-2 font-recoleta text-primary-700 py-4 border-t border-primary-300">
              Total: {product.pricing.currency} {totalPrice.toFixed(2)}
              {selectedTypes.length > 1 && (
                <div className="text-sm text-primary-500 font-normal">
                  ({selectedTypes.length} item{selectedTypes.length > 1 ? 's' : ''} selected)
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <Button
                text={isAdding ? "Adding..." : "ADD TO CART"}
                style="line"
                color="primary"
                size="medium"
                onClick={handleAddToCart}
                disabled={selectedTypes.length === 0 || isAdding}
                className="w-full"
              />

              <Button
                text="BUY NOW"
                style="fill"
                color="info-green"
                size="medium"
                onClick={handleBuyNow}
                disabled={selectedTypes.length === 0 || isAdding}
                className="w-full"
              />
            </div>

            {/* Selected Items Summary */}
            {selectedTypes.length > 0 && (
              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-primary-700 mb-2">Selected Items:</h4>
                <div className="space-y-1">
                  {selectedTypes.map(typeId => {
                    const typeName = typeId === 'physical' ? 'Physical Book' :
                                   typeId === 'ebook' ? 'E-book' : 'Audio Book';
                    const price = typeId === 'physical' ? enhancedProduct.pricing.physicalBook :
                                 typeId === 'ebook' ? enhancedProduct.pricing.ebook :
                                 enhancedProduct.pricing.audiobook;
                    const quantity = typeId === 'physical' ? (quantities[typeId] || 1) : 1;
                    
                    return (
                      <div key={typeId} className="flex justify-between text-sm text-primary-600">
                        <span>{typeName} {quantity > 1 ? `× ${quantity}` : ''}</span>
                        <span>{product.pricing.currency} {(price * quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;