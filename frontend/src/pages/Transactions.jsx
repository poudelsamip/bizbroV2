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

    const matchesType = filterType === "all" || transaction.type === filterType;

    return matchesSearch && matchesType;
  });

  const totalReceived = filteredTransactions
    .filter((t) => t.type === "customer")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPaid = filteredTransactions
    .filter((t) => t.type === "supplier")
    .reduce((sum, t) => sum + t.amount, 0);

  useEffect(() => {
    const getSales = async () => {
      const transactionsData = await axios.get("/api/transactions");
      setTransactions(transactionsData.data);
      setLoading(false);
    };
    getSales();
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
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search by name, business, or remark..."
                className="w-90 px-4 py-2 bg-gray-700 border border-gray-600 outline-0 text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 outline-0 text-white"
              >
                <option value="all">All Types</option>
                <option value="customer">Customer</option>
                <option value="supplier">Supplier</option>
              </select>
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
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Party
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Remark
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction, index) => (
                    <tr
                      key={transaction._id}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-white">
                          {index + 1}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-white">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-white">
                          {transaction.type.toUpperCase()}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">
                            {transaction.referenceId.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`text-sm font-bold ${
                            transaction.type === "Customer"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {transaction.type === "Customer" ? "+" : "-"}
                          Rs. {transaction.amount.toFixed(2)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-300">
                          {transaction.remark || "-"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-gray-700 border-t border-gray-600 flex justify-between items-center">
            <p className="text-sm text-gray-300">
              Showing {filteredTransactions.length} of {transactions.length}{" "}
              transactions
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
