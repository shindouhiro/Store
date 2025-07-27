import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import ProductCard from "@/components/product-card";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ArrowRight, Crown, Terminal, Users } from "lucide-react";
import type { Product } from "@shared/schema";

// 分类接口类型定义
interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const { data: products, isLoading } = useQuery<{ data: Product[] }>({
    queryKey: ["/api/products"],
  });

  // 获取分类数据
  const { data: categories, isLoading: categoriesLoading } = useQuery<{ data: Category[] }>({
    queryKey: ["/api/categories"],
  });
  console.log(products,'products')

  const featuredProducts = products?.data || [];
  console.log(categories,'categories')

  // 构建分类数据
  const categoryData = categories?.data?.filter(cat => cat.isActive).map(cat => {
    const iconMap = {
      'Athletic': Terminal,
      'Casual': Users,
      'Dress': Crown,
    };
    
    const gradientMap = {
      'Athletic': "from-blue-500 to-cyan-500",
      'Casual': "from-green-500 to-emerald-500",
      'Dress': "from-purple-500 to-indigo-500",
    };
    
    const colorMap = {
      'Athletic': "text-blue-600",
      'Casual': "text-green-600",
      'Dress': "text-purple-600",
    };
    
    const imageMap = {
      'Athletic': "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      'Casual': "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      'Dress': "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    };

    return {
      title: `${cat.name} Shoes`,
      description: cat.description || `Premium ${cat.name.toLowerCase()} footwear for every occasion.`,
      icon: iconMap[cat.name as keyof typeof iconMap] || Terminal,
      gradient: gradientMap[cat.name as keyof typeof gradientMap] || "from-gray-500 to-gray-600",
      color: colorMap[cat.name as keyof typeof colorMap] || "text-gray-600",
      image: imageMap[cat.name as keyof typeof imageMap] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: cat.name.toLowerCase()
    };
  }) || [];

  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />

      {/* Featured Categories */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Premium{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Categories
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our extensive range of premium footwear designed for every occasion and market segment
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {categoryData.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer"
                >
                  <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center mr-4`}>
                        <IconComponent className="text-white" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{category.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6">{category.description}</p>
                    <Link href={`/products?category=${category.category}`}>
                      <button className={`${category.color} font-semibold hover:underline transition-all duration-300 flex items-center group-hover:translate-x-2 cursor-pointer`}>
                        Explore Collection <ArrowRight className="ml-2" size={16} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore our handpicked selection of premium footwear that represents quality, style, and innovation
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          )}

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                View All Products
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
