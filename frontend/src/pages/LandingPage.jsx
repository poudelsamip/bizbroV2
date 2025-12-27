import { motion } from "framer-motion";
import { useState } from "react";
import { whyChooseUs } from "../assets/assets.js";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Star,
  Menu,
  X,
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    business: "Urban Fashion Boutique",
    testimonial:
      "BizBro transformed how we manage inventory. We've reduced stockouts by 90% and increased profits by 40%.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "Michael Rodriguez",
    business: "Tech Solutions Inc.",
    testimonial:
      "The analytics dashboard is incredible. We now make informed decisions backed by real data. Game changer!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Emily Watson",
    business: "Organic Market",
    testimonial:
      "Customer management has never been easier. Our retention rate improved by 60% in just 3 months.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    name: "David Kim",
    business: "Kim's Restaurant",
    testimonial:
      "Simple, powerful, and exactly what we needed. The financial tracking alone has saved us countless hours.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
];

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const visibleTestimonials = [
    testimonials[currentSlide % testimonials.length],
    testimonials[(currentSlide + 1) % testimonials.length],
    testimonials[(currentSlide + 2) % testimonials.length],
  ];

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 font-extrabold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center">
              B
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BIZBRO
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Testimonials", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to={"/login"}
              className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
            >
              Sign In
            </Link>
            <Link
              to={"/register"}
              className="px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 shadow-md"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mx-4 mt-2 p-4 rounded-2xl bg-white shadow-xl border border-gray-200"
          >
            <div className="flex flex-col gap-4">
              {["Features", "Testimonials", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  {item}
                </a>
              ))}

              <div className="pt-2 border-t flex flex-col gap-2">
                <Link
                  to={"/login"}
                  className="py-2 rounded-full border text-gray-700 font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to={"/register"}
                  className="py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center bg-white pt-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center md:text-left"
            >
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-xs font-bold mb-5">
                <Sparkles className="w-4 h-4" />
                #1 Business Platform
              </div> */}

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
                Run Your{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Business
                </span>{" "}
                Smarter
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto md:mx-0 mb-8">
                Manage inventory, sales, customers, and insights — all in one
                powerful platform built for growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-7 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Trust */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 mt-10 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/40?img=${i}`}
                        className="w-9 h-9 rounded-full border-2 border-white"
                        alt=""
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">
                    10k+ users
                  </span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="w-full max-w-md md:max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 bg-red-400 rounded-full" />
                    <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <span className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-xs text-blue-600 font-semibold">
                        Revenue
                      </p>
                      <p className="text-xl font-black">$45,231</p>
                    </div>
                    <div className="bg-indigo-50 rounded-xl p-4">
                      <p className="text-xs text-indigo-600 font-semibold">
                        Orders
                      </p>
                      <p className="text-xl font-black">1,429</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-end h-28 gap-2">
                      {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-600 rounded-md"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-3 text-center">
                      Weekly Sales
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating cards – desktop only */}
              <div className="hidden md:block">
                <motion.div
                  className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 w-44"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <p className="text-xs text-gray-500">Profit</p>
                  <p className="font-black text-lg">+$12.4k</p>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 w-44"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5 }}
                >
                  <p className="text-xs text-gray-500">Security</p>
                  <p className="font-black text-lg">100%</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section
        id="features"
        className="relative py-28 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-white to-blue-50/40"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
              Built for Modern Businesses
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Enterprise-grade tools designed to simplify operations, boost
              productivity, and scale confidently.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-10">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>

                {/* Accent glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-blue-500/10 opacity-0 group-hover:opacity-100 transition" />
              </motion.div>
            ))}
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
            {[
              {
                icon: TrendingUp,
                text: "Real-time Analytics",
              },
              {
                icon: Shield,
                text: "Secure by Design",
              },
              {
                icon: Zap,
                text: "High Performance",
              },
              {
                icon: Sparkles,
                text: "AI-Powered Insights",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition"
              >
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-gray-800 font-semibold text-sm">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div
        id="testimonials"
        className="relative py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Trusted by Businesses
            </h2>
            <p className="text-xl text-gray-600">
              See how we're making a difference
            </p>
          </div>

          <div className="relative">
            {/* Mobile Single Slide */}
            <div className="md:hidden">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonials[currentSlide].image}
                    className="h-16 w-16 object-cover rounded-full border-4 border-blue-100 shadow-lg"
                    alt={testimonials[currentSlide].name}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {testimonials[currentSlide].name}
                    </h3>
                    <p className="text-sm text-blue-600 font-semibold">
                      {testimonials[currentSlide].business}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  "{testimonials[currentSlide].testimonial}"
                </p>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Three Slides */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              {visibleTestimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      className="h-16 w-16 object-cover rounded-full border-4 border-blue-100 shadow-lg"
                      alt={testimonial.name}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-semibold">
                        {testimonial.business}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    "{testimonial.testimonial}"
                  </p>

                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={prevSlide}
                className="bg-white border-2 border-gray-200 p-4 rounded-full hover:bg-gray-50 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors" />
              </button>
              <button
                onClick={nextSlide}
                className="bg-white border-2 border-gray-200 p-4 rounded-full hover:bg-gray-50 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <ArrowRight className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-20 px-6 md:px-16 lg:px-24 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p className="text-gray-600">
              Have questions? Our team is ready to help.
            </p>
          </div>

          {/* Card */}
          <div className="grid md:grid-cols-2 gap-10 bg-gray-50 rounded-3xl border border-gray-200 p-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Address", value: "Bharatpur, Chitwan" },
                { icon: Phone, label: "Phone", value: "+977 9845012367" },
                { icon: Mail, label: "Email", value: "support@bizbro.com" },
                { icon: Clock, label: "Hours", value: "Sun–Fri, 10AM–5PM" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-semibold text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 
                         text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 
                         text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 
                       text-gray-900 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />

                <textarea
                  rows="4"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 
                       text-gray-900 placeholder-gray-400 resize-none
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />

                <button
                  onClick={handleSubmit}
                  className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold
                       hover:bg-blue-700 transition shadow-md"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="relative py-24 px-6 overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of businesses already growing with BizBro
          </p>
          <button className="px-10 py-5 bg-white text-blue-600 text-lg font-black rounded-full hover:bg-gray-50 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-3">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-gray-200 px-6 md:px-16 lg:px-24 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              BIZBRO
            </p>
            <p className="text-gray-600 font-semibold">
              Manage. Succeed. Grow.
            </p>
          </div>
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} Samip Poudel. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
