import { Link } from "react-router-dom";
import { FaArrowDownLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { whyChooseUs, testimonials } from "../assets/assets";

const fadeInUpAnimation = {
  start: {
    opacity: 0,
    y: 200,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.4,
      duration: 0.7,
    },
  },
};

const LandingPage = () => {
  return (
    <div className="px-0 md:px-8 xl:px-20 2xl:px-36 bg-gray-800">
      {/* MainHero Component */}
      <div className="flex relative items-center justify-center h-screen bg-gray-800 text-white text-center px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <motion.div
          className="flex flex-col"
          initial="start"
          animate="end"
          variants={fadeInUpAnimation}
        >
          <motion.h1 className="mb-4" variants={fadeInUpAnimation}>
            <p className="rancers text-6xl md:text-9xl">BIZBRO</p>
            <p className="rancers text-xl md:text-2xl">Manage.Succeed.Grow</p>
          </motion.h1>
          <motion.div
            variants={fadeInUpAnimation}
            className="flex justify-center gap-4"
          >
            <Link
              to="/login"
              className="cursor-pointer bg-blue-600 hover:bg-blue-800 active:bg-blue-900 text-white py-2 px-3 md:py-2.5 md:px-5 shadow-lg transition"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="cursor-pointer bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white py-2 px-3 md:py-2.5 md:px-5 shadow-lg transition"
            >
              Register
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-20 text-2xl"
          initial={{ visibility: "hidden", y: 0 }}
          animate={{ visibility: "visible", y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <FaArrowDownLong />
        </motion.div>
      </div>

      {/* WhyChooseUs Component */}
      <div className="bg-gray-800 text-white px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="mb-10">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Why Choose BizBro?
            </h1>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              With BizBro - Maximize Efficiency and Streamline Your Business
              Operations with All-in-One Solutions for Managing Inventory,
              Tracking Sales, Organizing Customer Information, Handling
              Transactions, and Generating Invoices, All from a Single Powerful
              Platform.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {whyChooseUs.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 p-5 rounded border border-gray-400 shadow-2xl"
            >
              <h1 className="text-lg font-semibold md:text-2xl">
                {item.title}
              </h1>
              <p className="my-4">{item.description}</p>
              <img src={item.image} />
            </div>
          ))}
        </div>

        <p className="text-white text-xs md:text-sm pl-1 mt-4">
          and many more features to make your business journey easier ...
        </p>
      </div>

      {/* TestimonialSlider Component */}
      <div className="bg-gray-800 text-white px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-1">
          Hear from business owners
        </h1>

        <div className="mx-auto relative mt-4">
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            loop={true}
            navigation={{ nextEl: ".next-button", prevEl: ".prev-button" }}
          >
            {testimonials.map((testimonial, i) => (
              <SwiperSlide key={i}>
                <div className="bg-slate-700 p-4 rounded shadow-md text-white h-full md:min-h-70 border border-gray-400">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <img
                      src={testimonial.image}
                      className="h-15 w-15 object-cover rounded-full border border-gray-400"
                    />

                    <div>
                      <h3 className="text-lg md:text-xl font-semibold">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-200">
                        {testimonial.business}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic text-base">
                    "{testimonial.testimonial}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-around mt-1 md:mt-4">
            <div className="flex gap-2">
              <button className="prev-button border border-gray-400 bg-gray-700 p-3 rounded hover:bg-gray-600 z-10 cursor-pointer">
                <FaArrowLeft size={18} />
              </button>
              <button className="next-button border border-gray-400 bg-gray-700 p-3 rounded hover:bg-gray-600 z-10 cursor-pointer">
                <FaArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Component */}
      <div className="bg-gray-800 text-white px-6 md:px-16 lg:px-24 py-16 md:py-24 w-full">
        <div className="mb-5">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">Get In Touch</h1>
            <p className="text-base md:text-lg text-gray-300">
              Have questions about BizBro or need assistance? Our team is here
              to help.
            </p>
          </div>
        </div>

        <div className="bg-slate-800 p-5 border border-gray-400 rounded shadow-2xl w-full">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Information Side */}
            <div className="p-4">
              <h2 className="text-lg md:text-xl mb-4">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 text-blue-400">
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm md:text-base">
                      Office Address
                    </h3>
                    <p className="text-gray-300 text-xs md:text-sm">
                      44207, Narayangadh
                    </p>
                    <p className="text-gray-300 text-xs md:text-sm">
                      Bharatpur, Chitwan
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 mt-1 text-blue-400">
                    <FaPhone size={14} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm md:text-base">
                      Phone
                    </h3>
                    <p className="text-gray-300 text-xs md:text-sm">
                      +977 9845012367
                    </p>
                    <p className="text-gray-300 text-xs md:text-sm">
                      Sun-Fri: 10AM - 5PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 mt-1 text-blue-400">
                    <FaEnvelope size={14} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm md:text-base">
                      Email
                    </h3>
                    <p className="text-gray-300 text-xs md:text-sm">
                      support@bizbro.com
                    </p>
                    <p className="text-gray-300 text-xs md:text-sm">
                      info@bizbro.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 mt-1 text-blue-400">
                    <FaClock size={14} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm md:text-base">
                      Office Hours
                    </h3>
                    <p className="text-gray-300 text-xs md:text-sm">
                      Sunday to Friday: 10AM - 5PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Side */}
            <div className="p-4 md:border-l border-gray-600">
              <h2 className="text-lg md:text-xl mb-4">Send Us a Message</h2>

              <form className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-gray-700 border border-gray-600 rounded py-1.5 px-2 text-white text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-gray-700 border border-gray-600 rounded py-1.5 px-2 text-white text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-gray-700 border border-gray-600 rounded py-1.5 px-2 text-white text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full bg-gray-700 border border-gray-600 rounded py-1.5 px-2 text-white text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium py-2 px-4 rounded text-xs md:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-gray-800"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* GetStarted Component */}
      <div className="bg-gray-800 text-center px-6 md:px-16 lg:px-24 py-5 md:py-10">
        <h1 className="text-white text-lg md:text-xl mb-3">
          Ready to Streamline Your Business? Start Now!
        </h1>
        <Link to="/register">
          <button className="px-5 py-2.5 bg-blue-700 text-white text-sm md:text-base font-semibold cursor-pointer hover:bg-blue-500">
            GET STARTED
          </button>
        </Link>
      </div>

      {/* Footer Component */}
      <div className="bg-gray-800 px-6 md:px-16 lg:px-24 pt-20 md:pt-25 pb-4">
        <div className="flex flex-col justify-between sm:flex-row sm:items-end">
          <div>
            <p className="rancers text-white text-2xl md:text-6xl">BIZBRO</p>
            <p className="rancers text-white text-base md:text-xl">
              Manage. Succeed. Grow
            </p>
          </div>
          <p className="text-white text-xs md:text-lg mt-2">
            © {new Date().toLocaleDateString("en-US", { year: "numeric" })}{" "}
            Samip Poudel, All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
