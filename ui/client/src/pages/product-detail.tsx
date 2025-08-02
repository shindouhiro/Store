import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star, CheckCircle, Mail, Download, Shield, Truck, Award, Play, Pause } from "lucide-react";
import { fadeIn, fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCategoryName, getCategoryColors } from "@/lib/utils";
import type { Product } from "@shared/schema";
import { useState, useRef } from "react";

// OSS基础URL
const OSS_BASE_URL = 'https://dulizha.oss-cn-shanghai.aliyuncs.com/';

// 获取完整的图片URL
const getFullImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${OSS_BASE_URL}${url}`;
};

// 获取完整的视频URL
const getFullVideoUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${OSS_BASE_URL}${url}`;
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "0");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });

  // 处理视频播放/暂停
  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 视频事件处理
  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);
  const handleVideoEnded = () => setIsPlaying(false);
  const handleVideoLoadStart = () => setIsVideoLoading(true);
  const handleVideoCanPlay = () => setIsVideoLoading(false);
  const handleVideoError = () => {
    setIsVideoLoading(false);
    setVideoError(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // 安全地解析 specifications JSON
  let specifications = {};
  try {
    specifications = JSON.parse(product.specifications || "{}");
  } catch (error) {
    console.warn("Failed to parse product specifications:", error);
    specifications = {};
  }
  
  const rating = parseFloat(product.rating || "0");



  const features = [
    { icon: Shield, title: "Quality Guarantee", description: "Premium materials and craftsmanship" },
    { icon: Truck, title: "Global Shipping", description: "Worldwide delivery available" },
    { icon: Award, title: "Certified Product", description: "Meets international standards" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <Link href="/products">
            <Button variant="ghost" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="mr-2" size={20} />
              Back to Products
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image/Video */}
          <motion.div
            variants={slideInLeft}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
              {product.videoUrl && product.videoUrl.trim() !== '' ? (
                <>
                  <video
                    ref={videoRef}
                    src={getFullVideoUrl(product.videoUrl)}
                    className="w-full h-full object-cover"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onEnded={handleVideoEnded}
                    onLoadStart={handleVideoLoadStart}
                    onCanPlay={handleVideoCanPlay}
                    onError={handleVideoError}
                    loop
                  />
                  {/* 视频播放控制按钮 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isVideoLoading ? (
                      <div className="bg-black bg-opacity-50 rounded-full p-4">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : videoError ? (
                      <div className="bg-red-500 bg-opacity-50 rounded-full p-4">
                        <span className="text-white text-sm">视频加载失败</span>
                      </div>
                    ) : (
                      <button
                        onClick={handleVideoToggle}
                        className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-4 transition-all duration-300 transform hover:scale-110"
                      >
                        {isPlaying ? (
                          <Pause className="text-white" size={32} fill="white" />
                        ) : (
                          <Play className="text-white" size={32} fill="white" />
                        )}
                      </button>
                    )}
                  </div>
                  {/* 视频标识 */}
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Video
                  </div>
                </>
              ) : (
                <img
                  src={getFullImageUrl(product.imageUrl)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            variants={slideInRight}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            {/* Category Badge */}
            <Badge className={`${getCategoryColors(product.category)} px-3 py-1 text-sm font-semibold`}>
              {formatCategoryName(product.category)}
            </Badge>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-gray-800">${product.price}</span>
              {product.inStock && (
                <div className="flex items-center text-green-600">
                  <CheckCircle size={20} className="mr-1" />
                  <span className="font-semibold">In Stock</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>

            {/* Specifications */}
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-800">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-semibold text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span className="text-gray-600">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-800">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link href="/contact">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 text-lg font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                  <Mail className="mr-2" size={20} />
                  Request Quote
                </Button>
              </Link>
              <Button variant="outline" className="w-full py-4 text-lg font-semibold rounded-xl border-2 border-gray-300 hover:bg-gray-50">
                <Download className="mr-2" size={20} />
                Download Specifications
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Additional Features */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose This Product</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.2 }}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
