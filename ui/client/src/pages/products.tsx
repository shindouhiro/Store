import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter } from "lucide-react";
import ProductCard from "@/components/product-card";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

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

export default function Products() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // 获取分类数据
  const { data: categories, isLoading: categoriesLoading } = useQuery<{ data: Category[] }>({
    queryKey: ["/api/categories"],
  });

  // 根据当前选中的分类获取产品
  const { data: products, isLoading } = useQuery<{ data: Product[] }>({
    queryKey: ["/api/products", activeFilter, searchQuery],
    queryFn: async () => {
      if (activeFilter === "all") {
        const response = await fetch("/api/products");
        const data = await response.json();
        return data;
      } else {
        // 找到对应的分类ID
        const category = categories?.data?.find(cat => cat.name.toLowerCase() === activeFilter);
        if (category) {
          const response = await fetch(`/api/products/category/${category.id}`);
          const data = await response.json();
          return data;
        }
        return { data: [] };
      }
    },
    enabled: activeFilter === "all" || !!categories,
  });

  console.log(products);
  console.log(categories);

  // 构建分类按钮数据
  const filterButtons = [
    { label: "All Products", value: "all" },
    ...(categories?.data?.filter(cat => cat.isActive).map(cat => ({
      label: cat.name,
      value: cat.name.toLowerCase(),
      id: cat.id
    })) || [])
  ];
  console.log(filterButtons);

  useEffect(() => {
    if (!products) return;

    let filtered = products.data;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product: Product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.category && product.category.toLowerCase().includes(query)) ||
        (product.tags && product.tags.some((tag: string) => tag.toLowerCase().includes(query)))
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  // Get URL params for initial filter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    if (category && filterButtons.some(btn => btn.value === category)) {
      setActiveFilter(category);
    }
  }, [filterButtons]);
  console.log(filteredProducts,'filteredProducts')

  // 处理分类按钮点击
  const handleCategoryClick = (categoryValue: string) => {
    setActiveFilter(categoryValue);
    setSearchQuery(""); // 清空搜索框
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our complete collection of premium footwear designed for every occasion and market segment
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filterButtons.map((button) => (
              <Button
                key={button.value}
                onClick={() => handleCategoryClick(button.value)}
                variant={activeFilter === button.value ? "default" : "outline"}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === button.value
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="text-gray-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all products
            </p>
            <Button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full"
            >
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFilter}-${searchQuery}`}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit="initial"
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Results Count */}
        {!isLoading && filteredProducts.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products?.data?.length || 0} products
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
