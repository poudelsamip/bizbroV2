import { useEffect, useState } from "react";
import axios from "axios";

const Purchases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [purchases, setPurchases] = useState([]);

  const filteredPurchases =
    purchases.length > 0
      ? purchases.filter(
          (purchase) =>
            purchase.supplier.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            purchase.supplier.businessName
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            purchase.paymentMethod
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
      : [];

  useEffect(() => {
    const getPurchases = async () => {
      const purchaseData = await axios.get("/api/purchases");
      setPurchases(purchaseData.data);
      setLoading(false);
    };
    getPurchases();
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
                placeholder="Search by supplier or payment method..."
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
                      Supplier
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Items
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPurchases.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No purchases found
                      </td>
                    </tr>
                  ) : (
                    filteredPurchases.map((purchase, index) => (
                      <tr
                        key={purchase._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">
                            {purchase.supplier?.name || "N/A"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {purchase.itemInfo?.item?.name || "N/A"} x{" "}
                            {purchase.itemInfo?.quantity || 0}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">
                            Rs. {purchase.totalAmount?.toFixed(2) || "0.00"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900 uppercase">
                            {purchase.paymentMethod || "N/A"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {new Date(purchase.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredPurchases.length}</span> of{" "}
                <span className="font-semibold">{purchases.length}</span> purchases
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchases;
