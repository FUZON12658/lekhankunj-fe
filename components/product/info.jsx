import { useState } from "react";
import BookTag from "@/components/common/bookTag";
import Button from "@/components/common/button";
import Image from "next/image";

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

const Info = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="container py-8">
      <div className="grid grid-cols-2 items-center gap-12">
        <div className="space-y-4">
          <div className="text-primary-500">
            <span className="hover:underline cursor-pointer">
              {product.author.name}
            </span>
          </div>
          <div>
            <div className="flex items-start justify-between">
              <h1 className="font-recoleta text-header-1 text-primary-700">
                {product.title}
              </h1>
              {/* <Heart className="h-6 w-6 text-gray-400 cursor-pointer hover:text-red-500" /> */}
            </div>
            <p className="text-primary-500">{product.publisher}</p>
            <p className="text-sm text-primary-500">ISBN: {product.isbn}</p>
          </div>
          {/* <p className="text-sm text-gray-600 mb-4">Paperback</p> */}

          <div className="flex gap-4">
            {product.format.map((value) => (
              <BookTag key={value} tag={value} />
            ))}
          </div>

          <StockStatus status={product.stock.status} />

          {/* Price */}
          <div className="text-header-2 font-recoleta text-primary-700 py-4">
            {product.pricing.currency}.{product.pricing.basePrice.toFixed(2)}
          </div>

          {/* Quantity and buttons */}
          <div className="flex justify-between items-center space-x-4">
            <div className="flex items-center space-x-4 px-4 py-2 text-xl border border-primary-400 rounded-full">
              <button
                onClick={decrementQuantity}
                // className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
              >
                {/* <Minus className="h-4 w-4" /> */}-
              </button>
              <span className="w-20 text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                // className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
              >
                {/* <Plus className="h-4 w-4" /> */}+
              </button>
            </div>

            <div className="flex space-x-3">
              <Button
                text="Add to cart"
                style="line"
                color="primary"
                size="medium"
              />

              <Button
                text="Buy Now"
                style="fill"
                color="info-green"
                size="medium"
              />
            </div>
          </div>

          {/* Store pickup info */}
          {/* <div className="border-t pt-6">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Pickup available at{" "}
                  <span className="font-bold">
                    {product.storePickup.storeName}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Usually ready in {product.storePickup.readyIn}
                </p>
                <button className="text-sm text-blue-600 hover:underline mt-1">
                  View store information
                </button>
              </div>
            </div>
          </div> */}

          {/* Collapsible sections */}
          <div className="py-8">
            {/* Description */}
            <div className="border-t border-primary-500 py-4">
              <button
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-body-2 text-primary-700">Description</h3>
                {/* <ChevronDown className={`h-5 w-5 transition-transform ${isDescriptionOpen ? 'rotate-180' : ''}`} /> */}
              </button>
              {isDescriptionOpen && (
                <div className="py-4 text-sm text-primary-500">
                  <p>{product.description.full}</p>
                  <div>
                    <h4 className="text-body-2 font-semibold text-primary-700 py-4">
                      Why You Should Read {product.title}
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.description.highlights.map(
                        (highlight, index) => (
                          <li key={index}>
                            <strong>{highlight.title} : </strong>
                            {highlight.description}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <p className="pt-2">
                    <em>{product.description.tagline}</em>
                  </p>
                </div>
              )}
            </div>

            {/* Shipping */}
            <div className="border-t border-primary-500 py-4">
              <button
                onClick={() => setIsShippingOpen(!isShippingOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-body-2 text-primary-700">Shipping</h3>
                {/* <ChevronDown className={`h-5 w-5 transition-transform ${isShippingOpen ? 'rotate-180' : ''}`} /> */}
              </button>
              {isShippingOpen && (
                <div className="py-4 text-sm text-gray-600 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-full overflow-hidden">
          <Image
            src={product.images.primary}
            alt={product.images.altText}
            width={640}
            height={960}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
export default Info;
