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
    <div className="bg-gray-900">
      {loading ? (
        <div>
          <p className="text-gray-500">loading data ...</p>
        </div>
      ) : (
        <div className="max-w-7xl">
          <div className="pb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by supplier or payment method..."
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
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredPurchases.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      No purchases found
                    </td>
                  </tr>
                ) : (
                  filteredPurchases.map((purchase, index) => (
                    <tr
                      key={purchase._id}
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
                            {purchase.supplier.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-200">
                          {purchase.itemInfo.item.name} x{" "}
                          {purchase.itemInfo.quantity}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-white">
                          Rs. {purchase.totalAmount}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-white">
                          {purchase.paymentMethod.toUpperCase()}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-300">
                          {new Date(purchase.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-gray-700 border-t border-gray-600">
            <p className="text-sm text-gray-300">
              Showing {filteredPurchases.length} of {purchases.length} purchases
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchases;
