// src/pages/MakananPage.jsx
import { useState, useEffect } from 'react';
import { ResepMakanan } from '../data/makanan';
import RecipeGrid from '../components/makanan/RecipeGrid';
import SearchBar from '../components/common/SearchBar'; // Import SearchBar
import Pagination from '../components/common/Pagination'; // Import Pagination

const RECIPES_PER_PAGE = 6; // Konstan untuk pagination

export default function MakananPage({ onNavigate, onViewDetail }) { // Tambahkan prop navigasi
  const [searchQuery, setSearchQuery] = useState('');
  const [allFilteredRecipes, setAllFilteredRecipes] = useState([]); // Daftar resep yang sudah difilter (sebelum pagination)
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedRecipes, setPaginatedRecipes] = useState([]); // Daftar resep untuk halaman saat ini

 
  const allMakanan = Object.values(ResepMakanan.resep);

  // Efek untuk memfilter resep
  useEffect(() => {
    const filter = () => {
      let filtered = allMakanan;

      if (searchQuery.trim() !== '') {
        const lowercasedQuery = searchQuery.toLowerCase();
        filtered = allMakanan.filter(recipe => 
          recipe.name.toLowerCase().includes(lowercasedQuery)
        );
      }
      
      setAllFilteredRecipes(filtered);
      setCurrentPage(1); // Reset ke halaman 1 setiap kali pencarian berubah
    };

    filter();
  }, [searchQuery]);

  // Efek untuk pagination
  useEffect(() => {
    const totalRecipes = allFilteredRecipes.length;
    const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);
    
    // Pastikan currentPage tidak melebihi totalPages (misalnya jika hasil filter berkurang)
    const validPage = Math.min(currentPage, totalPages > 0 ? totalPages : 1);
    setCurrentPage(validPage);

    const startIndex = (validPage - 1) * RECIPES_PER_PAGE;
    const endIndex = startIndex + RECIPES_PER_PAGE;
    
    setPaginatedRecipes(allFilteredRecipes.slice(startIndex, endIndex));
  }, [allFilteredRecipes, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll ke atas setelah ganti halaman
  };

  const totalPages = Math.ceil(allFilteredRecipes.length / RECIPES_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <RecipeGrid 
          recipes={paginatedRecipes} 
          // Teruskan prop onViewDetail
          onViewDetail={(id) => onViewDetail(id, 'makanan')} 
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}