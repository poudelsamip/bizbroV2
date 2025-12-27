// import { Link } from "react-router-dom";
// import { FaArrowDownLong } from "react-icons/fa6";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
// import { whyChooseUs, testimonials } from "../assets/assets";

// const fadeInUpAnimation = {
//   start: {
//     opacity: 0,
//     y: 200,
//   },
//   end: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.4,
//       duration: 0.7,
//     },
//   },
// };

// const LandingPage = () => {
//   return (
//     <div className="bg-white">
//       {/* MainHero Component */}
//       <div className="flex relative items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-center px-6 md:px-16 lg:px-24 py-16 md:py-24">
//         <motion.div
//           className="flex flex-col max-w-4xl"
//           initial="start"
//           animate="end"
//           variants={fadeInUpAnimation}
//         >
//           <motion.h1 className="mb-6" variants={fadeInUpAnimation}>
//             <p className="rancers text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
//               BIZBRO
//             </p>
//             <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700">
//               Manage. Succeed. Grow.
//             </p>
//             <p className="text-base md:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
//               Streamline your business operations with our all-in-one platform for inventory management, sales tracking, and financial insights.
//             </p>
//           </motion.h1>
//           <motion.div
//             variants={fadeInUpAnimation}
//             className="flex justify-center gap-4 mt-8"
//           >
//             <Link
//               to="/register"
//               className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
//             >
//               Get Started
//             </Link>
//             <Link
//               to="/login"
//               className="cursor-pointer bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 py-3 px-8 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
//             >
//               Log In
//             </Link>
//           </motion.div>
//         </motion.div>
//         <motion.div
//           className="absolute bottom-10 text-gray-400"
//           initial={{ visibility: "hidden", y: 0 }}
//           animate={{ visibility: "visible", y: [0, 10, 0] }}
//           transition={{
//             repeat: Infinity,
//             duration: 2,
//             ease: "easeInOut",
//             delay: 2,
//           }}
//         >
//           <FaArrowDownLong size={24} />
//         </motion.div>
//       </div>

//       {/* WhyChooseUs Component */}
//       <div className="bg-white px-6 md:px-16 lg:px-24 py-20 md:py-28">
//         <div className="mb-12 text-center">
//           <div className="max-w-3xl mx-auto">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//               Why Choose BizBro?
//             </h1>
//             <p className="text-base md:text-lg text-gray-600 leading-relaxed">
//               Maximize efficiency and streamline your business operations with our all-in-one solution for managing inventory, tracking sales, organizing customer information, handling transactions, and generating insights—all from a single powerful platform.
//             </p>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
//           {whyChooseUs.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 lg:p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
//             >
//               <h1 className="text-xl font-semibold md:text-2xl text-gray-900 mb-3">
//                 {item.title}
//               </h1>
//               <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
//               <div className="rounded-lg overflow-hidden border border-gray-200">
//                 <img src={item.image} className="w-full h-auto" alt={item.title} />
//               </div>
//             </div>
//           ))}
//         </div>

//         <p className="text-gray-500 text-sm md:text-base text-center mt-8">
//           And many more features to make your business journey easier...
//         </p>
//       </div>

//       {/* TestimonialSlider Component */}
//       <div className="bg-gray-50 px-6 md:px-16 lg:px-24 py-20 md:py-28">
//         <div className="text-center mb-12">
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//             Hear from Business Owners
//           </h1>
//           <p className="text-gray-600 text-lg">See how BizBro is transforming businesses</p>
//         </div>

//         <div className="mx-auto relative mt-8">
//           <Swiper
//             modules={[Navigation]}
//             spaceBetween={20}
//             slidesPerView={1}
//             breakpoints={{
//               640: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//               1280: { slidesPerView: 4 },
//             }}
//             loop={true}
//             navigation={{ nextEl: ".next-button", prevEl: ".prev-button" }}
//           >
//             {testimonials.map((testimonial, i) => (
//               <SwiperSlide key={i}>
//                 <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full border border-gray-200">
//                   <div className="flex items-center gap-4 mb-4">
//                     <img
//                       src={testimonial.image}
//                       className="h-14 w-14 object-cover rounded-full border-2 border-gray-200"
//                       alt={testimonial.name}
//                     />

//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {testimonial.name}
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         {testimonial.business}
//                       </p>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 italic leading-relaxed">
//                     "{testimonial.testimonial}"
//                   </p>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//           <div className="flex justify-center mt-8">
//             <div className="flex gap-3">
//               <button className="prev-button bg-white border border-gray-300 p-3 rounded-lg hover:bg-gray-50 shadow-sm hover:shadow transition-all cursor-pointer">
//                 <FaArrowLeft size={18} className="text-gray-700" />
//               </button>
//               <button className="next-button bg-white border border-gray-300 p-3 rounded-lg hover:bg-gray-50 shadow-sm hover:shadow transition-all cursor-pointer">
//                 <FaArrowRight size={18} className="text-gray-700" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Contact Component */}
//       <div className="bg-white px-6 md:px-16 lg:px-24 py-20 md:py-28 w-full">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
//           <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
//             Have questions about BizBro or need assistance? Our team is here to help.
//           </p>
//         </div>

//         <div className="bg-white p-6 lg:p-8 border border-gray-200 rounded-2xl shadow-lg w-full max-w-6xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
//             {/* Contact Information Side */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>

//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <div className="mr-4 mt-1 text-blue-600">
//                     <FaMapMarkerAlt size={18} />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-base text-gray-900 mb-1">
//                       Office Address
//                     </h3>
//                     <p className="text-gray-600 text-sm">
//                       44207, Narayangadh
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       Bharatpur, Chitwan
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="mr-4 mt-1 text-blue-600">
//                     <FaPhone size={18} />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-base text-gray-900 mb-1">
//                       Phone
//                     </h3>
//                     <p className="text-gray-600 text-sm">
//                       +977 9845012367
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       Sun-Fri: 10AM - 5PM
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="mr-4 mt-1 text-blue-600">
//                     <FaEnvelope size={18} />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-base text-gray-900 mb-1">
//                       Email
//                     </h3>
//                     <p className="text-gray-600 text-sm">
//                       support@bizbro.com
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       info@bizbro.com
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="mr-4 mt-1 text-blue-600">
//                     <FaClock size={18} />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-base text-gray-900 mb-1">
//                       Office Hours
//                     </h3>
//                     <p className="text-gray-600 text-sm">
//                       Sunday to Friday: 10AM - 5PM
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Form Side */}
//             <div className="md:border-l border-gray-200 md:pl-8 lg:pl-12">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>

//               <form className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Your name"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="your@email.com"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="subject"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Subject
//                   </label>
//                   <input
//                     type="text"
//                     id="subject"
//                     className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="How can we help you?"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="message"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     rows="4"
//                     className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                     placeholder="Write your message here..."
//                   ></textarea>
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-3 px-4 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                   >
//                     Send Message
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* GetStarted Component */}
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-center px-6 md:px-16 lg:px-24 py-12 md:py-16">
//         <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
//           Ready to Streamline Your Business? Start Now!
//         </h1>
//         <Link to="/register">
//           <button className="px-8 py-3.5 bg-white text-blue-600 text-base md:text-lg font-semibold cursor-pointer hover:bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
//             GET STARTED
//           </button>
//         </Link>
//       </div>

//       {/* Footer Component */}
//       <div className="bg-gray-900 px-6 md:px-16 lg:px-24 pt-16 md:pt-20 pb-8">
//         <div className="flex flex-col justify-between sm:flex-row sm:items-center">
//           <div className="mb-4 sm:mb-0">
//             <p className="rancers text-white text-3xl md:text-5xl mb-2">BIZBRO</p>
//             <p className="text-gray-400 text-sm md:text-base">
//               Manage. Succeed. Grow
//             </p>
//           </div>
//           <p className="text-gray-400 text-sm md:text-base">
//             © {new Date().toLocaleDateString("en-US", { year: "numeric" })}{" "}
//             Samip Poudel, All Rights Reserved
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
import { motion } from "framer-motion";
import { useState } from "react";
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

// Sample data
const whyChooseUs = [
  {
    title: "Smart Inventory Management",
    description:
      "Track stock levels in real-time, automate reordering, and never run out of products. Our intelligent system predicts demand and optimizes your inventory.",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop",
  },
  {
    title: "Advanced Sales Analytics",
    description:
      "Gain deep insights into your sales patterns with powerful analytics. Make data-driven decisions with beautiful, easy-to-understand dashboards.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "Customer Relationship Management",
    description:
      "Build lasting relationships with your customers. Track interactions, manage contacts, and personalize your service for maximum satisfaction.",
    image:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=400&fit=crop",
  },
  {
    title: "Financial Tracking & Reporting",
    description:
      "Stay on top of your finances with comprehensive tracking and automated reporting. Monitor cash flow, expenses, and profitability at a glance.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  },
];

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BIZBRO
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#features"
                className="px-5 py-2.5 text-gray-700 hover:text-blue-600 font-semibold transition-colors rounded-full hover:bg-blue-50"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="px-5 py-2.5 text-gray-700 hover:text-blue-600 font-semibold transition-colors rounded-full hover:bg-blue-50"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 text-gray-700 hover:text-blue-600 font-semibold transition-colors rounded-full hover:bg-blue-50"
              >
                Contact
              </a>
              <button className="px-5 py-2.5 text-gray-700 font-semibold hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50">
                Sign In
              </button>
              <button className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 py-4 border-t border-gray-200"
            >
              <div className="flex flex-col gap-4">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <div className="flex flex-col gap-2 mt-2">
                  <button className="px-5 py-2.5 text-gray-700 font-semibold hover:text-blue-600 transition-colors border border-gray-200 rounded-full">
                    Sign In
                  </button>
                  <button className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-white pt-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          {/* Large Circle Gradient */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-full blur-3xl opacity-60"></div>

          {/* Floating Shapes */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-2xl opacity-20"
            animate={{ y: [0, 30, 0], rotate: [0, 90, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-40 right-20 w-16 h-16 bg-indigo-400 rounded-full opacity-20"
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-24 h-24 bg-purple-400 rounded-2xl opacity-20"
            animate={{ y: [0, 40, 0], rotate: [0, -90, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-14 h-14 bg-pink-400 rounded-full opacity-20"
            animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-bold mb-6">
                <Sparkles className="w-4 h-4" />
                #1 Business Management Platform
              </div>

              <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
                Run Your
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Business
                </span>
                <br />
                Smarter
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The complete platform for inventory management, sales tracking,
                customer relations, and financial insights. Built for businesses
                that want to grow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="group px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-lg">
                  Watch Demo
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                      className="w-10 h-10 rounded-full border-2 border-white"
                      alt="User"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop"
                      className="w-10 h-10 rounded-full border-2 border-white"
                      alt="User"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop"
                      className="w-10 h-10 rounded-full border-2 border-white"
                      alt="User"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      10,000+ Users
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-l border-gray-300 pl-8">
                  <div className="text-sm text-gray-600">Free 14-day trial</div>
                  <div className="text-sm font-bold text-gray-900">
                    No credit card required
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Mockup/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Dashboard Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="p-8">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                      <div className="text-sm text-blue-600 font-semibold mb-1">
                        Revenue
                      </div>
                      <div className="text-2xl font-black text-gray-900">
                        $45,231
                      </div>
                      <div className="text-xs text-green-600 font-bold">
                        +12.5% ↑
                      </div>
                    </div>
                    <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200">
                      <div className="text-sm text-indigo-600 font-semibold mb-1">
                        Orders
                      </div>
                      <div className="text-2xl font-black text-gray-900">
                        1,429
                      </div>
                      <div className="text-xs text-green-600 font-bold">
                        +8.2% ↑
                      </div>
                    </div>
                  </div>

                  {/* Chart Representation */}
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-end justify-between h-32 gap-2">
                      {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-600 rounded-t-lg transition-all hover:scale-105"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-600 font-semibold mt-4 text-center">
                      Weekly Sales Performance
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 1 */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-4 w-48"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-semibold">
                      Profit
                    </div>
                    <div className="text-lg font-black text-gray-900">
                      +$12.4k
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-4 w-48"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-semibold">
                      Secure
                    </div>
                    <div className="text-lg font-black text-gray-900">100%</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="relative py-32 px-6 md:px-16 lg:px-24 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Why Choose BizBro?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Enterprise-grade features designed to scale with your business.
                Everything you need to manage operations efficiently.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="rounded-2xl overflow-hidden border-2 border-white shadow-xl group-hover:shadow-2xl transition-shadow">
                    <img
                      src={item.image}
                      className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                      alt={item.title}
                    />
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-all"></div>
              </motion.div>
            ))}
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              {
                icon: TrendingUp,
                text: "Real-time Analytics",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Shield,
                text: "Bank-level Security",
                color: "from-indigo-500 to-indigo-600",
              },
              {
                icon: Zap,
                text: "Lightning Fast",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Sparkles,
                text: "AI-Powered Insights",
                color: "from-pink-500 to-pink-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
              >
                <div
                  className={`p-4 bg-gradient-to-br ${item.color} rounded-2xl shadow-lg`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-800 text-sm font-bold text-center">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

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
      <div
        id="contact"
        className="relative py-32 px-6 md:px-16 lg:px-24 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              Questions? We're here to help you succeed
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-100 p-8 lg:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>

                {[
                  {
                    icon: MapPin,
                    title: "Office Address",
                    lines: ["44207, Narayangadh", "Bharatpur, Chitwan"],
                    color: "bg-blue-100 text-blue-600",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    lines: ["+977 9845012367", "Sun-Fri: 10AM - 5PM"],
                    color: "bg-indigo-100 text-indigo-600",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    lines: ["support@bizbro.com", "info@bizbro.com"],
                    color: "bg-purple-100 text-purple-600",
                  },
                  {
                    icon: Clock,
                    title: "Office Hours",
                    lines: ["Sunday to Friday: 10AM - 5PM"],
                    color: "bg-pink-100 text-pink-600",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`p-4 ${item.color} rounded-2xl shadow-md`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        {item.title}
                      </h4>
                      {item.lines.map((line, j) => (
                        <p key={j} className="text-gray-600 text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <textarea
                    rows="5"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  ></textarea>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            Start Your Free Trial
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
