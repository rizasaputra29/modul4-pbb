// src/pages/ProfilePage.jsx
import { Package, Code, Copyright } from 'lucide-react';
import logoUrl from '../assets/LOGORN.png';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8 pb-20 md:pb-8">
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-12">
          Tentang Aplikasi
        </h1>
        
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100 text-center">
          
          {/* Logo and App Name */}
          <div className="flex flex-col items-center mb-8">
             <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/10 mb-4">
                <img 
                    src={logoUrl} 
                    alt="Logo Resep Nusantara"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-lg"
                />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Resep Nusantara</h2>
            <p className="text-slate-500 text-lg">Warisan Kuliner Indonesia</p>
          </div>

          <div className="space-y-4 max-w-sm mx-auto pt-6 border-t border-gray-100">
            {/* Version Info */}
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-blue-50 text-slate-700">
              <Package className="w-6 h-6 text-blue-500" />
              <span className="font-medium flex-1 text-left">Versi Aplikasi</span>
              <span className="font-bold text-blue-600">1.0</span>
            </div>

            {/* Creator Info */}
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-blue-50 text-slate-700">
              <Code className="w-6 h-6 text-blue-500" />
              <span className="font-medium flex-1 text-left">Dikembangkan oleh</span>
              <span className="font-bold text-slate-800">Muhammad Riza Saputra</span>
            </div>
            
            {/* Copyright */}
            <div className="flex items-center justify-center space-x-2 pt-4 text-slate-500 text-sm">
              <Copyright className="w-4 h-4" />
              <span>2025 Resep Nusantara. All rights reserved.</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}