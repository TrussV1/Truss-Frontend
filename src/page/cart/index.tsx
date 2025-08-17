import { BiMinus, BiPlus } from "react-icons/bi";
import { cartData, getSelectedItems } from "./data";
import { useState } from "react";

const Cart = () => {
  const totalPrice = () => {
    return cartItemData?.reduce(
      (sum, item) => sum + item?.price * item?.quantity,
      0
    );
  };
  const [cartItemData, setCartItemData] = useState(cartData);

  const handleAdd = (id: number) => {
    const updatedCart = cartItemData.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItemData(updatedCart);
  };

  const handleSub = (id: number) => {
    const updatedCart = cartItemData.map((item) =>
      item.id === id && item?.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItemData(updatedCart);
  };

  const handlePayment = () => {
    alert("verify user");
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
      <h1 className="text-4xl font-light text-gray-800 mb-8">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          {cartItemData?.map((data: any) => (
            <div
              key={data.id}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-20 h-20 object-cover rounded-md shadow-sm"
                  src={data?.img}
                  alt={data?.title}
                />
                <h2 className="text-lg font-medium text-gray-700">
                  {data?.title}
                </h2>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  ETH {data?.price.toFixed(2)}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => handleSub(data?.id)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <BiMinus className="text-gray-600" />
                </button>
                <p className="text-lg font-medium">{data?.quantity}</p>
                <button
                  onClick={() => handleAdd(data?.id)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <BiPlus className="text-gray-600" />
                </button>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  ETH {(data?.price * data?.quantity).toFixed(2)}
                </h2>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/3">
          <div className="sticky top-4 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-light text-gray-800 border-b border-gray-200 pb-4 mb-4">
              Cart Summary
            </h1>
            <div className="space-y-3">
              {getSelectedItems(cartItemData)?.map((data: any) => (
                <div
                  key={data.id}
                  className="flex items-center justify-between"
                >
                  <h3 className="text-base font-medium text-gray-600">
                    {data?.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-800">
                    ETH {data?.price.toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <h3 className="text-base font-medium text-gray-600">
                  Shipping Fee
                </h3>
                <p className="text-lg font-semibold text-gray-800">ETH 20.00</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">Total</h3>
                <p className="text-xl font-bold text-green-600">
                  ETH {(totalPrice() + 20).toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={handlePayment}
              className="w-full mt-6 py-3 px-6 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
