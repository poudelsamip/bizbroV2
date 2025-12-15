import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/sales": "Sales",
  "/sell": "Sell Products",
  "/customers": "Customers",
  "/inventory": "Inventory",
  "/purchases": "Purchases",
  "/suppliers": "Suppliers",
  "/transactions": "Transactions",
};

const Topbar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const pageTitle = PAGE_TITLES[location.pathname] || "";

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="h-14 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4">
      <h1 className="text-white font-bold text-2xl uppercase">{pageTitle}</h1>

      <button className="text-sm text-red-400 " onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Topbar;
