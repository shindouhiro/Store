import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const backendBase = process.env.BACKEND_URL || 'http://localhost:3000';
  // Get all products
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      console.log(products,'products')
      res.json({ data: products });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req, res) => {
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

  // Get products by category
  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const validCategories = ['athletic', 'casual', 'dress'];
      
      if (!validCategories.includes(category)) {
        return res.status(400).json({ message: "Invalid category" });
      }
      
      const products = await storage.getProductsByCategory(category);
      res.json({ data: products });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  // Search products
  app.get("/api/products/search/:query", async (req, res) => {
    try {
      const { query } = req.params;
      if (!query || query.trim().length === 0) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const products = await storage.searchProducts(decodeURIComponent(query));
      res.json({ data: products });
    } catch (error) {
      res.status(500).json({ message: "Failed to search products" });
    }
  });

  // Get all categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json({ data: categories });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Proxy: Get public contact info from backend
  app.get("/api/contact", async (_req, res) => {
    try {
      const r = await fetch(`${backendBase}/contact/public`);
      if (!r.ok) {
        const text = await r.text();
        return res.status(r.status).json({ message: text || 'Failed to fetch contact' });
      }
      const data = await r.json();
      res.json({ data });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact" });
    }
  });

  // Get active categories
  app.get("/api/categories/active", async (_req, res) => {
    try {
      const categories = await storage.getActiveCategories();
      res.json({ data: categories });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active categories" });
    }
  });

  // Create inquiry
  app.post("/api/inquiries", async (req, res) => {
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

  // Proxy: forward UI message submission to backend /messages
  app.post("/api/messages", async (req, res) => {
    try {
      const r = await fetch(`${backendBase}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const text = await r.text();
      if (!r.ok) {
        return res.status(r.status).send(text);
      }
      try {
        return res.status(r.status).json(JSON.parse(text));
      } catch {
        return res.status(r.status).send(text);
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to submit message' });
    }
  });

  // Get all inquiries (for admin use)
  app.get("/api/inquiries", async (_req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
