import { useState } from "react";
import "./Checkout.css";

function Checkout({ cart, onBack, onPlaceOrder }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const orderData = {
      customerName: form.name,
      phone: form.phone,
      address: form.address,

      items: cart.map((item) => ({
        pizzaId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),

      totalAmount: total
    };

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();
    console.log("Server response:" , data);

    if (!response.ok) {
      throw new Error(data.message || "Order failed");
    }

    alert("Order placed successfully! 🎉");
    console.log("Saved Order:", data.order);

    onPlaceOrder(form);

  } catch (error) {
    console.log("Order Error:", error);
    alert(error.message);
  }
}

  return (
    <div className="checkout">
      <h2>Delivery Details</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          type="tel"
          pattern="[0-9]{10}"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Full Delivery Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <h3>Total: ₹{total}</h3>

        <button type="submit">Place Order</button>
        <button type="button" onClick={onBack}>
          Back to Cart
        </button>
      </form>
    </div>
  );
}

export default Checkout;