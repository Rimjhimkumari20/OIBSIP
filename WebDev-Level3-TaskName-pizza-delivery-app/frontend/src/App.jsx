import { useState , useEffect } from 'react' ;
import Cart from './components/cart';
import Login from './components/Login';
import Checkout from './components/Checkout';
import Register from './components/Register';
import './App.css';

function App() {
  const[cart , setCart] = useState([]);
  const[showCart , setShowCart] = useState(false);
  const[currentPage, setCurrentPage] = useState("home");
  const [Pizzas, setPizzas] = useState([]);
  const[loading, setLoading] = useState(true);
  const[showCheckout , setShowCheckout] = useState(false);

  useEffect(() => {
  fetch("http://localhost:5000/api/pizzas")
    .then((response) => response.json())
    .then((data) => {
      console.log("Database pizzas:" , data);
      setPizzas(data);
      setLoading(false);
    })
    .catch((error) => {
      console.log("Error fetching pizzas:", error);
      setLoading(false);
    });
}, []);

  const pizzas = Pizzas.map((pizza) => ({...pizza,id:pizza._id}));

  function addToCart(pizza) {
    setCart ((previousCart) => {
      const existingPizza = previousCart.some((item) => item._id === pizza._id);

      if(existingPizza){
        return previousCart.map((item) => {
          if(item._id === pizza._id)  {
            return { ...item,quantity:(item.quantity || 0)+ 1};
      } 
      return item;
    });
  }
   return [...previousCart, { ...pizza,quantity: 1}];
  });
}
function updateQuantity(id, change) {
  setCart((previousCart) =>
    previousCart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + change
            }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}

function removePizza(id) {
  setCart((previousCart) =>
    previousCart.filter((item) => item.id !== id)
  );
}

if (showCheckout) {
  return (
    <Checkout
      cart={cart}
      onBack={() => setShowCheckout(false)}
      onPlaceOrder={(form) => {
        console.log("Customer Details:", form);
        console.log("Ordered Items:", cart);
        alert("Checkout details submitted successfully!");
      }}
    />
  );
}

if (showCart) {
  return (
    <Cart
      cart={cart}
      updateQuantity={updateQuantity}
      removePizza={removePizza}
      goBack={() => setShowCart(false)}
      onCheckout={() => setShowCheckout(true)}
    />
  );
}

if (currentPage === "login") {
  return (
    <Login
      goToRegister={() => setCurrentPage("register")}
      goBack={() => setCurrentPage("home")}
    />
  );
}

if (currentPage === "register") {
  return (
    <Register
      goToLogin={() => setCurrentPage("login")}
      goBack={() => setCurrentPage("home")}
    />
  );
}

  return (
    <div className='app'>
      <nav className='navbar'>
        <h2 className='logo'>PizzaHub</h2>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
        </div>
       <div className="nav-actions">
        <div className="cart-info">🛒 Cart: {cart.reduce((total, item) => 
        total + item.quantity,0)} items
        <p>
          Total: ₹{cart.reduce(
               (total, item) => total + item.price * item.quantity,0
              )}
        </p>
    </div>

    <button className="cart-btn" onClick={() => setShowCart(true)}>
           🛒 View Cart ({cart.reduce(
                  (total, item) => total + item.quantity,0)})
    </button>
        <button className="login-link" onClick={() => setCurrentPage("login")}>Login</button>
        </div>
      </nav>
      <section className="hero">
        <div>
          <p className="tagline">FRESLY BAKED,JUST FOR YOU</p>
          <h1>
            Delicious pizza,
            <br/>
            Delivered To You!
          </h1>

          <p className="description">Create your favourite pizza and enjoy every bite of happiness</p>
          <a href="#menu" className="order-btn">Explore Menu</a>
        </div>

        <div className="hero-pizza"> 🍕</div>
      </section>

      <section className="menu" id="menu">
        <h2>Our Popular Pizzas</h2>
        <p>Choose Your Favourite Flavour!</p>
        <div className="pizza-container">

          {loading ? (
             <h3>Loading pizzas...</h3>
          ) : pizzas.length === 0 ? (
            <h3>No pizzas available!</h3>
          ) : (
            pizzas.map((pizza) => (
              <div className="pizza-card" key={pizza.id}>
                  <div className="pizza-image">
                     <img src={pizza.image} alt={pizza.name} />
                  </div>

      <h3>{pizza.name}</h3>
      <p>{pizza.description}</p>
      <h3>₹{pizza.price}</h3>

      <button className="cart-btn" onClick={() => addToCart(pizza)}>Add to Cart </button>
    </div>
  ))
)}
        </div>
      </section>

      <footer id="about">Made with ❤️ for pizza lovers!</footer>
    </div>
  );
}

export default App;