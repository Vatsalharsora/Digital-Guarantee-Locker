import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Form validation utilities
 */
export const validation = {
  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   */
  isValidPassword: (password: string): { isValid: boolean; message: string } => {
    if (password.length < 8) {
      return { isValid: false, message: "Password must be at least 8 characters long" };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { isValid: false, message: "Password must contain at least one lowercase letter" };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { isValid: false, message: "Password must contain at least one uppercase letter" };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { isValid: false, message: "Password must contain at least one number" };
    }
    return { isValid: true, message: "Password is strong" };
  },

  /**
   * Validate phone number format
   */
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Check if passwords match
   */
  passwordsMatch: (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  }
};

/**
 * Date formatting and manipulation utilities
 */
export const dateUtils = {
  /**
   * Format date to readable string
   */
  formatDate: (date: Date | string, format: 'short' | 'long' | 'iso' = 'short'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    switch (format) {
      case 'short':
        return dateObj.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      case 'long':
        return dateObj.toLocaleDateString('en-US', { 
          weekday: 'long',
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'iso':
        return dateObj.toISOString().split('T')[0];
      default:
        return dateObj.toLocaleDateString();
    }
  },

  /**
   * Check if date is within X days from today
   */
  isExpiringWithin: (expiryDate: Date | string, days: number): boolean => {
    const expiry = typeof expiryDate === 'string' ? new Date(expiryDate) : expiryDate;
    const today = new Date();
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff <= days && daysDiff >= 0;
  },

  /**
   * Check if date has expired
   */
  isExpired: (expiryDate: Date | string): boolean => {
    const expiry = typeof expiryDate === 'string' ? new Date(expiryDate) : expiryDate;
    const today = new Date();
    return expiry < today;
  },

  /**
   * Get days until expiry
   */
  getDaysUntilExpiry: (expiryDate: Date | string): number => {
    const expiry = typeof expiryDate === 'string' ? new Date(expiryDate) : expiryDate;
    const today = new Date();
    const timeDiff = expiry.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  },

  /**
   * Get relative time string (e.g., "2 days ago", "in 5 days")
   */
  getRelativeTime: (date: Date | string): string => {
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = targetDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 1) return `In ${diffDays} days`;
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
    
    return dateUtils.formatDate(targetDate);
  }
};

/**
 * File handling utilities
 */
export const fileUtils = {
  /**
   * Convert file to base64 string
   */
  fileToBase64: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  },

  /**
   * Validate file type
   */
  isValidFileType: (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type);
  },

  /**
   * Validate file size (in MB)
   */
  isValidFileSize: (file: File, maxSizeMB: number): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  },

  /**
   * Format file size for display
   */
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  /**
   * Get file extension
   */
  getFileExtension: (fileName: string): string => {
    return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
  },

  /**
   * Generate unique file name
   */
  generateUniqueFileName: (originalName: string): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = fileUtils.getFileExtension(originalName);
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
    return `${nameWithoutExt}_${timestamp}_${random}.${extension}`;
  }
};

/**
 * Security and encryption utilities (mock implementations for demo)
 */
export const securityUtils = {
  /**
   * Generate a simple hash (for demo purposes only)
   */
  generateHash: (input: string): string => {
    let hash = 0;
    if (input.length === 0) return hash.toString();
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  },

  /**
   * Generate unique ID
   */
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  },

  /**
   * Mask sensitive information
   */
  maskEmail: (email: string): string => {
    const [username, domain] = email.split('@');
    if (username.length <= 2) return email;
    const maskedUsername = username[0] + '*'.repeat(username.length - 2) + username[username.length - 1];
    return `${maskedUsername}@${domain}`;
  },

  /**
   * Mask credit card or document numbers
   */
  maskNumber: (number: string, visibleStart = 4, visibleEnd = 4): string => {
    if (number.length <= visibleStart + visibleEnd) return number;
    const start = number.substring(0, visibleStart);
    const end = number.substring(number.length - visibleEnd);
    const masked = '*'.repeat(number.length - visibleStart - visibleEnd);
    return `${start}${masked}${end}`;
  }
};

/**
 * Local storage utilities
 */
export const storageUtils = {
  /**
   * Set item in localStorage with JSON stringify
   */
  setItem: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  /**
   * Get item from localStorage with JSON parse
   */
  getItem: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue || null;
    }
  },

  /**
   * Remove item from localStorage
   */
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  /**
   * Clear all localStorage
   */
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  /**
   * Check if localStorage is available
   */
  isAvailable: (): boolean => {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
};

/**
 * API utilities for future backend integration
 */
export const apiUtils = {
  /**
   * Create API endpoint URL
   */
  createEndpoint: (baseUrl: string, path: string, params?: Record<string, string>): string => {
    const url = new URL(path, baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  },

  /**
   * Create request headers
   */
  createHeaders: (token?: string, contentType = 'application/json'): HeadersInit => {
    const headers: HeadersInit = {
      'Content-Type': contentType,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  },

  /**
   * Handle API response
   */
  handleResponse: async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  /**
   * Create FormData for file uploads
   */
  createFormData: (data: Record<string, unknown>): FormData => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        formData.append(key, String(value));
      }
    });
    return formData;
  }
};

/**
 * String utilities
 */
export const stringUtils = {
  /**
   * Capitalize first letter of each word
   */
  toTitleCase: (str: string): string => {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },

  /**
   * Convert to kebab-case
   */
  toKebabCase: (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  },

  /**
   * Convert to camelCase
   */
  toCamelCase: (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '');
  },

  /**
   * Truncate string with ellipsis
   */
  truncate: (str: string, length: number, ending = '...'): string => {
    if (str.length <= length) return str;
    return str.substring(0, length - ending.length) + ending;
  },

  /**
   * Generate random string
   */
  generateRandomString: (length: number, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }
};

/**
 * Number utilities
 */
export const numberUtils = {
  /**
   * Format number as currency
   */
  formatCurrency: (amount: number, currency = 'USD', locale = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },

  /**
   * Format number with commas
   */
  formatWithCommas: (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /**
   * Generate random number between min and max
   */
  randomBetween: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Round to specified decimal places
   */
  roundTo: (num: number, decimals: number): number => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
};

/**
 * Array utilities
 */
export const arrayUtils = {
  /**
   * Remove duplicates from array
   */
  unique: <T>(arr: T[]): T[] => {
    return [...new Set(arr)];
  },

  /**
   * Group array by key
   */
  groupBy: <T>(arr: T[], key: keyof T): Record<string, T[]> => {
    return arr.reduce((groups, item) => {
      const group = String(item[key]);
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },

  /**
   * Sort array by key
   */
  sortBy: <T>(arr: T[], key: keyof T, ascending = true): T[] => {
    return [...arr].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal < bVal) return ascending ? -1 : 1;
      if (aVal > bVal) return ascending ? 1 : -1;
      return 0;
    });
  },

  /**
   * Chunk array into smaller arrays
   */
  chunk: <T>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
};

/**
 * URL utilities
 */
export const urlUtils = {
  /**
   * Get query parameters from URL
   */
  getQueryParams: (url?: string): Record<string, string> => {
    const urlObj = new URL(url || window.location.href);
    const params: Record<string, string> = {};
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  },

  /**
   * Build query string from object
   */
  buildQueryString: (params: Record<string, unknown>): string => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    return searchParams.toString();
  },

  /**
   * Check if URL is valid
   */
  isValidUrl: (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  }
};

/**
 * Error handling utilities
 */
export const errorUtils = {
  /**
   * Extract error message from various error types
   */
  getErrorMessage: (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'message' in error) {
      return String((error as { message: unknown }).message);
    }
    return 'An unknown error occurred';
  },

  /**
   * Log error with context
   */
  logError: (error: unknown, context?: string): void => {
    const message = errorUtils.getErrorMessage(error);
    const logMessage = context ? `[${context}] ${message}` : message;
    console.error(logMessage, error);
  }
};

// Export all utilities as a default object for easy importing
const utilsExports = {
  cn,
  validation,
  dateUtils,
  fileUtils,
  securityUtils,
  storageUtils,
  apiUtils,
  stringUtils,
  numberUtils,
  arrayUtils,
  urlUtils,
  errorUtils
};

export default utilsExports;