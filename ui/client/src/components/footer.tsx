import { motion } from "framer-motion";
import { Link } from "wouter";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Footer() {
  const footerSections = [
    {
      title: "Products",
      links: [
        { label: "Athletic Shoes", href: "/products?category=athletic" },
        { label: "Casual Footwear", href: "/products?category=casual" },
        { label: "Dress Shoes", href: "/products?category=dress" },
        { label: "Custom Orders", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Bulk Orders", href: "/contact" },
        { label: "Private Label", href: "/contact" },
        { label: "Quality Control", href: "/about" },
        { label: "Global Shipping", href: "/about" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Trade Terms", href: "/about" },
        { label: "Shipping Info", href: "/about" },
        { label: "FAQ", href: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: "fab fa-linkedin", href: "#", color: "hover:bg-blue-600" },
    { icon: "fab fa-twitter", href: "#", color: "hover:bg-blue-400" },
    { icon: "fab fa-instagram", href: "#", color: "hover:bg-pink-600" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Company Info */}
          <motion.div variants={fadeInUp}>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              ShoeTraders Pro
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted partner in premium footwear export solutions. Quality, reliability, and excellence in every step.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.color} transition-colors duration-300`}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <motion.a
                        whileHover={{ x: 5 }}
                        className="hover:text-white transition-colors duration-300 cursor-pointer"
                      >
                        {link.label}
                      </motion.a>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400">&copy; 2024 ShoeTraders Pro. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
