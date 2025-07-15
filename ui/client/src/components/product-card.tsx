import { motion } from "framer-motion";
import { Link } from "wouter";
import { Eye, Mail, Star } from "lucide-react";
import type { Product } from "@shared/schema";
import { scaleIn, hoverScale } from "@/lib/animations";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const categoryColors = {
    athletic: "text-blue-600 bg-blue-100",
    casual: "text-green-600 bg-green-100",
    dress: "text-purple-600 bg-purple-100",
  };

  const buttonColors = {
    athletic: "bg-blue-600 hover:bg-blue-700",
    casual: "bg-green-600 hover:bg-green-700",
    dress: "bg-purple-600 hover:bg-purple-700",
  };

  const specifications = JSON.parse(product.specifications || "{}");
  const rating = parseFloat(product.rating || "0");

  return (
    <motion.div
      variants={scaleIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="product-card group bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        
        {/* Badges */}
        {product.inStock && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            In Stock
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link href={`/product/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              <Eye className="inline mr-2" size={16} />
              Quick View
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[product.category as keyof typeof categoryColors]}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
              />
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-800">${product.price}</span>
          <Link href="/contact">
            <motion.button
              variants={hoverScale}
              whileHover="whileHover"
              whileTap="whileTap"
              className={`px-4 py-2 rounded-full font-semibold text-white transition-colors duration-300 cursor-pointer ${buttonColors[product.category as keyof typeof buttonColors]}`}
            >
              <Mail className="inline mr-1" size={16} />
              Inquire
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
