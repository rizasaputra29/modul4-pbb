// src/pages/RecipeDetailPage.jsx
// (Gunakan kode RecipeDetailPage.jsx dari respons sebelumnya yang sudah menyertakan
// props isFavorite dan onToggleFavorite serta tombol Heart di dalamnya)
// Pastikan nama file ini sesuai dengan yang di-import di main.jsx
import { ArrowLeft, Clock, ChefHat, Soup, Utensils, Coffee, Heart } from 'lucide-react'; // Tambahkan Heart
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';

// Terima props isFavorite dan onToggleFavorite
export default function RecipeDetailPage({ recipeId, recipeType, onBack, isFavorite, onToggleFavorite }) {
  let recipe = null;
  let bgColor = 'from-blue-50 via-white to-indigo-50';
  let icon = Utensils;
  let typeLabel = '';

  if (recipeType === 'makanan') {
    recipe = Object.values(ResepMakanan.resep).find(r => r.id === recipeId);
    bgColor = 'from-blue-50 via-white to-indigo-50';
    icon = Soup;
    typeLabel = 'Makanan';
  } else if (recipeType === 'minuman') {
    recipe = Object.values(ResepMinuman.resep).find(r => r.id === recipeId);
    bgColor = 'from-green-50 via-white to-cyan-50';
    icon = Coffee;
    typeLabel = 'Minuman';
  }

  if (!recipe) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${bgColor} flex flex-col items-center justify-center p-8`}>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">404 Resep Tidak Ditemukan</h1>
        <p className="text-slate-600 mb-8">Maaf, resep yang Anda cari tidak ada.</p>
        <button
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>
      </div>
    );
  }

  const IconComponent = icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} pb-8 pt-6 md:pt-10`}> {/* Kurangi padding top */}
      <main className="max-w-4xl mx-auto px-4 md:px-8">

        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
        >
          <ArrowLeft size={20} className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
          Kembali
        </button>

        <div className="bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden"> {/* Sesuaikan background */}

          {/* Image */}
          <div className="relative h-64 md:h-96 group"> {/* Group untuk hover scale tombol fav */}
            <img
              src={recipe.image_url}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Tombol Favorit di Detail */}
             <button
                onClick={onToggleFavorite}
                className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-white/70 text-slate-600 hover:text-red-500 hover:bg-white/90'
                } backdrop-blur-sm shadow-lg`}
                aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
             >
                 <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
             </button>

             {/* Info Singkat di Gambar */}
             <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
                <div className="flex items-center space-x-1.5 bg-black/40 px-2.5 py-1.5 rounded-full backdrop-blur-sm">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.ingredients.length} Bahan</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-black/40 px-2.5 py-1.5 rounded-full backdrop-blur-sm">
                    <ChefHat className="w-4 h-4" /> {/* Gunakan ChefHat untuk konsistensi */}
                    <span>{recipe.steps.length} Langkah</span>
                </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            {/* Header */}
             <div className="flex items-center justify-between mb-4"> {/* Justify between */}
               <span className={`text-sm font-semibold ${recipeType === 'makanan' ? 'text-blue-700 bg-blue-100' : 'text-green-700 bg-green-100'} px-3 py-1.5 rounded-full`}>
                {typeLabel}
              </span>
              {/* Anda bisa menambahkan info lain di sini jika perlu */}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-8 text-center"> {/* Ukuran font disesuaikan */}
              {recipe.name}
            </h1>

            {/* Ingredients */}
            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-4 border-b pb-2 border-slate-200">Bahan-Bahan</h2>
              <ul className="list-disc list-outside space-y-2 text-slate-600 pl-5">
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-4 border-b pb-2 border-slate-200">Langkah-Langkah</h2>
              <ol className="list-decimal list-outside space-y-4 text-slate-600 pl-5 leading-relaxed"> {/* Tambah space */}
                {recipe.steps.map((step, index) => (
                   <li key={index} className="flex items-start">
                     <span className="flex-shrink-0 font-semibold text-blue-600 mr-2.5">{index + 1}.</span>
                     <p>{step}</p>
                   </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}