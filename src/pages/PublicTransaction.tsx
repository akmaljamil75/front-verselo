import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

// Enhanced warkop products data with real images
const WARCOP_PRODUCTS = [
  {
    id: 'kopi-hitam',
    name: 'Kopi Hitam',
    description: 'Kopi hitam murni dengan biji kopi pilihan dari berbagai daerah Indonesia. Roasting medium untuk cita rasa yang seimbang.',
    price: '15000',
    stock: '50',
    categoryId: 'minuman',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center',
    imageAlt: 'Kopi Hitam'
  },
  {
    id: 'kopi-susu',
    name: 'Kopi Susu',
    description: 'Kopi susu dengan perpaduan kopi robusta dan susu segar. Nikmati kelembutan susu dengan kekuatan kopi.',
    price: '20000',
    stock: '45',
    categoryId: 'minuman',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
    imageAlt: 'Kopi Susu'
  },
  {
    id: 'indomie-goreng',
    name: 'Indomie Goreng',
    description: 'Indomie goreng spesial dengan telur, sayuran segar, dan bumbu rahasia. Menu favorit pelanggan.',
    price: '18000',
    stock: '30',
    categoryId: 'makanan',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
    imageAlt: 'Indomie Goreng'
  },
  {
    id: 'roti-bakar',
    name: 'Roti Bakar',
    description: 'Roti bakar dengan berbagai pilihan topping: coklat, keju, atau selai. Dibakar dengan sempurna hingga crispy.',
    price: '12000',
    stock: '25',
    categoryId: 'makanan',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center',
    imageAlt: 'Roti Bakar'
  },
  {
    id: 'es-kopi-susu',
    name: 'Es Kopi Susu',
    description: 'Es kopi susu yang menyegarkan dengan campuran kopi, susu, dan gula aren. Perfect untuk cuaca panas.',
    price: '22000',
    stock: '40',
    categoryId: 'minuman',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center',
    imageAlt: 'Es Kopi Susu'
  },
  {
    id: 'nasi-goreng',
    name: 'Nasi Goreng',
    description: 'Nasi goreng spesial dengan telur, ayam, dan sayuran. Dibuat dengan bumbu tradisional yang autentik.',
    price: '25000',
    stock: '20',
    categoryId: 'makanan',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop&crop=center',
    imageAlt: 'Nasi Goreng'
  }
];

interface CartItem {
  productId: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
  imageAlt: string;
}

const PublicTransaction: React.FC = () => {
  const { addProduct } = useProducts();
  
  // Use warkop products instead of context products for demo
  const [warkopProducts] = useState(WARCOP_PRODUCTS);
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Initialize warkop products in context/localStorage when component mounts
  useEffect(() => {
    // Check if warkop products are already in localStorage
    const existingProducts = localStorage.getItem('warkopProducts');
    
    if (!existingProducts) {
      // Add warkop products to context and localStorage
      WARCOP_PRODUCTS.forEach(product => {
        addProduct(product);
      });
      
      // Also save to localStorage as backup
      localStorage.setItem('warkopProducts', JSON.stringify(WARCOP_PRODUCTS));
    }
  }, [addProduct]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    const filtered = warkopProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue: string | number = a[sortBy];
      let bValue: string | number = b[sortBy];
      
      if (sortBy === 'price' || sortBy === 'stock') {
        aValue = parseFloat(aValue as string);
        bValue = parseFloat(bValue as string);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [warkopProducts, searchTerm, selectedCategory, sortBy, sortOrder]);

  const getCategoryName = (categoryId: string) => {
    return categoryId === 'minuman' ? 'Minuman' : 'Makanan';
  };

  // Cart functions
  const addToCart = (product: typeof WARCOP_PRODUCTS[0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      
      if (existingItem) {
        // Update quantity if already in cart
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          imageAlt: product.imageAlt
        }];
      }
    });
    
    // Show cart briefly
    setShowCart(true);
    setTimeout(() => setShowCart(false), 2000);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Save cart to localStorage for checkout page
    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    
    // Navigate to checkout page
    window.location.href = '/public/payment/checkout';
  };

  const handleBuyNow = (productId: string) => {
    // Navigate to payment page with single product
    window.location.href = `/public/payment/${productId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-amber-800">Warkop Nusantara</span>
            </Link>
            
            {/* Cart Button */}
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-8">
                <Link to="/" className="text-amber-700 hover:text-amber-900 transition font-medium">Beranda</Link>
                <a href="#about" className="text-amber-700 hover:text-amber-900 transition font-medium">Tentang</a>
                <a href="#contact" className="text-amber-700 hover:text-amber-900 transition font-medium">Kontak</a>
              </nav>
              
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative flex items-center px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                Keranjang
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowCart(false)}></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-amber-900">Keranjang Belanja</h2>
                      <button
                        onClick={() => setShowCart(false)}
                        className="ml-3 h-7 flex items-center"
                      >
                        <svg className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <svg className="w-16 h-16 text-amber-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                        </svg>
                        <p className="text-amber-600">Keranjang belanja kosong</p>
                        <p className="text-sm text-amber-500">Tambahkan beberapa produk untuk memulai</p>
                      </div>
                    ) : (
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-amber-200">
                            {cart.map((item) => (
                              <li key={item.productId} className="py-6 flex"> 
                                <div className="flex-shrink-0 w-24 h-24">
                                  <img
                                    className="w-full h-full object-cover rounded-lg"
                                    src={item.image}
                                    alt={item.imageAlt}
                                  />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-amber-900">
                                      <h3>{item.name}</h3>
                                      <p className="ml-4">Rp{parseFloat(item.price).toLocaleString()}</p>
                                    </div>
                                  </div>
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                                        className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center hover:bg-amber-200 transition-colors"
                                      >
                                        -
                                      </button>
                                      <span className="text-amber-900 font-medium">{item.quantity}</span>
                                      <button
                                        onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                                        className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center hover:bg-amber-200 transition-colors"
                                      >
                                        +
                                      </button>
                                    </div>
                                    <button
                                      onClick={() => removeFromCart(item.productId)}
                                      className="text-amber-500 hover:text-amber-700 transition-colors"
                                    >
                                      Hapus
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="border-t border-amber-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-amber-900 mb-4">
                        <p>Total</p>
                        <p>Rp{getCartTotal().toLocaleString()}</p>
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-amber-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-amber-700 focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Menu Warkop Kami
          </h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Nikmati berbagai pilihan menu minuman dan makanan yang lezat dengan suasana warkop yang hangat dan bersahabat.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-amber-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-amber-800 mb-2">Cari Menu</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari berdasarkan nama atau deskripsi..."
                className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-4 focus:ring-amber-500 focus:border-amber-500 bg-white/90 backdrop-blur-sm transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">Kategori</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-4 focus:ring-amber-500 focus:border-amber-500 bg-white/90 backdrop-blur-sm transition-all duration-300"
              >
                <option value="">Semua Kategori</option>
                <option value="minuman">Minuman</option>
                <option value="makanan">Makanan</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">Urutkan</label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}
                className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-4 focus:ring-amber-500 focus:border-amber-500 bg-white/90 backdrop-blur-sm transition-all duration-300"
              >
                <option value="name-asc">Nama (A-Z)</option>
                <option value="name-desc">Nama (Z-A)</option>
                <option value="price-asc">Harga (Murah-Mahal)</option>
                <option value="price-desc">Harga (Mahal-Murah)</option>
                <option value="stock-asc">Stok (Sedikit-Banyak)</option>
                <option value="stock-desc">Stok (Banyak-Sedikit)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-amber-100 group">
              {/* Product Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    product.categoryId === 'minuman' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {getCategoryName(product.categoryId)}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-amber-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-amber-600">
                    Rp{parseFloat(product.price).toLocaleString()}
                  </span>
                  <span className="text-sm text-amber-500 font-medium">
                    Stok: {product.stock}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={parseInt(product.stock) <= 0}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      parseInt(product.stock) > 0
                        ? 'bg-amber-600 text-white hover:bg-amber-700 focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {parseInt(product.stock) > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
                  </button>
                  
                  <button
                    onClick={() => handleBuyNow(product.id)}
                    disabled={parseInt(product.stock) <= 0}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      parseInt(product.stock) > 0
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 border border-amber-300'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    }`}
                  >
                    Beli Langsung
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200">
            <svg className="w-20 h-20 text-amber-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">Menu Tidak Ditemukan</h3>
            <p className="text-amber-600">Coba sesuaikan kriteria pencarian Anda.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-amber-900/90 backdrop-blur-sm text-amber-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-300">&copy; 2024 Warkop Nusantara. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicTransaction;