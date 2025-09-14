import React, { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { FiSend } from "react-icons/fi";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_2s7xh8v",   // <- ganti dengan Service ID
        "template_wvcdckb",  // <- ganti dengan Template ID
        e.target,
        "1msSItCqlMhAj9BKY"    // <- ganti dengan Public Key
      )
      .then(
        () => {
          setNotif("✅ Message sent successfully!");
          e.target.reset();
          setLoading(false);
          setTimeout(() => setNotif(""), 3000);
        },
        (error) => {
          console.error("EmailJS error:", error);
          setNotif("❌ Failed to send. Try again!");
          setLoading(false);
          setTimeout(() => setNotif(""), 3000);
        }
      );
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 py-16 sm:p-8 md:p-16 overflow-x-hidden"
    >
      <div className="w-full max-w-5xl mx-auto">
        <RevealOnScroll>
          {/* Bagian Teks */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide md:whitespace-nowrap">
              Let’s Create Something{" "}
              <span className="text-cyan-400">Remarkable.</span>
            </h2>
            <p className="text-gray-400 text-base mt-4 max-w-xl mx-auto">
              I help bring ideas to life with modern and efficient digital
              solutions. Have a project in mind? I'd love to hear about it.
            </p>
          </div>

          {/* Bagian Form */}
          <div className="mt-12 w-full max-w-xl mx-auto relative">
            {notif && (
              <div className="absolute -top-14 left-0 right-0 text-center text-sm text-white bg-green-500/90 py-2 px-4 rounded-lg animate-fade-in">
                {notif}
              </div>
            )}
            <div className="bg-black p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-2xl shadow-cyan-500/10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="peer w-full bg-transparent border-b-2 border-gray-600 pt-4 pb-2 placeholder-transparent text-white outline-none focus:border-cyan-400"
                      placeholder="Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:-top-0 peer-focus:text-cyan-400 peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="peer w-full bg-transparent border-b-2 border-gray-600 pt-4 pb-2 placeholder-transparent text-white outline-none focus:border-cyan-400"
                      placeholder="Email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:-top-0 peer-focus:text-cyan-400 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="peer w-full h-36 bg-transparent border-b-2 border-gray-600 pt-4 pb-2 placeholder-transparent text-white outline-none focus:border-cyan-400 resize-none"
                    placeholder="Your Message"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 -top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:-top-0 peer-focus:text-cyan-400 peer-focus:text-sm"
                  >
                    Your Message
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-black py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Fire It Away"}
                  {!loading && <FiSend className="ml-2" />}
                </button>
              </form>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Contact;
