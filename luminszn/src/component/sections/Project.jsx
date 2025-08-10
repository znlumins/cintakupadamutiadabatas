import { RevealOnScroll } from "../RevealOnScroll";

// fallback image bila imageUrl kosong/gagal dimuat
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop";

// === DATA PROYEK ===
const projectsData = [
  {
    title: "AI-Powered Inventory System",
    summary: "Sistem manajemen gudang berbasis AI untuk optimasi inventaris dan perkiraan permintaan.",
    description: "Developed a warehouse management system using AI for demand forecasting and route optimization, reducing operational costs.",
    tags: ["React", "Python", "FastAPI", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop",
    projectUrl: "#",
  },
  {
    title: "Cinematic Short — Echoes",
    summary: "Editor utama untuk film pendek, menangani editing, grading, dan motion graphics.",
    description: "Lead editor and script consultant. Responsible for editing, color grading, motion graphics, and refining the narrative flow.",
    tags: ["Premiere Pro", "After Effects", "Blender"],
    imageUrl: "https://images.unsplash.com/photo-1505682634904-d7c5dc72f82d?q=80&w=2070&auto=format&fit=crop",
    projectUrl: "#",
  },
  {
    title: "E-Commerce Platform (Vue + Node)",
    summary: "Platform penjualan online dengan fitur katalog, keranjang, dan checkout.",
    description: "Full-stack e-commerce using Vue frontend and Node/Express backend with payment integration.",
    tags: ["Vue", "Node.js", "Express"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    projectUrl: "#",
  },
  {
    title: "Realtime Chat App (Angular + Firebase)",
    summary: "Aplikasi chat real-time dengan autentikasi dan storage pesan terpusat.",
    description: "Realtime messaging using Angular and Firebase (Auth, Firestore, Hosting).",
    tags: ["Angular", "Firebase", "TypeScript"],
    imageUrl: "https://images.unsplash.com/photo-1600267165517-8c5b08b158d2?q=80&w=2070&auto=format&fit=crop",
    projectUrl: "#",
  },
  {
    title: "Landing Page Modern (Svelte + Tailwind)",
    summary: "Landing page produk responsif dengan animasi halus dan CTA kuat.",
    description: "Built a fast, accessible landing page using Svelte and TailwindCSS with A/B-ready sections.",
    tags: ["Svelte", "TailwindCSS", "Supabase"],
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    projectUrl: "#",
  },
  {
    title: "Personal Portfolio (HTML/CSS/JS)",
    summary: "Website portfolio untuk menampilkan proyek, blog kecil, dan kontak.",
    description: "Static portfolio site with responsive layout, project galleries and contact form integration.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: "https://images.unsplash.com/photo-1618335829737-2228915674e0?q=80&w=2070&auto=format&fit=crop",
    projectUrl: "#",
  },
];

// ===== KARTU PROYEK =====
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
      {/* Gambar Latar Belakang */}
      <img
        src={imgSrc}
        alt={project.title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500
                   group-hover:scale-105"
      />

      {/* Lapisan Gradasi Gelap */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>

      {/* Kontainer Konten */}
      <div className="relative h-full p-4 sm:p-6 flex flex-col justify-end">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white">{project.title}</h3>
          <p className="text-sm text-gray-300 mt-1 line-clamp-2">{project.summary}</p>

          {/* Detail muncul saat hover */}
          <div
            className="overflow-hidden max-h-0 opacity-0
                       transition-all duration-500 ease-in-out
                       group-hover:max-h-40 group-hover:opacity-100
                       group-focus-within:max-h-40 group-focus-within:opacity-100"
          >
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, key) => (
                  <span key={key} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg
                           hover:bg-blue-700 transition-colors duration-300"
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// === KOMPONEN UTAMA ===
export const Project = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20 bg-black">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>

          {/* Grid: 1 kolom di mobile, 2 kolom di tablet, 3 kolom di desktop */}
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
