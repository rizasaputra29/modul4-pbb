// src/pages/MakananPage.jsx
import { useState, useEffect, useRef } from 'react';
import { ResepMakanan } from '../data/makanan';
import SearchBar from '../components/common/SearchBar';
import RecipeCard from '../components/common/RecipeCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RECIPES_PER_PAGE = 3;

// Props tetap sama
export default function MakananPage({ onSelectRecipe, favorites, onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [allFilteredRecipes, setAllFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedRecipes, setPaginatedRecipes] = useState([]);
  const cardRefs = useRef(new Map());
  const [visibleCards, setVisibleCards] = useState(new Set());

  const allMakanan = Object.values(ResepMakanan.resep);

  // useEffect untuk filter (tetap sama)
  useEffect(() => {
    const filter = () => { /* ... logika filter ... */
      let filtered = allMakanan;
      const lowercasedQuery = searchQuery.toLowerCase().trim();
      if (lowercasedQuery !== '') {
        filtered = allMakanan.filter(recipe =>
          recipe.name.toLowerCase().includes(lowercasedQuery)
        );
      }
      setAllFilteredRecipes(filtered);
      setCurrentPage(1);
    };
    const debounceTimeout = setTimeout(filter, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  // useEffect untuk pagination (tetap sama)
  useEffect(() => {
    // ... logika pagination ...
    const totalRecipes = allFilteredRecipes.length;
    const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);
    const validPage = Math.max(1, Math.min(currentPage, totalPages > 0 ? totalPages : 1));
    const startIndex = (validPage - 1) * RECIPES_PER_PAGE;
    const endIndex = startIndex + RECIPES_PER_PAGE;
    setPaginatedRecipes(allFilteredRecipes.slice(startIndex, endIndex));
    setVisibleCards(new Set());
    cardRefs.current = new Map();
  }, [allFilteredRecipes, currentPage]);

  // useEffect untuk animasi (tetap sama)
  useEffect(() => {
    // ... logika observer animasi ...
      if (paginatedRecipes.length === 0) return;
      const observer = new IntersectionObserver((entries) => { /* ... */
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  const id = entry.target.dataset.id;
                  if (id) {
                      const index = paginatedRecipes.findIndex(r => r && r.id.toString() === id);
                      if (index !== -1) {
                          setTimeout(() => {
                              setVisibleCards(prev => new Set(prev).add(parseInt(id, 10)));
                          }, (index % RECIPES_PER_PAGE) * 100);
                      }
                  }
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.1 });
      cardRefs.current.forEach((node) => { if (node) observer.observe(node); });
      return () => {
          cardRefs.current.forEach((node) => { if (node) observer.unobserve(node); });
          observer.disconnect();
      };
  }, [paginatedRecipes]);

  // handlePageChange (tetap sama)
  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(allFilteredRecipes.length / RECIPES_PER_PAGE)) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalPages = Math.ceil(allFilteredRecipes.length / RECIPES_PER_PAGE);

  return (
    // Ganti <main> menjadi <div>, tambahkan padding bottom di sini
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      {/* Konten utama ditaruh di div terpisah untuk padding horizontal */}
      <div className="max-w-7xl mx-auto px-4 mt-16 md:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
            Jelajahi Resep Makanan
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8 md:mb-12">
            Temukan inspirasi masakan Nusantara favoritmu. Dari hidangan utama hingga camilan, semua ada di sini.
        </p>

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {paginatedRecipes.length > 0 ? (
                paginatedRecipes.map((recipe) => (
                    recipe && (
                        <div
                            key={recipe.id}
                            ref={node => {
                                if (node) cardRefs.current.set(recipe.id.toString(), node);
                                else cardRefs.current.delete(recipe.id.toString());
                            }}
                            data-id={recipe.id}
                            className={`transition-all duration-500 ease-out ${
                                visibleCards.has(recipe.id)
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-6 opacity-0'
                            }`}
                        >
                            <RecipeCard
                                recipe={recipe}
                                onSelectRecipe={onSelectRecipe} // Gunakan prop onSelectRecipe
                                isFavorite={favorites.includes(recipe.id)}
                                onToggleFavorite={onToggleFavorite}
                                type="makanan"
                            />
                        </div>
                    )
                ))
            ) : (
                 <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16">
                    <p className="text-slate-500 text-lg">
                        {searchQuery ? `Resep "${searchQuery}" tidak ditemukan.` : "Tidak ada resep makanan."}
                    </p>
                    {searchQuery && <p className="text-slate-400 mt-2">Coba kata kunci lain.</p>}
                 </div>
            )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
             <div className="mt-8 md:mt-12 flex justify-center items-center space-x-4">
               {/* Tombol Sebelumnya */}
               <button
                 onClick={() => handlePageChange(currentPage - 1)}
                 disabled={currentPage === 1}
                 className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${ /* ... styling ... */ currentPage === 1 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'}`}
                 aria-label="Halaman Sebelumnya"
               >
                 <ChevronLeft size={18} className="mr-1" />
                 Sebelumnya
               </button>
               {/* Info Halaman */}
               <span className="text-slate-600 font-medium">
                 Halaman {currentPage} dari {totalPages}
               </span>
               {/* Tombol Berikutnya */}
               <button
                 onClick={() => handlePageChange(currentPage + 1)}
                 disabled={currentPage === totalPages}
                 className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${ /* ... styling ... */ currentPage === totalPages ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'}`}
                 aria-label="Halaman Berikutnya"
               >
                 Berikutnya
                 <ChevronRight size={18} className="ml-1" />
               </button>
             </div>
        )}
      </div>
    </div>
  );
}