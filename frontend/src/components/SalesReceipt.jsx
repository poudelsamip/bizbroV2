import React from "react";

const SalesReceipt = ({ saleData, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const totalAmount = saleData.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const receiptId = saleData._id || `Bill-${Date.now()}`;

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center p-6 z-50 overflow-y-auto">
      <div className="relative max-w-4xl w-full my-8">
        <div className="absolute -right-24 flex flex-col justify-end gap-4 mb-4 print:hidden">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Print
          </button>
        </div>

        <div className="bg-white text-black p-8">
          <div className="text-center border-b border-black pb-4 mb-6">
            <h1 className="text-3xl font-bold">SALES RECEIPT</h1>
          </div>

          <div className="flex justify-between mb-6 text-sm">
            <div>
              <span className="font-semibold">Receipt No: </span>
              <span>#{receiptId}</span>
            </div>
            <div>
              <span className="font-semibold">Date: </span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mb-6">
            <div>
              <span className="font-semibold">Bill To: </span>
              <span>{saleData.customer.name}</span>
            </div>
            {saleData.customer.businessName && (
              <div className="mt-1">
                <span>{saleData.customer.businessName}</span>
              </div>
            )}
            {saleData.customer.address && (
              <div className="mt-1">
                <span>{saleData.customer.address}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black">
                  <th className="px-4 py-2 text-left text-sm">S.N</th>
                  <th className="px-4 py-2 text-left text-sm">Product</th>
                  <th className="px-4 py-2 text-right text-sm">Price</th>
                  <th className="px-4 py-2 text-right text-sm">Quantity</th>
                  <th className="px-4 py-2 text-right text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {saleData.products.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">{item.product.name}</td>
                    <td className="px-4 py-3 text-right text-sm">
                      Rs. {item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-sm">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className="flex justify-end mb-6">
              <div className="w-64">
                <div className="flex justify-between py-2 px-4">
                  <span className="font-bold">Total Amount:</span>
                  <span className="font-bold">
                    Rs. {totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="inline-block px-6 py-2 font-bold text-lg">
                {saleData.paymentMethod === "cash" ? "PAID CASH" : "ON CREDIT"}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-6 mt-6 text-center">
            <p className="text-sm mb-2">Thank you for visiting us!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReceipt;
