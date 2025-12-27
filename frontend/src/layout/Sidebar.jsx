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

/* Active / inactive link styles */
const linkClass = ({ isActive }) =>
  `px-4 py-3 flex items-center gap-3 rounded-lg mx-2 my-1 transition-all duration-200 ${
    isActive
      ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
  }`;

/* Sidebar groups config */
const sidebarGroups = [
  {
    title: "Main",
    links: [
      {
        to: "/dashboard",
        label: "Dashboard",
        icon: BiSolidDashboard,
      },
    ],
  },
  {
    title: "Management",
    links: [
      {
        to: "/customers",
        label: "Customers",
        icon: MdPeople,
      },
      {
        to: "/suppliers",
        label: "Suppliers",
        icon: MdLocalShipping,
      },
      {
        to: "/inventory",
        label: "Inventory",
        icon: MdInventory2,
      },
    ],
  },
  {
    title: "Sales",
    links: [
      {
        to: "/purchases",
        label: "Purchases",
        icon: MdShoppingCart,
      },
      {
        to: "/sell",
        label: "Sell",
        icon: MdSell,
      },
      {
        to: "/sales",
        label: "Sales",
        icon: MdSell,
      },
    ],
  },
  {
    title: "Finance",
    links: [
      {
        to: "/transactions",
        label: "Transactions",
        icon: FaMoneyBillTransfer,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="flex flex-col bg-white border-r border-gray-200 w-64 overflow-hidden shadow-sm">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          BizBro
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col px-2 space-y-4">
          {sidebarGroups.map((group) => (
            <div key={group.title}>
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase mb-2">
                {group.title}
              </p>

              {group.links.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} className={linkClass}>
                  <Icon size={20} />
                  <span className="text-sm">{label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Profile */}
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
