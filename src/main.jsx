// src/main.jsx
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MakananPage from './pages/MakananPage';
import MinumanPage from './pages/MinumanPage';
import ProfilePage from './pages/ProfilePage';
import RecipeDetailPage from './pages/RecipeDetailPage'; // Import halaman detail baru
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css'
import PWABadge from './PWABadge';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  // State baru untuk menangani navigasi: { page: 'makanan' | 'minuman' | 'profile' | 'home', detail: { id: number, type: string } | null }
  const [navigationState, setNavigationState] = useState({ 
    page: 'home', 
    detail: null 
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setNavigationState({ page, detail: null });
  };
  
  // Fungsi untuk melihat detail resep
  const handleViewDetail = (id, type) => {
    setNavigationState({ page: 'detail', detail: { id, type } });
  };

  // Fungsi untuk kembali dari halaman detail
  const handleBackFromDetail = () => {
    // Kembali ke halaman sebelumnya berdasarkan tipe resep yang dilihat
    const previousPage = navigationState.detail.type === 'makanan' ? 'makanan' : 'minuman';
    setNavigationState({ page: previousPage, detail: null });
  }
  
  const renderCurrentPage = () => {
    const { page, detail } = navigationState;
    
    // 1. Tampilkan Halaman Detail
    if (page === 'detail' && detail) {
      return (
        <RecipeDetailPage 
          recipeId={detail.id} 
          recipeType={detail.type}
          onBack={handleBackFromDetail}
        />
      );
    }
    
    // 2. Tampilkan Halaman Utama
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'makanan':
        // Teruskan fungsi handleViewDetail sebagai prop
        return <MakananPage onNavigate={handleNavigation} onViewDetail={handleViewDetail} />;
      case 'minuman':
        // Teruskan fungsi handleViewDetail sebagai prop
        return <MinumanPage onNavigate={handleNavigation} onViewDetail={handleViewDetail} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }
  
  // Tentukan currentPage untuk Navbar
  const currentPageKey = navigationState.page === 'detail' 
    ? (navigationState.detail.type === 'makanan' ? 'makanan' : 'minuman') 
    : navigationState.page;
    

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navbar */}
      <DesktopNavbar currentPage={currentPageKey} onNavigate={handleNavigation} />
      
      {/* Main Content */}
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>
      
      {/* Mobile Navbar */}
      <MobileNavbar currentPage={currentPageKey} onNavigate={handleNavigation} />

      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)