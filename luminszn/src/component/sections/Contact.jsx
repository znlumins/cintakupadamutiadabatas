import { RevealOnScroll } from "../RevealOnScroll";
import { FiSend, FiMail, FiMapPin } from 'react-icons/fi'; // Menggunakan ikon yang lebih konsisten

export const Contact = () => {
    return (
        <section
            id="contact"
            className="min-h-screen w-full flex items-center justify-center py-20 px-4 bg-modern-dark" // Pastikan ada background yang sesuai
        >
            <RevealOnScroll>
                {/* Container utama yang lebih lebar untuk layout full */}
                <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* === KOLOM KIRI: AJAKAN & INFO === */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Let's Build
                            <br />
                            Something Great.
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-lg mx-auto lg:mx-0">
                            Punya ide brilian atau butuh bantuan untuk proyek Anda? Saya siap membantu mewujudkannya. Hubungi saya melalui form di samping.
                        </p>
                        
                        {/* Info kontak yang relevan */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center lg:justify-start space-x-3">
                                <FiMail className="text-cyan-400" size={20} />
                                <span className="text-gray-300">adamfairuz7@student.ub.ac.id</span>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start space-x-3">
                                <FiMapPin className="text-cyan-400" size={20} />
                                <span className="text-gray-300">Cilacap, Indonesia</span>
                            </div>
                        </div>
                    </div>

                    {/* === KOLOM KANAN: FORM DENGAN EFEK KACA (GLASSMORPHISM) === */}
                    <div className="bg-black/20 backdrop-blur-md p-8 sm:p-12 rounded-2xl border border-white/10">
                        <form className="space-y-8">
                            <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
                                <div className="relative flex-1">
                                    <input type="text" id="name" name="name" required className="peer w-full bg-transparent border-b-2 border-white/20 pt-4 pb-2 text-white outline-none transition focus:border-cyan-400" placeholder=" " />
                                    <label htmlFor="name" className="absolute left-0 -top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:-top-0 peer-focus:text-cyan-400 peer-focus:text-sm">Name</label>
                                </div>
                                <div className="relative flex-1">
                                    <input type="email" id="email" name="email" required className="peer w-full bg-transparent border-b-2 border-white/20 pt-4 pb-2 text-white outline-none transition focus:border-cyan-400" placeholder=" " />
                                    <label htmlFor="email" className="absolute left-0 -top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:-top-0 peer-focus:text-cyan-400 peer-focus:text-sm">Email Address</label>
                                </div>
                            </div>

                            <div className="relative">
                                <textarea id="message" name="message" required
                                    className="peer w-full h-36 bg-transparent border-b-2 border-white/20 pt-4 pb-2 text-white outline-none transition focus:border-cyan-400 resize-none overflow-y-auto"
                                    placeholder=" " 
                                />
                                <label htmlFor="message" className="absolute left-0 -top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:-top-0 peer-focus:text-cyan-400 peer-focus:text-sm">Your Message</label>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden transform hover:-translate-y-1 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/40"
                                >
                                    <span className="mr-2">Send Inquiry</span>
                                    <FiSend />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
};