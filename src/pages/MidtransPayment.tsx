import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useProductCategories } from '../context/ProductCategoryContext';

interface PaymentForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  quantity: number;
  paymentMethod: 'bank_transfer' | 'credit_card' | 'e_wallet' | 'gopay';
}

interface WarkopProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  categoryId: string;
  image: string;
  imageAlt: string;
}

interface CartItem {
  productId: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
  imageAlt: string;
}

const MidtransPayment: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { categories } = useProductCategories();
  
  const [product, setProduct] = useState<WarkopProduct | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    quantity: 1,
    paymentMethod: 'bank_transfer'
  });
  const [paymentStep, setPaymentStep] = useState<'form' | 'review' | 'processing' | 'success'>('form');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Check if this is a checkout (multiple products) or single product
    if (productId === 'checkout') {
      setIsCheckout(true);
      const checkoutCart = localStorage.getItem('checkoutCart');
      if (checkoutCart) {
        setCartItems(JSON.parse(checkoutCart));
      }
      setLoading(false);
    } else if (productId) {
      // Single product purchase
      setIsCheckout(false);
      
      // First try to find product in context
      const foundProduct = products.find(p => p.id === productId);
      
      // If found in context, map it to WarkopProduct format
      if (foundProduct) {
        const mappedProduct: WarkopProduct = {
          id: foundProduct.id,
          name: foundProduct.name,
          description: foundProduct.description,
          price: foundProduct.price,
          stock: foundProduct.stock,
          categoryId: foundProduct.categoryId,
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center',
          imageAlt: foundProduct.name
        };
        setProduct(mappedProduct);
      } else {
        // If not found in context, try localStorage as fallback
        const warkopProducts = localStorage.getItem('warkopProducts');
        if (warkopProducts) {
          const parsedProducts: WarkopProduct[] = JSON.parse(warkopProducts);
          const fallbackProduct = parsedProducts.find(p => p.id === productId);
          if (fallbackProduct) {
            setProduct(fallbackProduct);
          }
        }
      }
      setLoading(false);
    }
  }, [productId, products]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : (categoryId === 'minuman' ? 'Minuman' : 'Makanan');
  };

  const calculateTotal = () => {
    if (isCheckout) {
      return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
    } else if (product) {
      return parseFloat(product.price) * paymentForm.quantity;
    }
    return 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('review');
  };

  const handleConfirmPayment = () => {
    setPaymentStep('processing');
    // Simulate payment processing
    setTimeout(() => {
      setOrderId(`ORD-${Date.now()}`);
      setPaymentStep('success');
    }, 3000);
  };

  const handleBackToForm = () => {
    setPaymentStep('form');
  };

  const handleBackToProducts = () => {
    navigate('/public/transactions');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  if (!isCheckout && !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-amber-200">
          <svg className="w-20 h-20 text-amber-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Produk Tidak Ditemukan</h2>
          <p className="text-amber-700 mb-6">Produk yang Anda cari tidak ditemukan atau telah dihapus.</p>
          <button
            onClick={handleBackToProducts}
            className="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <button onClick={handleBackToProducts} className="flex items-center text-amber-600 hover:text-amber-700 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Menu
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-amber-800">Warkop Nusantara</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Payment Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {['form', 'review', 'processing', 'success'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  paymentStep === step 
                    ? 'bg-amber-600 text-white' 
                    : index < ['form', 'review', 'processing', 'success'].indexOf(paymentStep)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index < ['form', 'review', 'processing', 'success'].indexOf(paymentStep) ? '✓' : index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < ['form', 'review', 'processing', 'success'].indexOf(paymentStep) ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 text-sm text-gray-600">
            <span className={paymentStep === 'form' ? 'text-amber-600 font-medium' : ''}>Detail Pesanan</span>
            <span className="mx-2">→</span>
            <span className={paymentStep === 'review' ? 'text-amber-600 font-medium' : ''}>Review</span>
            <span className="mx-2">→</span>
            <span className={paymentStep === 'processing' ? 'text-amber-600 font-medium' : ''}>Proses</span>
            <span className="mx-2">→</span>
            <span className={paymentStep === 'success' ? 'text-amber-600 font-medium' : ''}>Sukses</span>
          </div>
        </div>

        {/* Product Summary */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            {isCheckout ? 'Ringkasan Keranjang Belanja' : 'Ringkasan Produk'}
          </h2>
          
          {isCheckout ? (
            // Multiple products display
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center space-x-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-900">{item.name}</h3>
                    <p className="text-sm text-amber-600">Jumlah: {item.quantity}</p>
                    <p className="text-sm text-amber-600">Harga: Rp{parseFloat(item.price).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-900">
                      Rp{(parseFloat(item.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-amber-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-amber-900">Total:</span>
                  <span className="text-2xl font-bold text-amber-600">Rp{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            // Single product display
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={product?.image}
                  alt={product?.imageAlt}
                  className="w-32 h-32 object-cover rounded-xl"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{product?.name}</h3>
                <p className="text-amber-700 mb-2">{product?.description}</p>
                <p className="text-sm text-amber-600 mb-2">Kategori: {product ? getCategoryName(product.categoryId) : ''}</p>
                <p className="text-sm text-amber-600 mb-4">Stok: {product?.stock}</p>
                <div className="text-2xl font-bold text-amber-600">Rp{product ? parseFloat(product.price).toLocaleString() : '0'}</div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Form */}
        {paymentStep === 'form' && (
          <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-amber-200">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Informasi Pembayaran</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  name="customerName"
                  value={paymentForm.customerName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-4 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">Email *</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={paymentForm.customerEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-4 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                  placeholder="Masukkan email Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">Nomor Telepon *</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={paymentForm.customerPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-4 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                  placeholder="Masukkan nomor telepon"
                />
              </div>
              {!isCheckout && (
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">Jumlah *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={paymentForm.quantity}
                    onChange={handleInputChange}
                    min="1"
                    max={product ? parseInt(product.stock) : 1}
                    required
                    className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-4 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                  />
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-amber-800 mb-2">Alamat Pengiriman *</label>
              <textarea
                name="customerAddress"
                value={paymentForm.customerAddress}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-4 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                placeholder="Masukkan alamat pengiriman lengkap"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-amber-800 mb-2">Metode Pembayaran *</label>
              <select
                name="paymentMethod"
                value={paymentForm.paymentMethod}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-4 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
              >
                <option value="bank_transfer">Transfer Bank</option>
                <option value="credit_card">Kartu Kredit</option>
                <option value="e_wallet">E-Wallet</option>
                <option value="gopay">GoPay</option>
              </select>
            </div>

            <div className="border-t border-amber-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-amber-900">Total:</span>
                <span className="text-2xl font-bold text-amber-600">Rp{calculateTotal().toLocaleString()}</span>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-amber-700 focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Lanjut ke Review
              </button>
            </div>
          </form>
        )}

        {/* Review Step */}
        {paymentStep === 'review' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-amber-200">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Review Pesanan Anda</h2>
            
            <div className="space-y-4 mb-6">
              <div className="border-b border-amber-200 pb-4">
                <h3 className="font-semibold text-amber-900 mb-2">Informasi Pelanggan</h3>
                <p><span className="text-amber-600">Nama:</span> {paymentForm.customerName}</p>
                <p><span className="text-amber-600">Email:</span> {paymentForm.customerEmail}</p>
                <p><span className="text-amber-600">Telepon:</span> {paymentForm.customerPhone}</p>
                <p><span className="text-amber-600">Alamat:</span> {paymentForm.customerAddress}</p>
              </div>
              
              <div className="border-b border-amber-200 pb-4">
                <h3 className="font-semibold text-amber-900 mb-2">Detail Pesanan</h3>
                {isCheckout ? (
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <p key={item.productId}>
                        <span className="text-amber-600">{item.name}:</span> {item.quantity} x Rp{parseFloat(item.price).toLocaleString()}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p><span className="text-amber-600">Produk:</span> {product?.name}</p>
                )}
                <p><span className="text-amber-600">Metode Pembayaran:</span> {paymentForm.paymentMethod.replace('_', ' ').toUpperCase()}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">Total Pembayaran</h3>
                <p className="text-2xl font-bold text-amber-600">Rp{calculateTotal().toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBackToForm}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-400 transition-all duration-300"
              >
                Kembali ke Form
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-amber-700 focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Konfirmasi Pembayaran
              </button>
            </div>
          </div>
        )}

        {/* Processing Step */}
        {paymentStep === 'processing' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-amber-200">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Memproses Pembayaran</h2>
            <p className="text-amber-700 mb-6">Mohon tunggu sementara kami memproses pembayaran Anda. Ini mungkin memakan waktu beberapa saat.</p>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-sm text-amber-700">Mengalihkan ke gateway pembayaran...</p>
            </div>
          </div>
        )}

        {/* Success Step */}
        {paymentStep === 'success' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-amber-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Pembayaran Berhasil!</h2>
            <p className="text-amber-700 mb-6">Terima kasih atas pembelian Anda. Pesanan telah dikonfirmasi.</p>
            
            <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
              <p className="text-sm text-amber-700 mb-2">ID Pesanan:</p>
              <p className="font-mono font-semibold text-amber-900">{orderId}</p>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-amber-700">Email konfirmasi telah dikirim ke <span className="font-medium">{paymentForm.customerEmail}</span></p>
              <p className="text-sm text-amber-700">Anda akan menerima update status pesanan melalui email.</p>
            </div>
            
            <div className="mt-8">
              <button
                onClick={handleBackToProducts}
                className="bg-amber-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-amber-700 focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Lanjut Belanja
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MidtransPayment;
