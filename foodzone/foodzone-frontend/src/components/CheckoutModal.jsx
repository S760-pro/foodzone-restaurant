import { useState } from "react";
import { useCart } from "../context/CartContext";
import { X, Minus, Plus, Trash2, Check } from "lucide-react";

export default function CheckoutModal() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotal, showCheckout, setShowCheckout } = useCart();
  const [paymentStep, setPaymentStep] = useState("cart"); // "cart" or "payment" or "success"
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const requiredFields = [
      formData.fullName,
      formData.email,
      formData.phone,
      formData.address,
      formData.cardNumber,
      formData.cardExpiry,
      formData.cardCVV,
    ];

    if (requiredFields.some((field) => !field.trim())) {
      alert("Please fill all payment fields before continuing.");
      return;
    }
    // Simulate payment processing
    setPaymentStep("success");
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      setPaymentStep("cart");
    }, 3000);
  };

  if (!showCheckout) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div 
        className="checkout-modal-card bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.92) 100%), url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=60')`,
          backgroundPosition: 'right bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '50%',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-50 to-orange-100 border-b-2 border-orange-200 px-10 py-8 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-3xl font-bold text-gray-900">
            {paymentStep === "cart" ? "🛒 Shopping Cart" : paymentStep === "payment" ? "💳 Payment Details" : "✅ Order Confirmed"}
          </h2>
          {paymentStep !== "success" && (
            <button
              onClick={() => setShowCheckout(false)}
              className="p-2 hover:bg-orange-200 rounded-lg transition"
            >
              <X size={28} className="text-gray-600" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-10">
          {paymentStep === "cart" && (
            <div>
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-16 text-lg">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-6 mb-10">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-6 pb-6 border-b-2 border-gray-100 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 p-5 rounded-2xl transition duration-200">
                        {item.img && (
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-28 h-28 rounded-2xl object-cover shadow-lg flex-shrink-0 border-2 border-orange-100"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-xl">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-3 leading-relaxed">{item.desc}</p>
                          <p className="text-orange-600 font-bold mt-4 text-xl">Rs. {item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 border-2 border-orange-200 flex-shrink-0 shadow-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-orange-300 rounded-lg transition font-bold text-orange-600 hover:text-white"
                          >
                            <Minus size={20} />
                          </button>
                          <span className="w-8 text-center font-bold text-gray-900 text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-orange-300 rounded-lg transition font-bold text-orange-600 hover:text-white"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-3 text-red-500 hover:bg-red-100 rounded-2xl transition flex-shrink-0 hover:text-red-700"
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-8 mb-10 border-2 border-orange-200 shadow-lg">
                    <div className="flex justify-between items-center mb-5 pb-5 border-b-2 border-orange-200">
                      <span className="text-gray-700 font-semibold text-lg">Subtotal</span>
                      <span className="font-bold text-lg">Rs. {getTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-5 pb-5 border-b-2 border-orange-200">
                      <span className="text-gray-700 font-semibold text-lg">Delivery Fee</span>
                      <span className="font-bold text-lg">Rs. 250</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900">Total</span>
                      <span className="text-4xl font-bold text-orange-600">Rs. {(getTotal() + 250).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="checkout-action-buttons flex gap-5">
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="flex-1 px-8 py-5 border-2 border-orange-400 rounded-2xl font-bold text-orange-600 hover:bg-orange-50 transition text-lg shadow-md hover:shadow-lg"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => setPaymentStep("payment")}
                      className="flex-1 px-8 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold hover:shadow-xl transition text-lg shadow-lg hover:scale-105 transform duration-200"
                    >
                      Proceed to Payment →
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {paymentStep === "payment" && (
            <form onSubmit={handlePayment}>
              <div className="space-y-8 mb-10">
                {/* Delivery Information */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-6 text-lg">📦 Delivery Information</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full px-6 py-4 border-2 border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="w-full px-6 py-4 border-2 border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="03001234567"
                          className="w-full px-6 py-4 border-2 border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">Delivery Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your full address"
                        className="w-full px-6 py-4 border-2 border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-6 text-lg">💳 Card Details</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, "").slice(0, 16);
                          const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
                          handleInputChange({ target: { name: "cardNumber", value: formatted } });
                        }}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-6 py-4 border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Expiry Date *</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "").slice(0, 4);
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + "/" + value.slice(2);
                            }
                            handleInputChange({ target: { name: "cardExpiry", value } });
                          }}
                          placeholder="MM/YY"
                          className="w-full px-6 py-4 border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">CVV *</label>
                        <input
                          type="text"
                          name="cardCVV"
                          value={formData.cardCVV}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                            handleInputChange({ target: { name: "cardCVV", value } });
                          }}
                          placeholder="123"
                          className="w-full px-6 py-4 border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">💰 Total Amount to Pay</span>
                    <span className="text-4xl font-bold text-green-600">Rs. {(getTotal() + 250).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-5">
                <button
                  type="button"
                  onClick={() => setPaymentStep("cart")}
                  className="flex-1 px-8 py-5 border-2 border-orange-400 rounded-2xl font-bold text-orange-600 hover:bg-orange-50 transition text-lg shadow-md hover:shadow-lg"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-8 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold hover:shadow-xl transition text-lg shadow-lg hover:scale-105 transform duration-200"
                >
                  Pay Now ✓
                </button>
              </div>
            </form>
          )}

          {paymentStep === "success" && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Check size={48} className="text-green-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">Order Confirmed! 🎉</h3>
              <p className="text-gray-600 mb-10 text-xl font-semibold">Your order has been placed successfully.</p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-10 border-2 border-green-200 mb-8 shadow-lg">
                <p className="text-gray-700 font-bold mb-4 text-lg">Total Amount Paid</p>
                <p className="text-5xl font-bold text-green-600">Rs. {(getTotal() + 250).toLocaleString()}</p>
              </div>
              <p className="text-sm text-gray-500 font-semibold">Redirecting you back...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
