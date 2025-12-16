import axios from "axios";
import React, { useEffect, useState } from "react";

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [suppliers, setSuppliers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredSuppliers =
    suppliers.length > 0
      ? suppliers.filter(
          (supplier) =>
            supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.phone?.includes(searchTerm) ||
            supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const handlePayMoney = (supplier) => {
    console.log("Paying money to:", supplier.name);
  };

  const handleAddSupplier = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.address
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newSupplier = await axios.post("/api/suppliers", formData);
    setSuppliers([newSupplier.data, ...suppliers]);

    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function getSuppliersData() {
      const suppliersData = await axios.get("/api/suppliers");
      setSuppliers(suppliersData.data);
      setLoading(false);
    }
    getSuppliersData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <p className="text-gray-500">loading data ...</p>
        </div>
      ) : (
        <div className="max-w-7xl">
          <div className="">
            <div className="pb-6 flex items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by name, phone, or email..."
                  className="w-90 px-4 py-2 bg-gray-700 border border-gray-600 outline-0 text-white placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mr-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium"
              >
                ADD NEW SUPPLIER
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
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Due Amount
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Action
                  </th> */}
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {filteredSuppliers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-gray-400"
                      >
                        No suppliers found
                      </td>
                    </tr>
                  ) : (
                    filteredSuppliers.map((supplier, index) => (
                      <tr
                        key={supplier._id}
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
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">
                              {supplier.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            {supplier.phone && (
                              <span className="text-sm text-gray-200 flex items-center gap-2">
                                {supplier.phone}
                              </span>
                            )}
                            {supplier.email && (
                              <span className="text-sm text-gray-300 flex items-center gap-2">
                                {supplier.email}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {supplier.address ? (
                            <span className="text-sm text-gray-200 flex items-start gap-2">
                              <span className="max-w-xs">
                                {supplier.address}
                              </span>
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-white">
                            {supplier.balance}
                          </span>
                        </td>
                        {/* <td className="px-6 py-4">
                        <button
                          onClick={() => handlePayMoney(supplier)}
                          className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium"
                        >
                          Pay
                        </button>
                      </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-gray-700 border-t border-gray-600">
              <p className="text-sm text-gray-300">
                Showing {filteredSuppliers.length} of {suppliers.length}{" "}
                suppliers
              </p>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed addForm inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-600 w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-600">
              <h2 className="text-xl font-bold text-white">Add New Supplier</h2>
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
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0  "
                    placeholder="Enter supplier name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0  "
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0  "
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Address
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0   resize-none"
                    placeholder="Enter address"
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
                  onClick={handleAddSupplier}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Add Supplier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
