function Cart({ cart, updateQuantity, removePizza, goBack , onCheckout}) {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>🛒 Your Shopping Cart</h1>

      <button onClick={goBack}>
        ← Continue Shopping
      </button>

      {cart.length === 0 ? (
        <h2>Your cart is empty!</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>

              <p>
                ₹{item.price * item.quantity}
              </p>

              <button
                onClick={() => removePizza(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total Items: {totalItems}</h3>
            <h2>Total Amount: ₹{totalPrice}</h2>
            <button className="checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;