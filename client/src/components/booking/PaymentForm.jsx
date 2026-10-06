import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatters';

export default function PaymentForm({ amount, onSubmit, loading }) {
  const [method, setMethod] = useState('UPI');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(method);
  };

  return (
    <div className="bg-white border border-[#E6E6E1] rounded-xl overflow-hidden">
      <div className="flex border-b border-[#E6E6E1]">
        {['UPI', 'Card', 'Net Banking'].map(t => (
          <button
            key={t}
            type="button"
            className={`flex-1 py-4 text-sm font-medium transition-colors ${method === t ? 'text-[#315C4B] border-b-2 border-[#315C4B] bg-[#F7F7F5]' : 'text-[#6B6B67] hover:bg-[#F7F7F5]'}`}
            onClick={() => setMethod(t)}
          >
            {t === 'UPI' ? 'UPI' : t === 'Card' ? 'Credit/Debit Card' : 'Net Banking'}
          </button>
        ))}
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          {method === 'UPI' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#6B6B67] mb-1">UPI ID</label>
                <input
                  type="text"
                  placeholder="username@upi"
                  className="w-full h-12 px-4 border border-[#E6E6E1] rounded-lg focus:outline-none focus:border-[#315C4B]"
                  required
                />
              </div>
              <p className="text-xs text-[#6B6B67]">A payment request will be sent to your UPI app.</p>
            </div>
          )}

          {method === 'Card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#6B6B67] mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  maxLength="19"
                  className="w-full h-12 px-4 border border-[#E6E6E1] rounded-lg focus:outline-none focus:border-[#315C4B]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#6B6B67] mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full h-12 px-4 border border-[#E6E6E1] rounded-lg focus:outline-none focus:border-[#315C4B]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B6B67] mb-1">CVV</label>
                  <input
                    type="password"
                    placeholder="***"
                    maxLength="4"
                    className="w-full h-12 px-4 border border-[#E6E6E1] rounded-lg focus:outline-none focus:border-[#315C4B]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6B6B67] mb-1">Cardholder Name</label>
                <input
                  type="text"
                  className="w-full h-12 px-4 border border-[#E6E6E1] rounded-lg focus:outline-none focus:border-[#315C4B]"
                  required
                />
              </div>
            </div>
          )}

          {method === 'Net Banking' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#6B6B67] mb-1">Select Bank</label>
                <select 
                  className="w-full h-12 px-4 border border-[#E6E6E1] rounded-lg focus:outline-none focus:border-[#315C4B] bg-white"
                  required
                >
                  <option value="">Choose your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="pnb">Punjab National Bank</option>
                  <option value="bob">Bank of Baroda</option>
                </select>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[#E6E6E1]">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#315C4B] text-white rounded-lg font-bold hover:bg-[#234F3E] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">lock</span>
                  Pay {formatCurrency(amount)}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
