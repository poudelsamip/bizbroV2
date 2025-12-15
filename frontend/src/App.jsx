import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";
import Purchases from "./pages/Purchases";
import Supplires from "./pages/Suppliers";
import Transaction from "./pages/Transactions";

import Layout from "./layout/Layout";
import ProtectedRoute from "./components/ProtectedRoutes";
import axios from "axios";
import SellProduct from "./pages/SellProduct";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sell" element={<SellProduct />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/suppliers" element={<Supplires />} />
        <Route path="/transactions" element={<Transaction />} />
      </Route>
    </Routes>
  );
}

export default App;
