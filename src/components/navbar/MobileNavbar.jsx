// src/components/navbar/MobileNavbar.jsx
import { Home, ChefHat, Coffee, User, Heart } from 'lucide-react';

export default function MobileNavbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'makanan', label: 'Makanan', icon: ChefHat },
    { id: 'minuman', label: 'Minuman', icon: Coffee },
    { id: 'favorit', label: 'Favorit', icon: Heart }, // Tambah item Favorit
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="md:hidden fixed top-0 mb-24 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-100 px-2 py-1 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around max-w-sm mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center pt-2 pb-1 px-1 transition-colors duration-200 rounded-lg w-[60px] h-[55px] ${
                isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50/50'
              }`}
            >
              <span className={`text-[10px] font-medium transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-90'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}