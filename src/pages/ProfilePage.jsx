// src/pages/ProfilePage.jsx
import { Users, User, Hash } from 'lucide-react'; // Import ikon yang relevan

export default function ProfilePage() {
  const groupInfo = {
    groupName: "Kelompok Praktikum 4 PBB",
    members: [
      { name: "Muhammad Riza Saputra", nim: "21120123140117" },
      { name: "Ryan Sukma Purwojanarko", nim: "21120123130100" },
      { name: "Ian Widi Antaressa", nim: "21120123140137" }, 
      { name: "Muhammad Ilham", nim: "21120123120003" }
    ]
  };

  return (
    // Wrapper utama dengan background dan padding
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8 pb-20 md:pb-8">
      {/* Kontainer pembatas lebar */}
      <div className="max-w-3xl mx-auto">
        {/* Judul Halaman */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-8 md:mb-12 text-center">
          Profil Kelompok Praktikum
        </h1>
        {/* Kartu Informasi */}
        <div className="bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl shadow-xl p-6 md:p-10">
          {/* Header Nama Kelompok */}
          <div className="flex items-center justify-center mb-8 border-b border-indigo-200 pb-6">
            <Users className="w-8 h-8 md:w-10 md:h-10 text-blue-600 mr-4" /> {/* Ikon Grup */}
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-800">
              {groupInfo.groupName} {/* Tampilkan Nama Kelompok */}
            </h2>
          </div>

          {/* Judul Daftar Anggota */}
          <h3 className="text-xl md:text-2xl font-semibold text-slate-700 mb-6 text-center">
            Anggota Kelompok:
          </h3>
          {/* Container untuk daftar anggota */}
          <div className="space-y-5">
            {/* Loop data anggota menggunakan map */}
            {groupInfo.members.map((member, index) => (
              // Kartu untuk setiap anggota
              <div key={index} className="flex items-center bg-white/50 border border-blue-100 rounded-lg p-4 shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:shadow-md">
                {/* Ikon Anggota */}
                <div className="flex-shrink-0 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full p-2.5 mr-4">
                    <User className="w-5 h-5 md:w-6 md:h-6 text-blue-700" />
                </div>
                {/* Informasi Nama dan NIM */}
                <div className="flex-grow">
                  <p className="font-medium text-slate-800 text-base md:text-lg">{member.name}</p> {/* Nama Anggota */}
                  <div className="flex items-center text-slate-500 text-sm mt-1">
                     <Hash size={14} className="mr-1.5"/> {/* Ikon Hash untuk NIM */}
                     <span>{member.nim}</span> {/* NIM Anggota */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}