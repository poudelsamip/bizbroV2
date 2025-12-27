import axios from "axios";
import { useEffect, useState } from "react";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState([]);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.referenceId.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.referenceId.businessName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.remark?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || transaction.type?.toLowerCase() === filterType;

    return matchesSearch && matchesType;
  });

  const totalReceived = filteredTransactions
    .filter((t) => t.type?.toLowerCase() === "customer")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalPaid = filteredTransactions
    .filter((t) => t.type?.toLowerCase() === "supplier")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  useEffect(() => {
    const getSales = async () => {
      const transactionsData = await axios.get("/api/transactions");
      setTransactions(transactionsData.data);
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
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search by name, business, or remark..."
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Types</option>
              <option value="customer">Customer</option>
              <option value="supplier">Supplier</option>
            </select>
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
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Party
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Remark
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((transaction, index) => (
                      <tr
                        key={transaction._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900 uppercase">
                            {transaction.type}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">
                            {transaction.referenceId?.name || "N/A"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`text-sm font-bold ${
                              transaction.type?.toLowerCase() === "customer"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type?.toLowerCase() === "customer" ? "+" : "-"}
                            Rs. {transaction.amount?.toFixed(2) || "0.00"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {transaction.remark || "-"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredTransactions.length}</span> of{" "}
                <span className="font-semibold">{transactions.length}</span> transactions
              </p>
              <div className="flex gap-6 text-sm">
                <span className="text-gray-600">
                  Total Received:{" "}
                  <span className="font-bold text-green-600">
                    Rs. {totalReceived.toFixed(2)}
                  </span>
                </span>
                <span className="text-gray-600">
                  Total Paid:{" "}
                  <span className="font-bold text-red-600">
                    Rs. {totalPaid.toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
