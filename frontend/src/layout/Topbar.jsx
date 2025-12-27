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
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 shadow-sm">
      <h1 className="text-gray-900 font-semibold text-xl lg:text-2xl">
        {pageTitle}
      </h1>
    </header>
  );
};

export default Topbar;
