import React from 'react';
import { FiX, FiCheckCircle, FiDownload } from 'react-icons/fi';

const ReceiptModal = ({ receipt, onClose }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-green-50">
          <div className="flex items-center">
            <FiCheckCircle className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Order Confirmed!</h2>
              <p className="text-green-600">Thank you for your purchase</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {/* Order Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Order ID:</span>
                  <p className="font-mono text-gray-900">{receipt.orderId}</p>
                </div>
                <div>
                  <span className="text-gray-600">Date:</span>
                  <p className="text-gray-900">{formatDate(receipt.timestamp)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Customer:</span>
                  <p className="text-gray-900">{receipt.customerName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="text-gray-900">{receipt.customerEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Items Ordered</h3>
            <div className="space-y-3">
              {receipt.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${item.itemTotal.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">${item.product.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Total Amount:</span>
              <span className="text-2xl font-bold text-primary-600">${receipt.total}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 bg-gray-50">
          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
            >
              <FiDownload className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
