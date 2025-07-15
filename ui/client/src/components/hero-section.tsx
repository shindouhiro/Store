import { motion } from "framer-motion";
import { Link } from "wouter";
import { fadeIn, fadeInUp, floatingAnimation, buttonHover } from "@/lib/animations";
import { ArrowDown, Play, Rocket } from "lucide-react";

export default function HeroSection() {
  const floatingElements = [
    { size: "w-4 h-4", color: "bg-blue-400", position: "top-20 left-10", delay: 0 },
    { size: "w-3 h-3", color: "bg-purple-400", position: "top-40 right-20", delay: 2 },
    { size: "w-5 h-5", color: "bg-pink-400", position: "bottom-40 left-20", delay: 4 },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Parallax Background */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
          alt="Premium athletic shoes collection"
          className="w-full h-full object-cover transform scale-110 parallax-bg"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            variants={floatingAnimation}
            animate="animate"
            transition={{ delay: element.delay }}
            className={`absolute ${element.position} ${element.size} ${element.color} rounded-full opacity-60`}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 h-screen flex items-center">
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="max-w-3xl"
        >
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Premium{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Footwear
            </span>
            <br />
            Export Solutions
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            Connecting global markets with premium quality shoes. From athletic performance to elegant dress shoes - your trusted B2B partner for exceptional footwear.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/products">
              <motion.button
                variants={buttonHover}
                whileHover="whileHover"
                whileTap="whileTap"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-2xl cursor-pointer"
              >
                <Rocket className="inline mr-2" size={20} />
                Explore Catalog
              </motion.button>
            </Link>
            
            <motion.button
              variants={buttonHover}
              whileHover="whileHover"
              whileTap="whileTap"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              <Play className="inline mr-2" size={20} />
              Watch Story
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
