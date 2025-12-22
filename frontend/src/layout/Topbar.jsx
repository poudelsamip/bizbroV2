import { useLocation } from "react-router-dom";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/sales": "Sales",
  "/sell": "Sell Products",
  "/customers": "Customers",
  "/inventory": "Inventory",
  "/purchases": "Purchases",
  "/suppliers": "Suppliers",
  "/transactions": "Transactions",
  "/profile": "Profile",
};

const Topbar = () => {
  const location = useLocation();

  const pageTitle = PAGE_TITLES[location.pathname] || "";

  return (
    <header className="h-14 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4">
      <h1 className="text-white font-bold text-2xl uppercase">{pageTitle}</h1>
    </header>
  );
};

export default Topbar;
