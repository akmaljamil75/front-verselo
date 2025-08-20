import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-amber-800">Warkop Nusantara</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#menu" className="text-amber-700 hover:text-amber-900 transition font-medium">Menu</a>
              <a href="#about" className="text-amber-700 hover:text-amber-900 transition font-medium">Tentang</a>
              <a href="#contact" className="text-amber-700 hover:text-amber-900 transition font-medium">Kontak</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6 leading-tight">
                Nikmati Secangkir{' '}
                <span className="text-amber-600">Kopi Terbaik</span>
                <br />
                di Warkop Kami
              </h1>
              <p className="text-xl text-amber-700 mb-8 max-w-2xl mx-auto lg:mx-0">
                Rasakan kehangatan dan kelezatan kopi tradisional Indonesia dengan suasana yang nyaman dan bersahabat. 
                Temukan cita rasa autentik dalam setiap tegukan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/public/transactions"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Lihat Menu & Pesan Sekarang
                </Link>
                <a
                  href="#menu"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-amber-600 text-lg font-semibold rounded-xl text-amber-600 bg-transparent hover:bg-amber-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300"
                >
                  Jelajahi Menu
                </a>
              </div>
            </div>
            <div className="relative">
              {/* Hero Image Placeholder - Warkop Scene */}
              <div className="relative">
                <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-amber-800">
                      <svg className="w-24 h-24 mx-auto mb-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <p className="text-lg font-medium">Suasana Warkop Hangat</p>
                      <p className="text-sm opacity-75">Tempat ngopi yang nyaman dan bersahabat</p>
                    </div>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              Mengapa Memilih Warkop Kami?
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Kami menghadirkan pengalaman ngopi yang autentik dengan kualitas terbaik dan suasana yang hangat.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">Kopi Premium</h3>
              <p className="text-amber-700">Biji kopi pilihan dari berbagai daerah Indonesia dengan roasting yang sempurna.</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">Suasana Nyaman</h3>
              <p className="text-amber-700">Tempat ngopi yang hangat dan bersahabat untuk bersantai bersama teman.</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">Pelayanan Cepat</h3>
              <p className="text-amber-700">Pesanan Anda akan disajikan dengan cepat dan penuh kehangatan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Menikmati Kopi Terbaik?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pelanggan setia yang telah merasakan kelezatan kopi kami.
          </p>
          <Link
            to="/public/transactions"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-lg font-semibold rounded-xl text-amber-600 bg-white hover:bg-amber-50 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Pesan Sekarang
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Warkop Nusantara</h3>
              </div>
              <p className="text-amber-200">Tempat ngopi terbaik dengan suasana yang hangat dan bersahabat.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Menu Favorit</h4>
              <ul className="space-y-2">
                <li><a href="#menu" className="text-amber-200 hover:text-white transition">Kopi Hitam</a></li>
                <li><a href="#menu" className="text-amber-200 hover:text-white transition">Kopi Susu</a></li>
                <li><a href="#menu" className="text-amber-200 hover:text-white transition">Indomie Goreng</a></li>
                <li><a href="#menu" className="text-amber-200 hover:text-white transition">Roti Bakar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Jam Buka</h4>
              <ul className="space-y-2 text-amber-200">
                <li>Senin - Jumat: 06:00 - 22:00</li>
                <li>Sabtu - Minggu: 07:00 - 23:00</li>
                <li>Hari Libur: 08:00 - 21:00</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Kontak</h4>
              <ul className="space-y-2 text-amber-200">
                <li>📞 +62 812-3456-7890</li> 
                <li>📧 info@warkopnusantara.com</li>
                <li>📍 Jl. Kopi No. 123, Jakarta</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center">
            <p className="text-amber-300">&copy; 2024 Warkop Nusantara. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
