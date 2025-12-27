import React from "react";
import { FaTimes, FaPrint } from "react-icons/fa";

const SalesReceipt = ({ saleData, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const totalAmount = saleData.products?.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  ) || 0;

  const receivedAmount = saleData.receivedAmount || totalAmount;
  const dueAmount = totalAmount - receivedAmount;

  const receiptId = saleData._id || `Bill-${Date.now()}`;
  const receiptDate = saleData.createdAt 
    ? new Date(saleData.createdAt).toLocaleDateString()
    : new Date().toLocaleDateString();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 z-50 overflow-y-auto print:bg-white print:backdrop-blur-none">
      <div className="relative max-w-2xl w-full my-8 print:my-0">
        {/* Action Buttons */}
        <div className="absolute -right-4 sm:-right-32 top-0 flex flex-col gap-3 mb-4 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <FaTimes size={14} />
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <FaPrint size={14} />
            Print
          </button>
        </div>

        {/* Receipt Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 print:shadow-none print:rounded-none">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              BIZBRO
            </h1>
            <p className="text-sm text-gray-600 uppercase tracking-wider">
              Sales Invoice
            </p>
          </div>

          {/* Receipt Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Receipt No
              </p>
              <p className="text-sm font-semibold text-gray-900">
                #{receiptId.slice(-8).toUpperCase()}
              </p>
            </div>
            <div className="text-right sm:text-left">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Date
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {receiptDate}
              </p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              Bill To
            </p>
            
              <p className="font-semibold mb-1">
                {saleData.customer.businessName}
              </p>
            
            {saleData.customer?.address && (
              <p className="text-sm">
                {saleData.customer.address}
              </p>
            )}
            {saleData.customer?.phone && (
              <p className="text-sm text-gray-600 mt-1">
                Phone: {saleData.customer.phone}
              </p>
            )}
          </div>

          {/* Products Table */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {saleData.products?.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {item.product?.name || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 text-right">
                      Rs. {(item.price || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 text-right">
                      {item.quantity || 0}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900 text-right">
                      Rs. {((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mb-8">
            <div className="flex justify-end">
              <div className="w-full sm:w-80">
                <div className="space-y-2">
                  
                  <div className="flex justify-between py-3 px-4  mt-4">
                    <span className="text-base font-bold text-gray-900">
                      Total Amount:
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      Rs. {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="mb-8 text-center">
            <div className="inline-block text-lg font-bold uppercase tracking-wide text-gray-900">
              {saleData.paymentMethod === "cash" ? "Paid Cash" : "On Credit"}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-200 pt-6 text-center">
              <p className="text-xs text-gray-500">
              This is a computer generated receipt.
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Thank you for your business!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReceipt;
