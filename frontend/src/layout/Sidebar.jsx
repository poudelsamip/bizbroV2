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

const linkClass = ({ isActive }) =>
  `px-4 py-3 border-b border-slate-700 hover:bg-slate-700 flex items-center gap-3 ${
    isActive ? "bg-slate-700 text-blue-400" : "text-white"
  }`;

const Sidebar = () => {
  return (
    <aside className="bg-slate-800 border-r border-slate-700 w-60 overflow-hidden">
      <div className="h-14 flex items-center px-4 border-b border-slate-700 font-bold text-4xl">
        👊 BizBro
      </div>

      <nav className="flex flex-col">
        <NavLink to="/dashboard" className={linkClass}>
          <BiSolidDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/customers" className={linkClass}>
          <MdPeople size={20} />
          <span>Customers</span>
        </NavLink>

        <NavLink to="/suppliers" className={linkClass}>
          <MdLocalShipping size={20} />
          <span>Suppliers</span>
        </NavLink>

        <NavLink to="/inventory" className={linkClass}>
          <MdInventory2 size={20} />
          <span>Inventory</span>
        </NavLink>

        <NavLink to="/purchases" className={linkClass}>
          <MdShoppingCart size={20} />
          <span>Purchases</span>
        </NavLink>

        <NavLink to="/sell" className={linkClass}>
          <MdSell size={20} />
          <span>Sell</span>
        </NavLink>

        <NavLink to="/sales" className={linkClass}>
          <MdSell size={20} />
          <span>Sales</span>
        </NavLink>

        <NavLink to="/transactions" className={linkClass}>
          <FaMoneyBillTransfer size={20} />
          <span>Transactions</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
