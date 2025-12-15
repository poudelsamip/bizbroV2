import axios from "axios";
import React, { useEffect, useState } from "react";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [receiveAmount, setReceiveAmount] = useState("");
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
    }
    getCustomersData();
  }, []);

  return (
    <div>
      <div className="max-w-7xl">
        <div className="">
          <div className="pb-6 flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by name, business, phone, or email..."
                className="w-90 px-4 py-2 bg-gray-700 border border-gray-600 outline-0 text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 mr-1 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium"
            >
              ADD NEW CUSTOMER
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
                    Customer
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      No customers found
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer, index) => (
                    <tr
                      key={customer._id}
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
                            {customer.name}
                          </span>
                          {customer.businessName && (
                            <span className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                              {customer.businessName}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-gray-200 flex items-center gap-2">
                            {customer.phone}
                          </span>
                          {customer.email && (
                            <span className="text-sm text-gray-300 flex items-center gap-2">
                              {customer.email}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-200 flex items-start gap-2">
                          <span className="max-w-xs">{customer.address}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-white">
                          {customer.balance}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openReceiveModal(customer)}
                          className="cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 transition-colors text-white text-sm font-medium"
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

          <div className="px-6 py-4 bg-gray-700 border-t border-gray-600">
            <p className="text-sm text-gray-300">
              Showing {filteredCustomers.length} of {customers.length} customers
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="addForm fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-600 w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-600">
              <h2 className="text-xl font-bold text-white">Add New Customer</h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-200 transition-colors text-2xl"
              >
                x
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0  "
                    placeholder="Enter customer name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0  "
                    placeholder="Enter business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone
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
                  onClick={handleAddCustomer}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isReceiveModalOpen && selectedCustomer && (
        <div className="fixed inset-0 flex items-center justify-center z-50 addForm">
          <div className="bg-gray-800 border border-gray-600 w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-600">
              <h2 className="text-xl font-bold text-white">Receive Payment</h2>
              <button
                onClick={closeReceiveModal}
                className="text-gray-400 hover:text-gray-200 transition-colors text-2xl"
              >
                x
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Customer
                  </label>
                  <div className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white">
                    {selectedCustomer.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Current Due Amount
                  </label>
                  <div className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white font-semibold">
                    {selectedCustomer.balance}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Amount to Receive
                  </label>
                  <input
                    type="number"
                    value={receiveAmount}
                    onChange={(e) => setReceiveAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 outline-0"
                    placeholder="Enter amount"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={closeReceiveModal}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReceiveMoney}
                  className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  Confirm Payment Receive
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
