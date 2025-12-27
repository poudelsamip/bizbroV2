import axios from "axios";
import React, { useEffect, useState } from "react";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [receiveAmount, setReceiveAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    address: "",
  });

  const [customers, setCustomers] = useState([]);

  const filteredCustomers =
    customers.length > 0
      ? customers.filter(
          (customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.businessName
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm) ||
            customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const handleReceiveMoney = async () => {
    if (!receiveAmount || parseFloat(receiveAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      await axios.post(
        `/api/customers/${selectedCustomer._id}/receivepayment`,
        {
          amount: parseInt(receiveAmount),
          remark: "received payment from customer",
        }
      );

      setCustomers(
        customers.map((c) =>
          c._id === selectedCustomer._id
            ? { ...c, balance: c.balance - parseInt(receiveAmount) }
            : c
        )
      );

      setIsReceiveModalOpen(false);
      setReceiveAmount("");
      setSelectedCustomer(null);
    } catch (error) {
      alert("Failed to process payment");
      console.error(error);
    }
  };

  const openReceiveModal = (customer) => {
    setSelectedCustomer(customer);
    setIsReceiveModalOpen(true);
  };

  const closeReceiveModal = () => {
    setIsReceiveModalOpen(false);
    setReceiveAmount("");
    setSelectedCustomer(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCustomer = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.businessName ||
      !formData.email ||
      !formData.address
    ) {
      alert("Please fill fields");
      return;
    }

    const newCustomer = await axios.post("/api/customers", formData);
    setCustomers([newCustomer.data, ...customers]);

    setFormData({
      name: "",
      businessName: "",
      phone: "",
      email: "",
      address: "",
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      businessName: "",
      phone: "",
      email: "",
      address: "",
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function getCustomersData() {
      const customersData = await axios.get("/api/customers");
      setCustomers(customersData.data);
      setLoading(false);
    }
    getCustomersData();
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
                placeholder="Search by name, business, phone, or email..."
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm font-semibold whitespace-nowrap rounded-lg shadow-md hover:shadow-lg"
            >
              + Add New Customer
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
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Due Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No customers found
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((customer, index) => (
                      <tr
                        key={customer._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900">
                              {customer.name}
                            </span>
                            {customer.businessName && (
                              <span className="text-sm text-gray-600 mt-1">
                                {customer.businessName}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-700">
                              {customer.phone}
                            </span>
                            {customer.email && (
                              <span className="text-sm text-gray-600">
                                {customer.email}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700 max-w-xs">
                            {customer.address}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-gray-900">
                            Rs. {customer.balance?.toFixed(2) || "0.00"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => openReceiveModal(customer)}
                            className="cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 transition-all text-white text-sm font-medium rounded-lg shadow-sm hover:shadow"
                          >
                            Receive
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredCustomers.length}</span> of{" "}
                <span className="font-semibold">{customers.length}</span> customers
              </p>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 addForm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add New Customer</h2>
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
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter customer name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter address"
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
                  onClick={handleAddCustomer}
                  className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isReceiveModalOpen && selectedCustomer && (
        <div className="fixed inset-0 addForm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Receive Payment</h2>
              <button
                onClick={closeReceiveModal}
                className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-medium">
                    {selectedCustomer.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Due Amount
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-bold">
                    Rs. {selectedCustomer.balance?.toFixed(2) || "0.00"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to Receive
                  </label>
                  <input
                    type="number"
                    value={receiveAmount}
                    onChange={(e) => setReceiveAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter amount"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={closeReceiveModal}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-lg font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReceiveMoney}
                  className="px-5 py-2.5 bg-green-600 text-white hover:bg-green-700 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
