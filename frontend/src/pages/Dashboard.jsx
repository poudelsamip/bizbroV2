import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiTrendingUp,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiCreditCard,
} from "react-icons/fi";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("month");

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/dashboard?range=${range}`);
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [range]);

  if (loading)
    return (
      <div className="p-10 text-gray-400 font-medium">Loading analytics...</div>
    );

  const fmt = (num) => `Rs. ${Number(num || 0).toLocaleString()}`;

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-slate-900">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-end mb-5 items-center">
        <div className="flex bg-white border border-slate-100 p-1 rounded-xl shadow-sm">
          {["7days", "month", "year", "all"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                range === r
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KPICard
          title="Revenue"
          value={fmt(stats.totalSales)}
          icon={<FiTrendingUp />}
          color="text-blue-600 bg-blue-50"
        />
        <KPICard
          title="Purchases"
          value={fmt(stats.totalPurchases)}
          icon={<FiShoppingBag />}
          color="text-purple-600 bg-purple-50"
        />
        <KPICard
          title="Collections"
          value={fmt(stats.totalReceived)}
          icon={<FiCreditCard />}
          color="text-emerald-600 bg-emerald-50"
        />
        <KPICard
          title="Low Stock"
          value={stats.lowStockCount}
          icon={<FiPackage />}
          color="text-rose-600 bg-rose-50"
        />
      </div>

      {/* LEADERBOARDS - TWO PER ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <RankCard
          title="Top Customers"
          data={stats.topSalesCustomers}
          valKey="total"
          isCurr={true}
        />
        <RankCard
          title="Top Suppliers"
          data={stats.topPurchaseSuppliers}
          valKey="total"
          isCurr={true}
        />
        <RankCard
          title="Most Sold"
          data={stats.mostSoldProducts}
          valKey="qty"
          unit=" Sold"
        />
        <RankCard
          title="Most Purchased"
          data={stats.mostPurchasedProducts}
          valKey="totalSpent"
          isCurr={true}
        />
      </div>

      {/* DUES MONITOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DueBox
          title="Outstanding Customer Dues"
          data={stats.topCustomerDues}
          color="text-rose-500"
        />
        <DueBox
          title="Outstanding Supplier Dues"
          data={stats.topSupplierDues}
          color="text-orange-500"
        />
      </div>
    </div>
  );
};

// Helper Components
const KPICard = ({ title, value, icon, color }) => (
  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color}`}
    >
      {icon}
    </div>
    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
      {title}
    </p>
    <p className="text-2xl font-black mt-1">{value}</p>
  </div>
);

const RankCard = ({ title, data, valKey, isCurr, unit = "" }) => (
  <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
    <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-50 pb-4">
      {title}
    </h3>
    <div className="space-y-5">
      {data?.length > 0 ? (
        data.map((item, i) => (
          <div key={i} className="flex justify-between items-center text-sm">
            <span className="font-semibold text-slate-500">
              {item.info?.name}
            </span>
            <span className="font-bold text-slate-900">
              {isCurr
                ? `Rs. ${item[valKey].toLocaleString()}`
                : `${item[valKey]}${unit}`}
            </span>
          </div>
        ))
      ) : (
        <p className="text-sm text-slate-300 italic">
          No rankings available for this period.
        </p>
      )}
    </div>
  </div>
);

const DueBox = ({ title, data, color }) => (
  <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
    <h3 className="text-lg font-bold text-slate-800 mb-6">{title}</h3>
    {data?.map((item, i) => (
      <div
        key={i}
        className="flex justify-between py-3 border-b border-slate-50 last:border-0"
      >
        <span className="text-sm font-semibold text-slate-600">
          {item.name}
        </span>
        <span className={`text-sm font-bold ${color}`}>
          Rs. {item.balance.toLocaleString()}
        </span>
      </div>
    ))}
  </div>
);

export default Dashboard;
