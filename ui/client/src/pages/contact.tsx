import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertInquiry } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // 獲取分類數據
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['/api/categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories?active=true');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const result = await response.json();
      return result.data || result || [];
    },
    staleTime: 5 * 60 * 1000, // 5分鐘緩存
  });
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    productInterest: "",
    message: "",
  });

  const submitInquiry = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      return await apiRequest("POST", "/api/messages", data);
    },
    onSuccess: () => {
      toast({
        title: "留言提交成功！",
        description: "我們將在24小時內回覆您。",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        productInterest: "",
        message: "",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
    },
    onError: (error: any) => {
      toast({
        title: "提交失敗",
        description: error.message || "留言提交失敗，請稍後重試。",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "請填寫必填字段",
        description: "姓名、郵箱和留言內容為必填項。",
        variant: "destructive",
      });
      return;
    }

    submitInquiry.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const { data: contactResp } = useQuery({
    queryKey: ['/api/contact'],
    queryFn: async () => {
      const r = await fetch('/api/contact');
      if (!r.ok) throw new Error('Failed to fetch contact');
      return r.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  type UiContactInfo = { icon: any; title: string; details: string[]; gradient: string };
  const contactInfo: UiContactInfo[] = (contactResp?.data || [])
    .filter((c: any) => c.type !== 'social')
    .map((c: any) => {
      let details: string[] = [];
      if (c.detailsJson) {
        try {
          const parsed = JSON.parse(c.detailsJson);
          if (Array.isArray(parsed)) details = parsed as string[];
        } catch {}
      }
      const iconMap: Record<string, any> = { MapPin, Phone, Mail };
      const IconComp = iconMap[c.icon || ''] || MapPin;
      return { icon: IconComp, title: c.title, details, gradient: c.gradient || 'from-blue-500 to-purple-600' };
    });

  const socialLinks = (contactResp?.data || [])
    .filter((c: any) => c.type === 'social')
    .flatMap((c: any) => {
      try {
        const arr = JSON.parse(c.detailsJson || '[]');
        return Array.isArray(arr) ? arr : [];
      } catch {
        return [];
      }
    });
  

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
            Get In{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your footwear business journey? Contact our expert team for personalized solutions and competitive pricing
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            variants={slideInLeft}
            initial="initial"
            animate="animate"
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">First Name *</label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="John"
                    className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Doe"
                    className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="john@company.com"
                  className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Company</label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your Company Name (Optional)"
                  className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Product Interest</label>
                <Select value={formData.productInterest} onValueChange={(value) => handleInputChange("productInterest", value)}>
                  <SelectTrigger className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Select Category (Optional)"} />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesLoading ? (
                      <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                    ) : categories.length > 0 ? (
                      <>
                        {categories.map((category: any) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="all">All Categories</SelectItem>
                      </>
                    ) : (
                      <SelectItem value="no-categories" disabled>No categories available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                <Textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us about your requirements..."
                  className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={submitInquiry.isPending}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                {submitInquiry.isPending ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={slideInRight}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            {contactInfo.map((info: UiContactInfo, index: number) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
                >
                  <div className="flex items-start">
                    <div className={`w-16 h-16 bg-gradient-to-br ${info.gradient} rounded-full flex items-center justify-center mr-6 flex-shrink-0`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{info.title}</h3>
                      {info.details.map((detail: string, i: number) => (
                        <p key={i} className="text-gray-600">
                          {detail}
                          {i < info.details.length - 1 && <br />}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Social Media */}
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white"
            >
              <h3 className="text-xl font-bold mb-4">Follow Our Journey</h3>
              <p className="mb-6">Stay updated with our latest products, industry insights, and exclusive offers</p>
              <div className="flex space-x-4">
                {socialLinks.map((social: any, index: number) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30"
                    aria-label={social.label}
                  >
                    <i className={social.icon}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
