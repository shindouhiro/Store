import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 安全的分类名称格式化函数
export function formatCategoryName(category: string | null | undefined): string {
  if (!category || typeof category !== 'string') {
    return 'Unknown';
  }
  return category.charAt(0).toUpperCase() + category.slice(1);
}

// 获取分类颜色类名
export function getCategoryColors(category: string | null | undefined): string {
  const categoryColors = {
    athletic: "text-blue-600 bg-blue-100",
    casual: "text-green-600 bg-green-100", 
    dress: "text-purple-600 bg-purple-100",
  };
  
  if (!category || typeof category !== 'string') {
    return "text-gray-600 bg-gray-100";
  }
  
  return categoryColors[category as keyof typeof categoryColors] || "text-gray-600 bg-gray-100";
}

// 获取分类按钮颜色类名
export function getCategoryButtonColors(category: string | null | undefined): string {
  const buttonColors = {
    athletic: "bg-blue-600 hover:bg-blue-700",
    casual: "bg-green-600 hover:bg-green-700",
    dress: "bg-purple-600 hover:bg-purple-700",
  };
  
  if (!category || typeof category !== 'string') {
    return "bg-gray-600 hover:bg-gray-700";
  }
  
  return buttonColors[category as keyof typeof buttonColors] || "bg-gray-600 hover:bg-gray-700";
}
