// src/pages/RecipeDetailPage.jsx
import { ArrowLeft, Clock, ChefHat, Soup, Utensils, Coffee } from 'lucide-react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';

export default function RecipeDetailPage({ recipeId, recipeType, onBack }) {
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
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} pb-20 md:pb-8`}>
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Daftar {typeLabel}</span>
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Image */}
          <div className="h-64 md:h-96 overflow-hidden">
            <img 
              src={recipe.image_url}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-10">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-4">
               <span className={`text-sm font-semibold ${recipeType === 'makanan' ? 'text-blue-700 bg-blue-100' : 'text-green-700 bg-green-100'} px-3 py-1.5 rounded-full`}>
                {typeLabel}
              </span>
              <div className="flex items-center space-x-1 text-yellow-500">
                <ChefHat className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold text-slate-700">Resep Nusantara</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">
              {recipe.name}
            </h1>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-10 text-slate-600">
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{recipe.steps.length} Langkah</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                <IconComponent className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{recipe.ingredients.length} Bahan</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">Bahan-Bahan</h2>
              <ul className="space-y-3 list-disc pl-5 text-slate-700">
                {recipe.ingredients.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">Langkah-Langkah Memasak</h2>
              <ol className="space-y-6 text-slate-700">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm mr-4 shadow-md">
                      {index + 1}
                    </div>
                    <p className="flex-1 pt-1 leading-relaxed">{step}</p>
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