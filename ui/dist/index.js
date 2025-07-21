// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  products;
  inquiries;
  currentUserId;
  currentProductId;
  currentInquiryId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.products = /* @__PURE__ */ new Map();
    this.inquiries = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentInquiryId = 1;
    this.initializeSampleProducts();
  }
  initializeSampleProducts() {
    const sampleProducts = [
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
    sampleProducts.forEach((product) => {
      this.createProduct(product);
    });
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Product methods
  async getProducts() {
    return Array.from(this.products.values());
  }
  async getProduct(id) {
    return this.products.get(id);
  }
  async getProductsByCategory(category) {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }
  async searchProducts(query) {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) => product.name.toLowerCase().includes(lowercaseQuery) || product.description.toLowerCase().includes(lowercaseQuery) || product.category.toLowerCase().includes(lowercaseQuery) || product.tags && product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
  async createProduct(insertProduct) {
    const id = this.currentProductId++;
    const product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  // Inquiry methods
  async createInquiry(insertInquiry) {
    const id = this.currentInquiryId++;
    const inquiry = {
      ...insertInquiry,
      id,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
  async getInquiries() {
    return Array.from(this.inquiries.values());
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  // 'athletic', 'casual', 'dress'
  imageUrl: text("image_url").notNull(),
  features: text("features").array(),
  specifications: text("specifications").notNull(),
  // JSON string
  inStock: boolean("in_stock").default(true),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  reviewCount: integer("review_count").default(0),
  tags: text("tags").array()
});
var inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  productInterest: text("product_interest").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull()
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true
});
var insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true
});
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/products", async (_req, res) => {
    try {
      const products2 = await storage.getProducts();
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  app2.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const validCategories = ["athletic", "casual", "dress"];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ message: "Invalid category" });
      }
      const products2 = await storage.getProductsByCategory(category);
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });
  app2.get("/api/products/search/:query", async (req, res) => {
    try {
      const { query } = req.params;
      if (!query || query.trim().length === 0) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const products2 = await storage.searchProducts(decodeURIComponent(query));
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to search products" });
    }
  });
  app2.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json({
        message: "Inquiry submitted successfully",
        id: inquiry.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid inquiry data",
          errors: error.errors
        });
      }
      res.status(500).json({ message: "Failed to submit inquiry" });
    }
  });
  app2.get("/api/inquiries", async (_req, res) => {
    try {
      const inquiries2 = await storage.getInquiries();
      res.json(inquiries2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       // 如果后端不需要 /api 前缀，可以加 rewrite
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5001;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
