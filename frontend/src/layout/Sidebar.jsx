import { NavLink } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import {
  MdSell,
  MdPeople,
  MdInventory2,
  MdShoppingCart,
  MdLocalShipping,
} from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const linkClass = ({ isActive }) =>
  `px-4 py-3 flex items-center gap-3 rounded-lg mx-2 my-1 transition-all duration-200 ${
    isActive
      ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
  }`;

const Sidebar = () => {
  return (
    <aside className="flex flex-col bg-white border-r border-gray-200 w-64 overflow-hidden shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="rancers text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          BizBro
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col px-2">
          <NavLink to="/dashboard" className={linkClass}>
            <BiSolidDashboard size={20} />
            <span className="text-sm">Dashboard</span>
          </NavLink>

          <NavLink to="/customers" className={linkClass}>
            <MdPeople size={20} />
            <span className="text-sm">Customers</span>
          </NavLink>

          <NavLink to="/suppliers" className={linkClass}>
            <MdLocalShipping size={20} />
            <span className="text-sm">Suppliers</span>
          </NavLink>

          <NavLink to="/inventory" className={linkClass}>
            <MdInventory2 size={20} />
            <span className="text-sm">Inventory</span>
          </NavLink>

          <NavLink to="/purchases" className={linkClass}>
            <MdShoppingCart size={20} />
            <span className="text-sm">Purchases</span>
          </NavLink>

          <NavLink to="/sell" className={linkClass}>
            <MdSell size={20} />
            <span className="text-sm">Sell</span>
          </NavLink>

          <NavLink to="/sales" className={linkClass}>
            <MdSell size={20} />
            <span className="text-sm">Sales</span>
          </NavLink>

          <NavLink to="/transactions" className={linkClass}>
            <FaMoneyBillTransfer size={20} />
            <span className="text-sm">Transactions</span>
          </NavLink>
        </nav>
      </div>
      <div className="border-t border-gray-200 py-2">
        <NavLink to="/profile" className={linkClass}>
          <FaUser size={20} />
          <span className="text-sm">Profile</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
