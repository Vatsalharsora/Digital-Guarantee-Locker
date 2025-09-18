import { GuaranteeCategory } from '../types';

/**
 * Application constants
 */
export const APP_NAME = 'Digital Guarantee Locker';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Securely store, manage, and track your warranty documents';

/**
 * API Configuration
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.digitalguaranteelocker.com';
export const API_VERSION = 'v1';
export const API_TIMEOUT = 30000; // 30 seconds

/**
 * Authentication constants
 */
export const AUTH_TOKEN_KEY = 'dgl_auth_token';
export const REFRESH_TOKEN_KEY = 'dgl_refresh_token';
export const USER_DATA_KEY = 'dgl_user_data';
export const TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * File upload constants
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
export const MAX_FILES_PER_DOCUMENT = 5;

export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
] as const;

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;

export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
] as const;

/**
 * File type extensions mapping
 */
export const FILE_TYPE_EXTENSIONS: Record<string, string[]> = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/gif': ['gif'],
  'image/webp': ['webp'],
  'application/pdf': ['pdf'],
  'application/msword': ['doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
  'text/plain': ['txt'],
};

/**
 * Guarantee categories with metadata
 */
export const GUARANTEE_CATEGORIES: Record<GuaranteeCategory, {
  label: string;
  icon: string;
  color: string;
  description: string;
}> = {
  electronics: {
    label: 'Electronics',
    icon: '📱',
    color: '#3B82F6',
    description: 'Phones, laptops, tablets, cameras, etc.'
  },
  appliances: {
    label: 'Home Appliances',
    icon: '🏠',
    color: '#10B981',
    description: 'Refrigerators, washers, microwaves, etc.'
  },
  automotive: {
    label: 'Automotive',
    icon: '🚗',
    color: '#F59E0B',
    description: 'Cars, motorcycles, parts, accessories'
  },
  furniture: {
    label: 'Furniture',
    icon: '🪑',
    color: '#8B5CF6',
    description: 'Sofas, beds, tables, chairs, etc.'
  },
  clothing: {
    label: 'Clothing & Fashion',
    icon: '👕',
    color: '#EF4444',
    description: 'Clothes, shoes, bags, accessories'
  },
  jewelry: {
    label: 'Jewelry & Watches',
    icon: '💎',
    color: '#F97316',
    description: 'Rings, necklaces, watches, etc.'
  },
  sports: {
    label: 'Sports & Fitness',
    icon: '⚽',
    color: '#06B6D4',
    description: 'Equipment, gear, fitness devices'
  },
  tools: {
    label: 'Tools & Equipment',
    icon: '🔧',
    color: '#84CC16',
    description: 'Power tools, hand tools, machinery'
  },
  other: {
    label: 'Other',
    icon: '📦',
    color: '#6B7280',
    description: 'Miscellaneous items'
  }
};

/**
 * Reminder days options
 */
export const REMINDER_OPTIONS = [
  { value: 7, label: '1 week before' },
  { value: 14, label: '2 weeks before' },
  { value: 30, label: '1 month before' },
  { value: 60, label: '2 months before' },
  { value: 90, label: '3 months before' },
  { value: 180, label: '6 months before' },
];

/**
 * Currency options
 */
export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
];

/**
 * Date format options
 */
export const DATE_FORMATS = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (EU)' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' },
  { value: 'MMM DD, YYYY', label: 'MMM DD, YYYY' },
  { value: 'DD MMM YYYY', label: 'DD MMM YYYY' },
];

/**
 * Language options
 */
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

/**
 * Timezone options (major timezones)
 */
export const TIMEZONES = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
  { value: 'America/Chicago', label: 'Central Time (US & Canada)' },
  { value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (London)' },
  { value: 'Europe/Paris', label: 'Central European Time (Paris)' },
  { value: 'Europe/Berlin', label: 'Central European Time (Berlin)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (Tokyo)' },
  { value: 'Asia/Shanghai', label: 'China Standard Time (Shanghai)' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (Mumbai)' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (Dubai)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (Sydney)' },
];

/**
 * Pagination constants
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
};

/**
 * Search constants
 */
export const SEARCH = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 300, // milliseconds
  MAX_RECENT_SEARCHES: 10,
  MAX_SUGGESTIONS: 8,
};

/**
 * Validation constants
 */
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  TAG_MAX_LENGTH: 30,
  MAX_TAGS_PER_DOCUMENT: 10,
};

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
};

/**
 * Breakpoints (matching Tailwind CSS)
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

/**
 * Z-index levels
 */
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
};

/**
 * Theme constants
 */
export const THEME = {
  COLORS: {
    PRIMARY: '#030213',
    SECONDARY: '#6B7280',
    SUCCESS: '#10B981',
    WARNING: '#F59E0B',
    ERROR: '#EF4444',
    INFO: '#3B82F6',
  },
  BORDER_RADIUS: {
    NONE: '0',
    SM: '0.25rem',
    MD: '0.375rem',
    LG: '0.5rem',
    XL: '0.75rem',
    '2XL': '1rem',
    FULL: '9999px',
  },
};

/**
 * Feature flags (can be overridden by environment variables)
 */
export const FEATURE_FLAGS = {
  ENABLE_DARK_MODE: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_FILE_ENCRYPTION: false, // Premium feature
  ENABLE_ADVANCED_SEARCH: true,
  ENABLE_ANALYTICS: false,
  ENABLE_EXPORT: true,
  ENABLE_BACKUP: false, // Premium feature
  ENABLE_COLLABORATION: false, // Future feature
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_FAILED: 'Please check your input and try again.',
  FILE_TOO_LARGE: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
  INVALID_FILE_TYPE: 'Invalid file type. Please select a supported file.',
  TOO_MANY_FILES: `You can upload a maximum of ${MAX_FILES_PER_DOCUMENT} files per document.`,
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  DOCUMENT_CREATED: 'Document created successfully!',
  DOCUMENT_UPDATED: 'Document updated successfully!',
  DOCUMENT_DELETED: 'Document deleted successfully!',
  FILE_UPLOADED: 'File uploaded successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  EMAIL_SENT: 'Email sent successfully!',
};

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: AUTH_TOKEN_KEY,
  REFRESH_TOKEN: REFRESH_TOKEN_KEY,
  USER_DATA: USER_DATA_KEY,
  THEME: 'dgl_theme',
  LANGUAGE: 'dgl_language',
  RECENT_SEARCHES: 'dgl_recent_searches',
  DRAFT_DOCUMENT: 'dgl_draft_document',
  PREFERENCES: 'dgl_preferences',
};

/**
 * External service URLs
 */
export const EXTERNAL_URLS = {
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',
  SUPPORT: '/support',
  DOCUMENTATION: '/docs',
  GITHUB: 'https://github.com/digitalguaranteelocker',
  TWITTER: 'https://twitter.com/dguaranteelocker',
  LINKEDIN: 'https://linkedin.com/company/digitalguaranteelocker',
};

/**
 * Email templates (if using client-side email)
 */
export const EMAIL_TEMPLATES = {
  EXPIRY_REMINDER: {
    subject: 'Warranty Expiry Reminder - {{documentTitle}}',
    preheader: 'Your warranty for {{documentTitle}} is expiring soon',
  },
  WELCOME: {
    subject: 'Welcome to Digital Guarantee Locker!',
    preheader: 'Get started with managing your warranties',
  },
  PASSWORD_RESET: {
    subject: 'Reset your password',
    preheader: 'Click the link to reset your password',
  },
};

/**
 * Regular expressions for validation
 */
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  SERIAL_NUMBER: /^[a-zA-Z0-9\-\_]+$/,
};

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    PREFERENCES: '/user/preferences',
    DELETE_ACCOUNT: '/user/delete-account',
  },
  DOCUMENTS: {
    LIST: '/documents',
    CREATE: '/documents',
    GET: (id: string) => `/documents/${id}`,
    UPDATE: (id: string) => `/documents/${id}`,
    DELETE: (id: string) => `/documents/${id}`,
    SEARCH: '/documents/search',
    EXPORT: '/documents/export',
  },
  FILES: {
    UPLOAD: '/files/upload',
    DOWNLOAD: (id: string) => `/files/${id}/download`,
    DELETE: (id: string) => `/files/${id}`,
    THUMBNAIL: (id: string) => `/files/${id}/thumbnail`,
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    DELETE: (id: string) => `/notifications/${id}`,
  },
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    EXPORT_DATA: '/analytics/export',
  },
};

const constants = {
  APP_NAME,
  APP_VERSION,
  APP_DESCRIPTION,
  API_BASE_URL,
  API_VERSION,
  MAX_FILE_SIZE,
  GUARANTEE_CATEGORIES,
  REMINDER_OPTIONS,
  CURRENCIES,
  DATE_FORMATS,
  LANGUAGES,
  TIMEZONES,
  PAGINATION,
  SEARCH,
  VALIDATION,
  ANIMATION_DURATION,
  BREAKPOINTS,
  Z_INDEX,
  THEME,
  FEATURE_FLAGS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
  EXTERNAL_URLS,
  REGEX_PATTERNS,
  API_ENDPOINTS,
};

export default constants;