import { useEffect, useState } from "react";
import axios from "axios";
import SalesReceipt from "../components/SalesReceipt";

const SellProduct = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [completedSale, setCompletedSale] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    customerId: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "cash",
  });

  const [selectedProducts, setSelectedProducts] = useState([
    { productId: "", quantity: 1, price: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, customersRes] = await Promise.all([
          axios.get("/api/products"),
          axios.get("/api/customers"),
        ]);
        setProducts(productsRes.data || []);
        setCustomers(customersRes.data || []);
      } catch (err) {
        console.log("Failed to load data", err);
      }
    };
    fetchData();
  }, []);

  const getAvailableStock = (productId) => {
    if (!productId) return 0;
    const product = products.find((p) => p._id === productId);
    return product?.quantity || 0;
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...selectedProducts];
    updated[index][field] = value;

    if (field === "productId") {
      const product = products.find((p) => p._id === value);
      updated[index].price = product?.sellingPrice || 0;

      const availableStock = product?.quantity || 0;
      if (updated[index].quantity > availableStock) {
        updated[index].quantity = availableStock > 0 ? availableStock : 1;
      }
    }

    if (field === "quantity") {
      const availableStock = getAvailableStock(updated[index].productId);

      if (value > availableStock) {
        updated[index].quantity = availableStock;
      } else if (value < 1) {
        updated[index].quantity = 1;
      } else {
        updated[index].quantity = value;
      }
    }

    setSelectedProducts(updated);
  };

  const addProductRow = () => {
    setSelectedProducts([
      ...selectedProducts,
      { productId: "", quantity: 1, price: 0 },
    ]);
  };

  const removeProductRow = (index) => {
    if (selectedProducts.length > 1) {
      setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () =>
    selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async () => {
    if (!formData.customerId) {
      alert("Please select a customer");
      return;
    }

    const validProducts = selectedProducts.filter(
      (p) => p.productId && p.quantity > 0
    );

    if (validProducts.length === 0) {
      alert("Please select at least one product");
      return;
    }

    for (const sp of validProducts) {
      const availableStock = getAvailableStock(sp.productId);
      if (sp.quantity > availableStock) {
        setError(
          `Insufficient stock for selected product. Available: ${availableStock}`
        );
        return;
      }
    }

    const customer = customers.find((c) => c._id === formData.customerId);

    const saleData = {
      customer,
      products: validProducts.map((sp) => ({
        product: products.find((p) => p._id === sp.productId),
        quantity: sp.quantity,
        price: sp.price,
      })),
      paymentMethod: formData.paymentMethod,
    };

    setCompletedSale(saleData);

    try {
      await axios.post("/api/sales", saleData);
      setError(null);
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please check stock");
      }
    }

    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setFormData({
      customerId: "",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "cash",
    });
    setSelectedProducts([{ productId: "", quantity: 1, price: 0 }]);
    setError(null);
  };

  return (
    <div className="bg-gray-900">
      <div className="max-w-5xl bg-gray-800 p-8 shadow-xl">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm text-gray-300 mb-2">Customer</label>
            <select
              value={formData.customerId}
              onChange={(e) =>
                setFormData({ ...formData, customerId: e.target.value })
              }
              className="w-full p-3 bg-gray-700 text-white"
            >
              <option value="">Select customer</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                  {c.businessName && ` - ${c.businessName}`}
                </option>
              ))}
            </select>
          </div>

          <div className="w-48">
            <label className="block text-sm text-gray-300 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full p-3 bg-gray-700 text-white"
            />
          </div>
        </div>

        {/* products */}
        <div className="mb-6">
          {selectedProducts.map((item, index) => {
            const availableStock = getAvailableStock(item.productId);
            const isOutOfStock = item.productId && availableStock === 0;

            return (
              <div key={index} className="mb-4">
                <div className="flex gap-3 items-end">
                  {/* single product */}
                  <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">
                      Product
                    </label>
                    <select
                      value={item.productId}
                      onChange={(e) =>
                        handleProductChange(index, "productId", e.target.value)
                      }
                      className="w-full p-3 bg-gray-700 text-white"
                    >
                      <option value="">Select product</option>
                      {products.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}{" "}
                          {p.quantity === 0
                            ? "(Out of Stock)"
                            : `(Stock: ${p.quantity})`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-28">
                    <label className="block text-xs text-gray-400 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={item.price}
                      onChange={(e) =>
                        handleProductChange(
                          index,
                          "price",
                          Number(e.target.value) || 0
                        )
                      }
                      className="w-full p-3 bg-gray-700 text-white"
                    />
                  </div>

                  <div className="w-24">
                    <label className="block text-xs text-gray-400 mb-1">
                      Quantity
                      {item.productId && (
                        <>
                          <br />
                          <span
                            className={`${
                              isOutOfStock ? "text-red-400" : "text-green-400"
                            }`}
                          >
                            ({availableStock} in stock)
                          </span>
                        </>
                      )}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={availableStock || 1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleProductChange(
                          index,
                          "quantity",
                          Number(e.target.value) || 1
                        )
                      }
                      disabled={isOutOfStock}
                      className={`w-full p-3 ${
                        isOutOfStock ? "bg-gray-600" : "bg-gray-700"
                      } text-white`}
                    />
                  </div>

                  <div className="w-36">
                    <label className="block text-xs text-gray-400 mb-1">
                      Total
                    </label>
                    <input
                      type="text"
                      disabled
                      value={`Rs. ${(item.price * item.quantity).toFixed(2)}`}
                      className="w-full p-3 bg-gray-600 text-gray-300"
                    />
                  </div>
                  {selectedProducts.length > 1 && (
                    <button
                      onClick={() => removeProductRow(index)}
                      className="px-4 py-3 bg-red-600 text-white"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          <button
            onClick={addProductRow}
            className="mt-2 bg-green-600 px-6 py-2 text-white"
          >
            + Add Product
          </button>
        </div>

        <div className="bg-gray-700 p-4 flex justify-between text-white mb-6">
          <span>Total Amount</span>
          <span className="text-xl font-bold">
            Rs. {calculateTotal().toFixed(2)}
          </span>
        </div>

        <div className="mb-6 flex gap-6 text-white">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="cash"
              checked={formData.paymentMethod === "cash"}
              onChange={(e) =>
                setFormData({ ...formData, paymentMethod: e.target.value })
              }
            />
            Cash
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="credit"
              checked={formData.paymentMethod === "credit"}
              onChange={(e) =>
                setFormData({ ...formData, paymentMethod: e.target.value })
              }
            />
            Credit
          </label>
        </div>

        <div className="flex gap-4 flex-col items-end">
          {error && <span className="text-red-400 mr-4 -mb-4">{error}</span>}
          <button
            onClick={handleSubmit}
            className="w-fit bg-blue-600 px-8 py-3 text-white font-medium"
          >
            Create Sale & Generate Bill
          </button>
        </div>
      </div>

      {showReceipt && completedSale && (
        <SalesReceipt saleData={completedSale} onClose={handleCloseReceipt} />
      )}
    </div>
  );
};

export default SellProduct;
