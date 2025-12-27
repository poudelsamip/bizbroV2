import axios from "axios";
import React, { useEffect, useState } from "react";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockToAdd, setStockToAdd] = useState("");
  const [stockCostPrice, setStockCostPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    supplier: "",
    costPrice: "",
    sellingPrice: "",
  });

  const [inventory, setInventory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const filteredInventory =
    inventory.length > 0
      ? inventory.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const handleAddStockModal = (item) => {
    setSelectedProduct(item);
    setStockToAdd("");
    setStockCostPrice(item.costPrice.toString());
    setIsStockModalOpen(true);
  };

  const handleConfirmAddStock = async () => {
    if (!stockToAdd || parseInt(stockToAdd) <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    try {
      const purchaseData = {
        supplier: selectedProduct.supplier._id,
        productInfo: {
          product: selectedProduct._id,
          quantity: parseInt(stockToAdd),
        },
        paymentMethod: "cash",
      };

      await axios.post("/api/purchases", purchaseData);

      const inventoryData = await axios.get("/api/products");
      setInventory(inventoryData.data);

      setIsStockModalOpen(false);
      setSelectedProduct(null);
      setStockToAdd("");
      setStockCostPrice("");
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Failed to add stock");
    }
  };

  const handleCancelStockModal = () => {
    setIsStockModalOpen(false);
    setSelectedProduct(null);
    setStockToAdd("");
    setStockCostPrice("");
  };

  const getTotalValue = (item) => {
    return item.costPrice * item.quantity;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    if (
      !formData.name ||
      !formData.supplier ||
      !formData.costPrice ||
      !formData.sellingPrice
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const productData = {
      name: formData.name,
      supplier: formData.supplier,
      costPrice: parseInt(formData.costPrice),
      sellingPrice: parseInt(formData.sellingPrice),
    };

    const addedProduct = await axios.post("/api/products", productData);
    console.log(addedProduct.data.supplier);
    setInventory((prev) => [addedProduct.data, ...prev]);

    setFormData({
      name: "",
      supplier: "",
      costPrice: "",
      sellingPrice: "",
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      supplier: "",
      costPrice: "",
      sellingPrice: "",
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getInventoryAndSuppliers = async () => {
      const [suppliersData, inventoryData] = await Promise.all([
        axios.get("/api/suppliers"),
        axios.get("/api/products"),
      ]);
      setInventory(inventoryData.data);
      setSuppliers(suppliersData.data);
      setLoading(false);
    };
    getInventoryAndSuppliers();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading data...</p>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search by product name or supplier..."
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm font-semibold whitespace-nowrap rounded-lg shadow-md hover:shadow-lg"
            >
              + Add New Product
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      S.N
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Cost Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Selling Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stock Value
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No products found
                      </td>
                    </tr>
                  ) : (
                    filteredInventory.map((item, index) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">
                            {item.name}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {item.supplier.name || item.supplier}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            Rs. {item.costPrice.toFixed(2)}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">
                            Rs. {item.sellingPrice.toFixed(2)}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-gray-900">
                            {item.quantity}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">
                            Rs. {getTotalValue(item).toFixed(2)}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleAddStockModal(item)}
                            className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm font-medium rounded-lg shadow-sm hover:shadow"
                          >
                            Add Stock
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredInventory.length}</span> of{" "}
                <span className="font-semibold">{inventory.length}</span> products
              </p>
              <div className="text-sm">
                <span className="text-gray-600">
                  Total Stock Value:{" "}
                  <span className="font-bold text-gray-900">
                    Rs.{" "}
                    {filteredInventory
                      .reduce((sum, item) => sum + getTotalValue(item), 0)
                      .toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* new product modal */}
      {isModalOpen && (
        <div className="fixed inset-0 addForm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supplier
                  </label>
                  <select
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a supplier</option>
                    {suppliers.length > 0 &&
                      suppliers.map((supplier) => (
                        <option key={supplier._id} value={supplier._id}>
                          {supplier.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost Price
                  </label>
                  <input
                    type="number"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter cost price"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selling Price
                  </label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter selling price"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-lg font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* new stock modal */}
      {isStockModalOpen && selectedProduct && (
        <div className="fixed inset-0 addForm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add Stock</h2>
              <button
                onClick={handleCancelStockModal}
                className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.name}
                    disabled
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 outline-none cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Quantity
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.quantity || 0}
                    disabled
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 outline-none cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost Price per Unit
                  </label>
                  <input
                    type="number"
                    value={stockCostPrice}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 outline-none cursor-not-allowed"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity to Add
                  </label>
                  <input
                    type="number"
                    value={stockToAdd}
                    onChange={(e) => setStockToAdd(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter quantity to add"
                    min="1"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Cost
                  </label>
                  <input
                    type="text"
                    value={
                      stockToAdd &&
                      stockCostPrice &&
                      parseInt(stockToAdd) > 0 &&
                      parseFloat(stockCostPrice) > 0
                        ? `Rs. ${(
                            parseInt(stockToAdd) * parseFloat(stockCostPrice)
                          ).toFixed(2)}`
                        : "Rs. 0.00"
                    }
                    disabled
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-semibold text-gray-900 outline-none cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Total Quantity
                  </label>
                  <input
                    type="text"
                    value={
                      stockToAdd && parseInt(stockToAdd) > 0
                        ? (selectedProduct.quantity || 0) + parseInt(stockToAdd)
                        : selectedProduct.quantity || 0
                    }
                    disabled
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-semibold text-gray-900 outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={handleCancelStockModal}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-lg font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAddStock}
                  className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Add Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
