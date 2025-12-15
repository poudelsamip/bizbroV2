import { useEffect, useState } from "react";
import SalesReceipt from "../components/SalesReceipt";
import axios from "axios";

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);

  const [sales, setSales] = useState([]);

  const filteredSales = sales.length > 0 ? sales.filter(
    (sale) =>
      sale.customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleViewReceipt = (sale) => {
    setSelectedSale(sale);
  };

  const handleCloseReceipt = () => {
    setSelectedSale(null);
  };

  useEffect(() => {
    const getSales = async () => {
      const salesData = await axios.get("/api/sales");
      setSales(salesData.data);
    };
    getSales();
  }, []);

  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl">
        <div className="pb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by customer or payment method..."
              className="w-90 px-4 py-2 bg-gray-700 border border-gray-600 outline-0 text-white placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  S.N
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Received
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredSales.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No sales found
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale, index) => (
                  <tr
                    key={sale._id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                          {index + 1}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                          {sale.customer.name}
                        </span>
                        {sale.customer.businessName && (
                          <span className="text-sm text-gray-200">
                            {sale.customer.businessName}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {sale.products.map((item, idx) => (
                          <span key={idx} className="text-sm text-gray-200">
                            {item.product.name} x {item.quantity}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
                        Rs. {sale.totalAmount.toFixed(2)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-white">
                        Rs. {sale.receivedAmount.toFixed(2)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-white">
                        {sale.paymentMethod.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300">
                        {new Date(sale.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewReceipt(sale)}
                        className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium"
                      >
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-700 border-t border-gray-600">
          <p className="text-sm text-gray-300">
            Showing {filteredSales.length} of {sales.length} sales
          </p>
        </div>
      </div>

      {selectedSale && (
        <SalesReceipt saleData={selectedSale} onClose={handleCloseReceipt} />
      )}
    </div>
  );
};

export default Sales;
