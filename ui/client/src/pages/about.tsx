import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, floatingAnimation } from "@/lib/animations";
import { Award, Globe, Shield, Truck, Users, Target } from "lucide-react";

export default function About() {
  const stats = [
    { value: "15+", label: "Years Experience", icon: Award },
    { value: "50+", label: "Countries Served", icon: Globe },
    { value: "500+", label: "Trusted Partners", icon: Users },
    { value: "10K+", label: "Products Shipped", icon: Truck },
  ];

  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous quality control to ensure international standards are met.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Our extensive network spans 50+ countries, providing reliable shipping worldwide.",
    },
    {
      icon: Target,
      title: "Customer Focus",
      description: "We prioritize understanding our clients' needs and delivering tailored solutions.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1920&h=1080"
            alt="Professional shoe design workspace"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="initial"
              animate="animate"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShoeTraders Pro
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With over 15 years of excellence in international footwear trade, ShoeTraders Pro has established itself as a premier partner for businesses seeking quality, reliability, and innovation in footwear solutions.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our commitment extends beyond just trading - we build lasting partnerships by understanding market trends, maintaining strict quality standards, and delivering exceptional service to our global network of trusted clients.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-white" size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Premium Quality</h4>
                  <p className="text-gray-600">Rigorous quality control ensures every product meets international standards</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="text-white" size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Global Shipping</h4>
                  <p className="text-gray-600">Efficient logistics network covering 50+ countries worldwide</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="initial"
              animate="animate"
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=1000"
                alt="Professional team in shoe design"
                className="rounded-3xl shadow-2xl w-full"
              />

              {/* Floating Stats Cards */}
              <motion.div
                variants={floatingAnimation}
                animate="animate"
                className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <Award className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">50+</h4>
                    <p className="text-gray-600">Awards Won</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={floatingAnimation}
                animate="animate"
                transition={{ delay: 2 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                    <Users className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">500K+</h4>
                    <p className="text-gray-600">Happy Customers</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and global reach
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our business and drive our success
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white p-8 rounded-2xl shadow-lg text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to global leadership in footwear trading
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                { year: "2009", title: "Company Founded", description: "Started as a small footwear trading company with a vision for quality." },
                { year: "2014", title: "International Expansion", description: "Expanded operations to serve 20+ countries across Asia and Europe." },
                { year: "2018", title: "Digital Transformation", description: "Launched e-commerce platform and digital supply chain management." },
                { year: "2024", title: "Global Leadership", description: "Serving 50+ countries with 500+ trusted partners worldwide." },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center space-x-8"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{milestone.year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
