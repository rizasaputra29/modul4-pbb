// src/components/navbar/DesktopNavbar.jsx
import logoUrl from '../../assets/LOGORN.png';
import { Heart } from 'lucide-react'; // Import ikon

export default function DesktopNavbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'makanan', label: 'Makanan' },
    { id: 'minuman', label: 'Minuman' },
    { id: 'favorit', label: 'Favorit' }, // Tambah item Favorit
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <nav className="hidden md:block shadow-lg border-b border-blue-100 sticky top-0 z-40 backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative">
              <img
                src={logoUrl}
                alt="Resep Nusantara Logo"
                className="w-12 h-12 object-contain filter drop-shadow-md transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-60 group-hover:animate-none" />
              <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-50 group-hover:animate-none" style={{ animationDelay: '300ms' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                Resep
              </h1>
              <h2 className="text-base font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent -mt-1">
                Nusantara
              </h2>
            </div>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8 lg:space-x-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 py-2 text-base font-medium transition-all duration-200 group ${
                  currentPage === item.id
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-blue-500'
                }`}
              >
                {item.label}
                 {/* Underline effect */}
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${currentPage === item.id ? 'scale-x-100' : ''}`}></span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}