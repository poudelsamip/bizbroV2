import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiTrendingUp,
  FiShoppingCart,
  FiDownload,
  FiUpload,
  FiUsers,
  FiPackage,
} from "react-icons/fi";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await axios.get("/api/dashboard");
        setStats(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const renderCurrency = (amount) => `Rs. ${Number(amount || 0).toFixed(2)}`;

  return (
    <div className="text-white">
      <div className="max-w-7xl ">
        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-700 text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(7)].map((_, idx) => (
              <div key={idx} className="h-28 bg-gray-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="border border-gray-800 bg-gray-800/80 p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Sales (Month)</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {renderCurrency(stats?.totalSalesThisMonth ?? 0)}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center bg-gray-700 text-xl text-white">
                    <FiTrendingUp />
                  </div>
                </div>
              </div>

              <div className="border border-gray-800 bg-gray-800/80 p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Purchases (Month)</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {renderCurrency(stats?.totalPurchasesThisMonth ?? 0)}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center bg-gray-700 text-xl text-white">
                    <FiShoppingCart />
                  </div>
                </div>
              </div>

              <div className="border border-gray-800 bg-gray-800/80 p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Received (Month)</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {renderCurrency(stats?.totalReceivedThisMonth ?? 0)}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center bg-gray-700 text-xl text-white">
                    <FiDownload />
                  </div>
                </div>
              </div>

              <div className="border border-gray-800 bg-gray-800/80 p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Paid (Month)</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {renderCurrency(stats?.totalPaidThisMonth ?? 0)}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center bg-gray-700 text-xl text-white">
                    <FiUpload />
                  </div>
                </div>
              </div>

              <div className="border border-gray-800 bg-gray-800/80 p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Customer Due</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {renderCurrency(stats?.totalCustomerDue ?? 0)}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center bg-gray-700 text-xl text-white">
                    <FiUsers />
                  </div>
                </div>
              </div>

              <div className="border border-gray-800 bg-gray-800/80 p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Supplier Due</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {renderCurrency(stats?.totalSupplierDue ?? 0)}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center bg-gray-700 text-xl text-white">
                    <FiUsers />
                  </div>
                </div>
              </div>

              <div className="border border-gray-800 bg-gray-800/80 p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Items</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {Number(stats?.totalItems ?? 0)}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center bg-gray-700 text-xl text-white">
                    <FiPackage />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-800 bg-gray-800/80 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Recent Sale</h2>
                    <p className="text-sm text-gray-400">
                      Last recorded customer sale
                    </p>
                  </div>
                  <FiTrendingUp className="text-2xl text-white" />
                </div>
                {stats?.recentSale ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Customer</span>
                      <span className="font-medium">
                        {stats.recentSale.customer?.name ||
                          stats.recentSale.customer?.businessName ||
                          "N/A"}
                      </span>
                    </div>

                    {stats.recentSale.receivedAmount !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Amount</span>
                        <span>
                          {renderCurrency(stats.recentSale.receivedAmount)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Payment</span>
                      <span className="uppercase">
                        {stats.recentSale.paymentMethod}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Date</span>
                      <span>
                        {new Date(
                          stats.recentSale.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No sales recorded yet.</p>
                )}
              </div>

              <div className="border border-gray-800 bg-gray-800/80 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Recent Transaction
                    </h2>
                    <p className="text-sm text-gray-400">
                      Latest cash movement
                    </p>
                  </div>
                  <FiUpload className="text-2xl text-white" />
                </div>
                {stats?.recentTransaction ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">To/From</span>
                      <span className="font-medium">
                        {stats.recentTransaction.referenceId?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Type</span>
                      <span className="uppercase">
                        {stats.recentTransaction.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Transaction</span>
                      <span className="uppercase">
                        {stats.recentTransaction.transactionType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Amount</span>
                      <span className="font-semibold">
                        {renderCurrency(stats.recentTransaction.amount)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Date</span>
                      <span>
                        {new Date(
                          stats.recentTransaction.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No transactions recorded yet.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
