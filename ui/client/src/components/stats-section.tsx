import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";
import { Globe, Package, Handshake, Award } from "lucide-react";

export default function StatsSection() {
  const [counts, setCounts] = useState({ countries: 0, products: 0, partners: 0, years: 0 });

  const stats = [
    {
      icon: Globe,
      value: 50,
      label: "Countries Served",
      gradient: "from-blue-500 to-purple-600",
      key: "countries",
    },
    {
      icon: Package,
      value: 10000,
      label: "Products Shipped",
      gradient: "from-green-500 to-blue-600",
      key: "products",
    },
    {
      icon: Handshake,
      value: 500,
      label: "Trusted Partners",
      gradient: "from-purple-500 to-pink-600",
      key: "partners",
    },
    {
      icon: Award,
      value: 15,
      label: "Years Experience",
      gradient: "from-orange-500 to-red-600",
      key: "years",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      stats.forEach((stat) => {
        const increment = stat.value / 100;
        let current = 0;
        const counter = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(counter);
          }
          setCounts((prev) => ({
            ...prev,
            [stat.key]: Math.floor(current),
          }));
        }, 20);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatValue = (key: string, value: number) => {
    if (key === "products") return `${(value / 1000).toFixed(0)}K+`;
    return `${value}+`;
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
      <div className="container mx-auto px-6 relative z-10">
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
                key={stat.key}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <IconComponent className="text-white" size={32} />
                </div>
                <motion.h3
                  className="text-3xl font-bold text-gray-800 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {formatValue(stat.key, counts[stat.key as keyof typeof counts])}
                </motion.h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
