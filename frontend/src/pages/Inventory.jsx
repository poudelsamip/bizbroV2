import axios from "axios";
import React, { useEffect, useState } from "react";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockToAdd, setStockToAdd] = useState("");
  const [stockCostPrice, setStockCostPrice] = useState("");
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
    };
    getInventoryAndSuppliers();
  }, []);

  return (
    <div>
      <div className="max-w-7xl">
        <div className="">
          <div className="pb-6 flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by product name or supplier..."
                className="w-90 px-4 py-2 bg-gray-700 border border-gray-600 outline-0 text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 mr-1 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium whitespace-nowrap"
            >
              ADD NEW PRODUCT
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    S.N
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Cost Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Selling Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Stock Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredInventory.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredInventory.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">
                            {index + 1}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-white">
                          {item.name}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-200">
                          {item.supplier.name || item.supplier}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-200">
                          Rs. {item.costPrice.toFixed(2)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-white">
                          Rs. {item.sellingPrice.toFixed(2)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-white">
                          {item.quantity}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-white">
                          Rs. {getTotalValue(item).toFixed(2)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleAddStockModal(item)}
                          className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium"
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-gray-700 border-t border-gray-600 flex justify-between items-center">
            <p className="text-sm text-gray-300">
              Showing {filteredInventory.length} of {inventory.length} products
            </p>
            <div className="flex gap-6 text-sm">
              <span className="text-gray-300">
                Total Stock Value:{" "}
                <span className="font-semibold text-white">
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

      {/* new product modal */}
      {isModalOpen && (
        <div className="fixed inset-0 addForm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-600 w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-600">
              <h2 className="text-xl font-bold text-white">Add New Product</h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-200 transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0  "
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Supplier
                  </label>
                  <select
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0  "
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Cost Price
                  </label>
                  <input
                    type="number"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0  "
                    placeholder="Enter cost price"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Selling Price
                  </label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0  "
                    placeholder="Enter selling price"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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
        <div className="fixed inset-0 addForm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-600 w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-600">
              <h2 className="text-xl font-bold text-white">Add Stock</h2>
              <button
                onClick={handleCancelStockModal}
                className="text-gray-400 hover:text-gray-200 transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.name}
                    disabled
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-400 outline-0 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Current Quantity
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.quantity || 0}
                    disabled
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-400 outline-0 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Cost Price per Unit
                  </label>
                  <input
                    type="number"
                    value={stockCostPrice}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0"
                    placeholder="Enter cost price"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Quantity to Add
                  </label>
                  <input
                    type="number"
                    value={stockToAdd}
                    onChange={(e) => setStockToAdd(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0"
                    placeholder="Enter quantity to add"
                    min="1"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
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
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 font-semibold outline-0 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
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
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 font-semibold outline-0 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={handleCancelStockModal}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAddStock}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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
