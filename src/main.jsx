// src/main.jsx
import { StrictMode, useState, useEffect } from 'react'; // Tambah useEffect
import { createRoot } from 'react-dom/client';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MakananPage from './pages/MakananPage';
import MinumanPage from './pages/MinumanPage';
import ProfilePage from './pages/ProfilePage';
import RecipeDetailPage from './pages/RecipeDetailPage'; // Nama file Anda
import FavoritePage from './pages/FavoritePage'; // Import FavoritePage
import { ResepMakanan } from './data/makanan';
import { ResepMinuman } from './data/minuman';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css';
import PWABadge from './PWABadge';

// Gabungkan semua resep jadi satu objek untuk memudahkan pencarian by ID + tambahkan tipe
const allRecipes = {};
Object.values(ResepMakanan.resep).forEach(recipe => {
  allRecipes[recipe.id] = { ...recipe, type: 'makanan' };
});
Object.values(ResepMinuman.resep).forEach(recipe => {
  allRecipes[recipe.id] = { ...recipe, type: 'minuman' };
});

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  // State navigasi diubah sedikit untuk lebih sederhana
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'makanan', 'minuman', 'favorit', 'profile'
  const [detailView, setDetailView] = useState({ active: false, id: null, type: null }); // State untuk detail

  // State untuk favorites, ambil dari localStorage saat inisialisasi
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteRecipes');
    return savedFavorites ? JSON.parse(savedFavorites).map(Number) : [];
  });

  // Effect untuk menyimpan favorites ke localStorage saat berubah
  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setDetailView({ active: false, id: null, type: null }); // Tutup detail view
    window.scrollTo(0, 0); // Scroll ke atas
  };

  // Fungsi untuk melihat detail resep (dipanggil dari RecipeCard)
  const handleViewDetail = (id, type) => {
    setDetailView({ active: true, id, type });
     window.scrollTo(0, 0); // Scroll ke atas
  };

  // Fungsi untuk kembali dari halaman detail
  const handleBackFromDetail = () => {
    // Kembali ke halaman sebelumnya (berdasarkan tipe detail atau halaman aktif terakhir)
    const pageBeforeDetail = detailView.type === 'makanan' ? 'makanan' : detailView.type === 'minuman' ? 'minuman' : currentPage;
    setCurrentPage(pageBeforeDetail === 'detail' ? 'home' : pageBeforeDetail); // Fallback ke home jika page sebelumnya adalah 'detail' (jarang terjadi)
    setDetailView({ active: false, id: null, type: null });
     window.scrollTo(0, 0); // Scroll ke atas
  };

  const toggleFavorite = (recipeId) => {
    const numRecipeId = Number(recipeId);
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(numRecipeId)) {
        return prevFavorites.filter(id => id !== numRecipeId);
      } else {
        return [...prevFavorites, numRecipeId];
      }
    });
  };

  // Side effect untuk scroll ke atas saat halaman utama berubah
  useEffect(() => {
    if (!detailView.active) {
      window.scrollTo(0, 0);
    }
  }, [currentPage, detailView.active]);


  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        // Teruskan handleViewDetail sebagai onSelectRecipe
        return <HomePage onSelectRecipe={handleViewDetail} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'makanan':
        // Ganti onViewDetail ke onSelectRecipe agar konsisten
        return <MakananPage onNavigate={handleNavigation} onSelectRecipe={handleViewDetail} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'minuman':
         // Ganti onViewDetail ke onSelectRecipe agar konsisten
        return <MinumanPage onNavigate={handleNavigation} onSelectRecipe={handleViewDetail} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'favorit':
        const favoriteRecipes = favorites.map(id => allRecipes[id]).filter(Boolean);
        return <FavoritePage recipes={favoriteRecipes} onSelectRecipe={handleViewDetail} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onSelectRecipe={handleViewDetail} favorites={favorites} onToggleFavorite={toggleFavorite} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tampilkan Navbar hanya jika tidak di halaman detail */}
      {!detailView.active && (
        <>
          <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />
          <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />
        </>
      )}

      {/* Main Content */}
      <main className={`min-h-screen ${!detailView.active ? '' : 'pt-0'}`}>
        {/* Tampilkan Detail jika aktif */}
        {detailView.active && detailView.id ? (
          <RecipeDetailPage
            recipeId={detailView.id}
            recipeType={detailView.type}
            onBack={handleBackFromDetail}
            // Tambahkan props favorit ke detail page juga
            isFavorite={favorites.includes(detailView.id)}
            onToggleFavorite={() => toggleFavorite(detailView.id)}
          />
        ) : (
          // Jika tidak, render halaman utama
          renderCurrentPage()
        )}
      </main>

      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);