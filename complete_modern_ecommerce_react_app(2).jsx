/*
ETHIO EXPRESS - COMPLETE ECOMMERCE WEBSITE

HOW TO RUN:

1. Install Node.js from:
https://nodejs.org

2. Open terminal in project folder

3. Run:
npm install
npm install tailwindcss @tailwindcss/vite
npm run dev

4. Open browser:
http://localhost:5173

5. Save this file as:
src/App.jsx

TECH:
- React
- Tailwind CSS
- Responsive Ecommerce UI
- Shopping Cart
- Product Filtering
- Search System

*/

import { useMemo, useState } from 'react';

export default function EcommerceApp() {
  const allProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 129,
      category: 'Electronics',
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199,
      category: 'Accessories',
      rating: 4.6,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Gaming Laptop',
      price: 1499,
      category: 'Gaming',
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      price: 89,
      category: 'Electronics',
      rating: 4.4,
      image:
        'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 5,
      name: 'Luxury Sneakers',
      price: 249,
      category: 'Fashion',
      rating: 4.7,
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 6,
      name: 'Professional Camera',
      price: 899,
      category: 'Electronics',
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [sort, setSort] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item, index) => index !== id));
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [search, sort, selectedCategory]);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={darkMode ? 'min-h-screen bg-black text-white' : 'min-h-screen bg-gray-100 text-gray-900'}>
      {/* HEADER */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-black tracking-wide text-orange-400">
            Ethio Express
          </h1>

          <div className="hidden md:flex flex-1 max-w-3xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ምርቶችን ይፈልጉ..."
              className="w-full rounded-l-2xl px-5 py-3 text-black outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 rounded-r-2xl font-bold transition">
              Search
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hover:text-orange-400 transition"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <button className="hover:text-red-400 transition relative">
              ❤
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            </button>
            <button className="hover:text-orange-400 transition">
              Account
            </button>

            <button
              onClick={() => setShowCart(!showCart)}
              className="relative hover:text-orange-400 transition"
            >
              Cart
              <span className="absolute -top-2 -right-3 bg-orange-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* MINI CART */}
      {showCart && (
        <div className="fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl z-50 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button
              onClick={() => setShowCart(false)}
              className="text-2xl"
            >
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 border-b pb-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-orange-500 font-bold">
                      ${item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="pt-6">
                <h3 className="text-xl font-bold mb-4">
                  Subtotal: ${subtotal}
                </h3>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* HERO */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-orange-400 mb-4 font-semibold">
              Premium Collection
            </p>

            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Discover Smart Shopping
            </h2>

            <p className="text-lg text-gray-300 mb-10 max-w-xl">
              Shop electronics, fashion, gaming, and luxury accessories with fast delivery and secure checkout.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl text-lg font-bold shadow-xl">
                አሁን ይግዙ
              </button>

              <button className="border border-white px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition">
                Explore Deals
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop"
              alt="Shopping"
              className="rounded-[2rem] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-wrap gap-4 justify-center">
          {['All', 'Electronics', 'Fashion', 'Gaming', 'Accessories'].map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <h3 className="text-4xl font-black">ተወዳጅ ምርቶች</h3>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-2xl px-5 py-3 bg-white"
          >
            <option value="popular">Sort by Popularity</option>
            <option value="low">Price Low to High</option>
            <option value="high">Price High to Low</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              <div className="overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-72 w-full object-cover hover:scale-110 transition duration-500"
                />

                <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm px-4 py-2 rounded-full font-bold">
                  {product.rating} ★
                </span>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                  {product.category}
                </p>

                <h4 className="text-2xl font-bold mb-3">
                  {product.name}
                </h4>

                <div className="flex items-center justify-between mb-5">
                  <p className="text-orange-500 text-3xl font-black">
                    ${product.price}
                  </p>

                  <span className="line-through text-gray-400">
                    ${Math.round(product.price * 1.2)}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-bold transition"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => addToWishlist(product)}
                    className="border border-red-300 px-4 rounded-2xl hover:bg-red-100 transition"
                  >
                    ❤
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-10 rounded-[2rem] text-center shadow">
            <div className="text-5xl mb-4">🚚</div>
            <h4 className="text-2xl font-bold mb-3">Fast Delivery</h4>
            <p className="text-gray-600">
              Quick and reliable worldwide shipping.
            </p>
          </div>

          <div className="bg-gray-50 p-10 rounded-[2rem] text-center shadow">
            <div className="text-5xl mb-4">🔒</div>
            <h4 className="text-2xl font-bold mb-3">Secure Payment</h4>
            <p className="text-gray-600">
              Safe checkout with protected payment methods.
            </p>
          </div>

          <div className="bg-gray-50 p-10 rounded-[2rem] text-center shadow">
            <div className="text-5xl mb-4">⭐</div>
            <h4 className="text-2xl font-bold mb-3">Top Rated</h4>
            <p className="text-gray-600">
              Trusted by thousands of satisfied customers.
            </p>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-5xl font-black mb-6">
            የዜና ደብዳቤያችንን ይቀላቀሉ
          </h3>

          <p className="text-gray-300 text-lg mb-10">
            Get exclusive deals and updates directly to your inbox.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-2xl border w-full md:w-[28rem] text-black"
            />

            <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl font-bold transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-white text-3xl font-black mb-4">
              Ethio Express
            </h4>

            <p>
              A modern premium e-commerce experience with beautiful design and smooth functionality.
            </p>
          </div>

          <div>
            <h5 className="text-white font-bold mb-5">Company</h5>
            <ul className="space-y-3">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-5">Support</h5>
            <ul className="space-y-3">
              <li>Help Center</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-5">Follow Us</h5>
            <div className="flex gap-4 text-3xl">
              <span>📘</span>
              <span>📸</span>
              <span>🐦</span>
              <span>▶️</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-14 pt-8 text-center text-sm text-gray-500">
          © 2026 Ethio Express. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

