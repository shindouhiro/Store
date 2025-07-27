import { products, inquiries, users, categories, type Product, type InsertProduct, type Inquiry, type InsertInquiry, type User, type InsertUser, type Category, type InsertCategory } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getActiveCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Inquiry methods
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private inquiries: Map<number, Inquiry>;
  private currentUserId: number;
  private currentProductId: number;
  private currentCategoryId: number;
  private currentInquiryId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.inquiries = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCategoryId = 1;
    this.currentInquiryId = 1;
    
    // Initialize with sample data
    this.initializeSampleCategories();
    this.initializeSampleProducts();
  }

  private initializeSampleCategories() {
    const sampleCategories: InsertCategory[] = [
      {
        name: "Athletic",
        description: "Performance-driven footwear for sports enthusiasts and active lifestyles",
        icon: "🏃‍♂️",
        isActive: true,
        sortOrder: 1,
      },
      {
        name: "Casual",
        description: "Comfortable and stylish footwear for everyday adventures",
        icon: "👟",
        isActive: true,
        sortOrder: 2,
      },
      {
        name: "Dress",
        description: "Sophisticated formal footwear crafted with premium leather",
        icon: "👞",
        isActive: true,
        sortOrder: 3,
      },
    ];

    sampleCategories.forEach(category => {
      this.createCategory(category);
    });
  }

  private initializeSampleProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Pro Runner X1",
        description: "Advanced running technology with premium cushioning and breathable mesh upper designed for professional athletes.",
        price: "89.99",
        category: "athletic",
        imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Advanced Cushioning", "Breathable Mesh", "Lightweight Design", "Professional Grade"],
        specifications: JSON.stringify({
          material: "Premium Mesh & Synthetic",
          soleType: "Advanced Cushioning System",
          weight: "280g (Size 9)",
          availableSizes: "US 6-13"
        }),
        inStock: true,
        rating: "4.8",
        reviewCount: 2341,
        tags: ["running", "professional", "lightweight"]
      },
      {
        name: "Court Master Pro",
        description: "High-performance basketball shoes with superior grip and ankle protection for court dominance.",
        price: "129.99",
        category: "athletic",
        imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["High-Top Design", "Superior Grip", "Ankle Protection", "Court Performance"],
        specifications: JSON.stringify({
          material: "Premium Leather & Synthetic",
          soleType: "High-Grip Rubber",
          weight: "420g (Size 9)",
          availableSizes: "US 6-15"
        }),
        inStock: true,
        rating: "4.6",
        reviewCount: 1856,
        tags: ["basketball", "high-top", "grip"]
      },
      {
        name: "CrossFit Elite",
        description: "Multi-purpose training shoes designed for versatility across various workout routines and fitness activities.",
        price: "99.99",
        category: "athletic",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Multi-Purpose", "Cross-Training", "Stability", "Durability"],
        specifications: JSON.stringify({
          material: "Synthetic & Mesh",
          soleType: "Multi-Surface Traction",
          weight: "320g (Size 9)",
          availableSizes: "US 5-14"
        }),
        inStock: true,
        rating: "4.7",
        reviewCount: 1245,
        tags: ["crossfit", "training", "versatile"]
      },
      {
        name: "Urban Classic",
        description: "Timeless casual sneakers that blend vintage aesthetics with modern comfort for everyday wear.",
        price: "69.99",
        category: "casual",
        imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Vintage Style", "Modern Comfort", "Everyday Wear", "Classic Design"],
        specifications: JSON.stringify({
          material: "Canvas & Rubber",
          soleType: "Vulcanized Rubber",
          weight: "250g (Size 9)",
          availableSizes: "US 6-12"
        }),
        inStock: true,
        rating: "4.9",
        reviewCount: 3124,
        tags: ["vintage", "casual", "classic"]
      },
      {
        name: "Easy Walker",
        description: "Effortless slip-on design with memory foam cushioning for all-day comfort and convenience.",
        price: "49.99",
        category: "casual",
        imageUrl: "https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Slip-On Design", "Memory Foam", "All-Day Comfort", "Easy Wear"],
        specifications: JSON.stringify({
          material: "Knit Upper & Memory Foam",
          soleType: "Flexible Rubber",
          weight: "200g (Size 9)",
          availableSizes: "US 6-13"
        }),
        inStock: true,
        rating: "4.5",
        reviewCount: 892,
        tags: ["slip-on", "comfort", "memory-foam"]
      },
      {
        name: "Retro Canvas",
        description: "Classic canvas construction with vintage appeal and contemporary comfort features for style-conscious individuals.",
        price: "39.99",
        category: "casual",
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Canvas Construction", "Vintage Appeal", "Contemporary Comfort", "Style-Conscious"],
        specifications: JSON.stringify({
          material: "Premium Canvas",
          soleType: "Classic Rubber",
          weight: "240g (Size 9)",
          availableSizes: "US 5-12"
        }),
        inStock: true,
        rating: "4.8",
        reviewCount: 2156,
        tags: ["canvas", "retro", "vintage"]
      },
      {
        name: "Executive Oxford",
        description: "Handcrafted leather Oxford shoes perfect for business and formal occasions with timeless elegance.",
        price: "149.99",
        category: "dress",
        imageUrl: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Handcrafted Leather", "Oxford Style", "Business Formal", "Timeless Elegance"],
        specifications: JSON.stringify({
          material: "Genuine Leather",
          soleType: "Leather with Rubber Heel",
          weight: "450g (Size 9)",
          availableSizes: "US 7-13"
        }),
        inStock: true,
        rating: "4.9",
        reviewCount: 1567,
        tags: ["oxford", "leather", "formal"]
      },
      {
        name: "Business Loafer",
        description: "Elegant slip-on loafers combining comfort with professional sophistication for the modern businessman.",
        price: "119.99",
        category: "dress",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Slip-On Loafer", "Professional", "Sophisticated", "Comfort"],
        specifications: JSON.stringify({
          material: "Premium Leather",
          soleType: "Leather with Anti-Slip",
          weight: "380g (Size 9)",
          availableSizes: "US 7-14"
        }),
        inStock: true,
        rating: "4.6",
        reviewCount: 943,
        tags: ["loafer", "business", "professional"]
      }
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category && product.category === category
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      (product.category && product.category.toLowerCase().includes(lowercaseQuery)) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      features: insertProduct.features || null,
      inStock: insertProduct.inStock ?? true,
      rating: insertProduct.rating || null,
      reviewCount: insertProduct.reviewCount || null,
      tags: insertProduct.tags || null,
    };
    this.products.set(id, product);
    return product;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getActiveCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).filter(
      category => category.isActive
    );
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { 
      ...insertCategory, 
      id,
      description: insertCategory.description || null,
      icon: insertCategory.icon || null,
      isActive: insertCategory.isActive ?? true,
      sortOrder: insertCategory.sortOrder || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.categories.set(id, category);
    return category;
  }

  // Inquiry methods
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id,
      createdAt: new Date().toISOString()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
}

export const storage = new MemStorage();
