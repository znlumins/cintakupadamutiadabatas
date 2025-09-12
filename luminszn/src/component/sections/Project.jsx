import React from 'react';
import { RevealOnScroll } from "../RevealOnScroll"; // Pastikan path import ini sesuai dengan struktur folder Anda

// Gambar fallback jika imageUrl kosong atau gagal dimuat
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop";

// === DATA PROYEK (Diperbarui & Lebih Lengkap Sesuai PDF) ===
const projectsData = [
  {
    title: "Sayembara Logo Angkatan",
    summary: "Desain logo filosofis yang menggabungkan simbol naga (kekuatan & kebijaksanaan) dan roda gigi untuk mewakili inovasi dalam pendidikan vokasi.",
    tags: ["Logo Design", "Branding", "Philosophy"],
    // Ganti dengan URL gambar yang sebenarnya
    imageUrl: "https://i.ibb.co.com/7N418L3b/DAFFA-AHMAD-AL-ATTAS-FILOSOFI-1.jpg",
    projectUrl: "http://bit.ly/4jtkwGb",
  },
  {
    title: "3D Modeling: Realism",
    summary: "Koleksi karya pemodelan 3D yang berfokus pada visualisasi objek realistis, seperti POCARI PET dan LUMINSCENT #1.",
    tags: ["3D Modeling", "Blender", "Realism", "Rendering"],
    // Ganti dengan URL gambar yang sebenarnya
    imageUrl: "https://i.ibb.co.com/V0qMw39t/3.png",
    projectUrl: "http://bit.ly/42qPglg",
  },
  {
    title: "3D Modeling: Low Poly",
    summary: "Eksplorasi gaya 'Low Poly' dalam pemodelan 3D untuk menciptakan aset visual yang menarik seperti roket, dadu, dan diorama ruangan.",
    tags: ["3D Modeling", "Low Poly", "Stylized Art"],
     // Ganti dengan URL gambar yang sebenarnya
    imageUrl: "https://i.ibb.co.com/KxTXWMfd/DAFFA-AHMAD-AL-ATTAS-ISOMETRIC-XIIMM2.png",
    projectUrl: "http://bit.ly/3ChJnw0",
  },
  {
    title: "Graphic Design Portfolio",
    summary: "Berbagai proyek desain grafis meliputi poster produk 'Makronix', desain sampul buku islami, dan undangan pernikahan yang elegan.",
    tags: ["Graphic Design", "Poster", "Cover Book", "Invitation"],
    // Ganti dengan URL gambar yang sebenarnya
    imageUrl: "https://i.ibb.co.com/5XgML6GP/3-daffmadz.png",
    projectUrl: "http://bit.ly/40vBTNU",
  },
  {
    title: "Company Profile: ESHAL MAFAZA",
    summary: "Kontribusi dalam pembuatan video profil untuk ESHAL MAFAZA (2023) dan HMPS TI (2024), menangani aspek editing dan visual.",
    tags: ["Video Editing", "Company Profile", "After Effects"],
    // Ganti dengan URL gambar yang sebenarnya
    imageUrl: "https://i.ibb.co.com/nqGW6YzY/Screenshot-2025-09-12-201732.png",
    projectUrl: "http://bit.ly/3CjPVds",
  },
  {
    title: "Bumper Video: DESAK VOKASI",
    summary: "Membuat video bumper (pembuka) yang energik dan menarik secara visual untuk acara DESAK VOKASI 2024.",
    tags: ["Motion Graphics", "Bumper", "Video Editing", "Premiere Pro"],
    // Ganti dengan URL gambar yang sebenarnya
    imageUrl: "https://images.unsplash.com/photo-1558502845-a70d959392e2?q=80&w=1974&auto=format&fit=crop",
    projectUrl: "http://bit.ly/3PObwOm",
  },
];


// ===== Komponen Kartu Proyek (JSX) =====
const ProjectCard = ({ project }) => {
  const imgSrc = project.imageUrl || FALLBACK_IMAGE;

  return (
    <div
      tabIndex="0"
      className="relative group h-72 overflow-hidden rounded-2xl border border-white/10 shadow-lg
                 transform transition-all duration-500 ease-in-out hover:-translate-y-2 focus-within:-translate-y-2
                 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] focus-within:shadow-[0_0_25px_rgba(59,130,246,0.6)]
                 outline-none"
    >
      <img
        src={imgSrc}
        alt={project.title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>
      <div className="relative h-full p-4 sm:p-6 flex flex-col justify-end">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white">{project.title}</h3>
          <p className="text-sm text-gray-300 mt-1 line-clamp-2">{project.summary}</p>
          <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100">
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, key) => (
                  <span key={key} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
                ))}
              </div>
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-x-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// === Komponen Utama (JSX) ===
export const Project = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20 bg-black">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};