import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage({ build = {}, totalPrice = 0 }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Mohit',
    email: 'mohit@example.com',
    phone: '+91 98765 43210',
    address: '42 Brutalist Ave, Sector 18',
    city: 'New Delhi',
    pincode: '110001',
    paymentMethod: 'upi',
  });
  const [isOrdered, setIsOrdered] = useState(false);

  const itemCount = Object.keys(build).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOrdered(true);
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-8 lg:px-12 flex-grow mt-8 mb-20 text-black">
      {/* BREADCRUMB */}
      <div className="w-full flex items-center mb-8 border-b border-gray-300 pb-4 gap-3 uppercase tracking-tighter shrink-0">
        <button 
          onClick={() => navigate('/')} 
          className="text-xl md:text-2xl font-bold text-gray-500 hover:text-black transition-colors cursor-pointer shrink-0"
        >
          BUILD SPACE
        </button>
        <span className="text-xl md:text-2xl text-gray-400 font-light">/</span>
        <button 
          onClick={() => navigate('/cart')} 
          className="text-xl md:text-2xl font-bold text-gray-500 hover:text-black transition-colors cursor-pointer shrink-0"
        >
          CART
        </button>
        <span className="text-xl md:text-2xl text-gray-400 font-light">/</span>
        <h1 className="text-xl md:text-2xl font-bold text-black leading-none">
          CHECKOUT
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT: SHIPPING & PAYMENT GATEWAY (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          
          {/* SHIPPING SECTION */}
          <div className="border-2 border-black p-6 bg-white">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">
              01 // SHIPPING INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-2 border-black p-3 text-sm font-bold uppercase outline-none focus:bg-neutral-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-2 border-black p-3 text-sm font-bold outline-none focus:bg-neutral-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone} 
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border-2 border-black p-3 text-sm font-bold outline-none focus:bg-neutral-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">PIN Code</label>
                <input 
                  type="text" 
                  required
                  value={formData.pincode} 
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full border-2 border-black p-3 text-sm font-bold uppercase outline-none focus:bg-neutral-50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">Street Address</label>
                <input 
                  type="text" 
                  required
                  value={formData.address} 
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border-2 border-black p-3 text-sm font-bold uppercase outline-none focus:bg-neutral-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">City</label>
                <input 
                  type="text" 
                  required
                  value={formData.city} 
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full border-2 border-black p-3 text-sm font-bold uppercase outline-none focus:bg-neutral-50"
                />
              </div>
            </div>
          </div>

          {/* PAYMENT METHOD SECTION */}
          <div className="border-2 border-black p-6 bg-white">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">
              02 // PAYMENT GATEWAY
            </h2>
            <div className="space-y-3">
              {[
                { id: 'upi', label: 'UPI / QR CODE', desc: 'Instant verification via GPay, PhonePe, Paytm' },
                { id: 'card', label: 'CREDIT / DEBIT CARD', desc: 'Visa, Mastercard, RuPay with 3D Secure' },
                { id: 'netbanking', label: 'NET BANKING', desc: 'All major Indian commercial banks supported' },
                { id: 'cod', label: 'CASH ON DELIVERY', desc: 'Available for verified addresses' },
              ].map(method => (
                <label 
                  key={method.id} 
                  className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === method.id 
                      ? 'border-black bg-neutral-50' 
                      : 'border-gray-300 hover:border-black bg-white'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="payment"
                    value={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={() => setFormData({ ...formData, paymentMethod: method.id })}
                    className="accent-black mt-1"
                  />
                  <div>
                    <span className="block text-sm font-black uppercase tracking-wider">{method.label}</span>
                    <span className="block text-xs text-gray-500 font-bold mt-0.5">{method.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit"
            className="w-full bg-black text-white font-black text-xl py-5 border-2 border-black hover:bg-white hover:text-black transition-colors uppercase tracking-wider cursor-pointer"
          >
            AUTHORIZE PAYMENT • ₹{totalPrice.toLocaleString('en-IN')}
          </button>
        </form>

        {/* RIGHT: ORDER SUMMARY (5 cols) */}
        <div className="lg:col-span-5">
          <div className="border-2 border-black p-6 bg-white sticky top-28">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">
              BUILD MANIFEST ({itemCount} ITEMS)
            </h2>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-6">
              {Object.values(build).map((item, idx) => {
                if (!item) return null;
                return (
                  <div key={item._id || idx} className="flex justify-between items-center py-2 border-b border-dashed border-gray-300">
                    <div className="max-w-[70%]">
                      <span className="block text-xs text-gray-500 font-bold uppercase">{item.brand}</span>
                      <span className="block text-sm font-black uppercase truncate">{item.name}</span>
                    </div>
                    <span className="text-sm font-black">₹{item.price?.toLocaleString('en-IN')}</span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 pt-4 border-t-2 border-black">
              <div className="flex justify-between text-xs font-bold uppercase text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase text-gray-600">
                <span>Shipping & Insurance</span>
                <span className="text-black font-black">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase text-gray-600">
                <span>GST (18% Included)</span>
                <span>₹{Math.round(totalPrice * 0.18).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t-2 border-black">
                <span className="text-sm font-black uppercase tracking-wider">Total</span>
                <span className="text-3xl font-black">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ORDER CONFIRMATION MODAL */}
      {isOrdered && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black p-8 md:p-12 max-w-lg w-full text-center space-y-6">
            <span className="inline-block bg-black text-white text-xs font-black uppercase tracking-widest px-3 py-1">
              PAYMENT VERIFIED
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tight">
              ORDER CONFIRMED
            </h2>
            <p className="text-sm text-gray-600 font-bold uppercase tracking-wider">
              Your custom rig order has been queued for precision assembly and hardware stress-testing.
            </p>
            <div className="border border-black p-4 bg-neutral-50 text-xs font-mono font-bold uppercase space-y-1">
              <div>TRACKING ID: PC4U-{(Math.random() * 1000000).toFixed(0)}</div>
              <div>RECIPIENT: {formData.name}</div>
              <div>AMOUNT PAID: ₹{totalPrice.toLocaleString('en-IN')}</div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-black text-white font-black py-4 border-2 border-black hover:bg-white hover:text-black transition-colors uppercase tracking-wider cursor-pointer"
            >
              RETURN TO BUILD SPACE
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
