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
    <div>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(7)].map((_, idx) => (
            <div key={idx} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Sales (Month)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {renderCurrency(stats?.totalSalesThisMonth ?? 0)}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center bg-blue-50 rounded-lg text-blue-600">
                  <FiTrendingUp size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Purchases (Month)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {renderCurrency(stats?.totalPurchasesThisMonth ?? 0)}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center bg-purple-50 rounded-lg text-purple-600">
                  <FiShoppingCart size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Received (Month)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {renderCurrency(stats?.totalReceivedThisMonth ?? 0)}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center bg-green-50 rounded-lg text-green-600">
                  <FiDownload size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Paid (Month)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {renderCurrency(stats?.totalPaidThisMonth ?? 0)}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center bg-orange-50 rounded-lg text-orange-600">
                  <FiUpload size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Customer Due</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {renderCurrency(stats?.totalCustomerDue ?? 0)}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center bg-indigo-50 rounded-lg text-indigo-600">
                  <FiUsers size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Supplier Due</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {renderCurrency(stats?.totalSupplierDue ?? 0)}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center bg-pink-50 rounded-lg text-pink-600">
                  <FiUsers size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Number(stats?.totalItems ?? 0)}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center bg-cyan-50 rounded-lg text-cyan-600">
                  <FiPackage size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Recent Sale</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Last recorded customer sale
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center bg-blue-50 rounded-lg text-blue-600">
                  <FiTrendingUp size={20} />
                </div>
              </div>
              {stats?.recentSale ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Customer</span>
                    <span className="text-sm font-medium text-gray-900">
                      {stats.recentSale.customer?.name ||
                        stats.recentSale.customer?.businessName ||
                        "N/A"}
                    </span>
                  </div>

                  {stats.recentSale.receivedAmount !== undefined && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Amount</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {renderCurrency(stats.recentSale.receivedAmount)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Payment</span>
                    <span className="text-sm font-medium text-gray-900 uppercase">
                      {stats.recentSale.paymentMethod}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">Date</span>
                    <span className="text-sm text-gray-900">
                      {new Date(
                        stats.recentSale.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No sales recorded yet.</p>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Transaction
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Latest cash movement
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center bg-green-50 rounded-lg text-green-600">
                  <FiUpload size={20} />
                </div>
              </div>
              {stats?.recentTransaction ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">To/From</span>
                    <span className="text-sm font-medium text-gray-900">
                      {stats.recentTransaction.referenceId?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="text-sm font-medium text-gray-900 uppercase">
                      {stats.recentTransaction.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Transaction</span>
                    <span className="text-sm font-medium text-gray-900 uppercase">
                      {stats.recentTransaction.transactionType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {renderCurrency(stats.recentTransaction.amount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">Date</span>
                    <span className="text-sm text-gray-900">
                      {new Date(
                        stats.recentTransaction.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No transactions recorded yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
