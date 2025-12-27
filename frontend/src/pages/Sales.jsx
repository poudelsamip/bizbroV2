import { useEffect, useState } from "react";
import SalesReceipt from "../components/SalesReceipt";
import axios from "axios";

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [loading, setLoading] = useState(true);

  const [sales, setSales] = useState([]);

  const filteredSales =
    sales.length > 0
      ? sales.filter(
          (sale) =>
            sale.customer.businessName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            sale.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

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
      setLoading(false);
    };
    getSales();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading data...</p>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by customer or payment method..."
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      S.N
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total Amount
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSales.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No sales found
                      </td>
                    </tr>
                  ) : (
                    filteredSales.map((sale, index) => (
                      <tr
                        key={sale._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            {sale.customer?.businessName && (
                              <span className="text-sm font-semibold text-gray-900">
                                {sale.customer.businessName}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            {sale.products?.map((item, idx) => (
                              <span key={idx} className="text-sm text-gray-700">
                                {item.product?.name || "N/A"} x {item.quantity}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">
                            Rs. {sale.totalAmount?.toFixed(2) || "0.00"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900 uppercase">
                            {sale.paymentMethod || "N/A"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {new Date(sale.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewReceipt(sale)}
                            className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm font-medium rounded-lg shadow-sm hover:shadow"
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

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">{filteredSales.length}</span> of{" "}
                <span className="font-semibold">{sales.length}</span> sales
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedSale && (
        <SalesReceipt saleData={selectedSale} onClose={handleCloseReceipt} />
      )}
    </div>
  );
};

export default Sales;
