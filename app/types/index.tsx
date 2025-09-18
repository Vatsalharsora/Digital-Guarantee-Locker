/**
 * User related types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  isEmailVerified: boolean;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationSettings;
  timezone: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  expiryReminders: boolean;
  reminderDays: number[];
}

/**
 * Authentication types
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Guarantee/Warranty Document types
 */
export interface GuaranteeDocument {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: GuaranteeCategory;
  brand: string;
  model?: string;
  serialNumber?: string;
  purchaseDate: Date;
  expiryDate: Date;
  warrantyPeriod: number; // in months
  purchaseAmount?: number;
  currency?: string;
  retailer?: string;
  files: DocumentFile[];
  tags: string[];
  status: GuaranteeStatus;
  reminders: ReminderSettings;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface DocumentFile {
  id: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  fileType: string;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
  isEncrypted: boolean;
}

export type GuaranteeCategory = 
  | 'electronics'
  | 'appliances'
  | 'automotive'
  | 'furniture'
  | 'clothing'
  | 'jewelry'
  | 'sports'
  | 'tools'
  | 'other';

export type GuaranteeStatus = 
  | 'active'
  | 'expired'
  | 'expiring_soon'
  | 'claimed'
  | 'archived';

export interface ReminderSettings {
  enabled: boolean;
  reminderDays: number[]; // Days before expiry to send reminders
  lastReminderSent?: Date;
}

/**
 * Dashboard and Analytics types
 */
export interface DashboardStats {
  totalGuarantees: number;
  activeGuarantees: number;
  expiredGuarantees: number;
  expiringSoon: number;
  totalValue: number;
  categoriesBreakdown: CategoryStats[];
  expiryTrend: ExpiryTrendData[];
}

export interface CategoryStats {
  category: GuaranteeCategory;
  count: number;
  percentage: number;
  totalValue: number;
}

export interface ExpiryTrendData {
  month: string;
  expiring: number;
  expired: number;
}

/**
 * Search and Filter types
 */
export interface SearchFilters {
  query?: string;
  categories?: GuaranteeCategory[];
  status?: GuaranteeStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  sortBy?: SortOption;
  sortOrder?: 'asc' | 'desc';
}

export type SortOption = 
  | 'title'
  | 'purchaseDate'
  | 'expiryDate'
  | 'createdAt'
  | 'purchaseAmount'
  | 'brand';

export interface SearchResults {
  documents: GuaranteeDocument[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

/**
 * Form types
 */
export interface GuaranteeFormData {
  title: string;
  description?: string;
  category: GuaranteeCategory;
  brand: string;
  model?: string;
  serialNumber?: string;
  purchaseDate: string; // ISO date string
  expiryDate: string; // ISO date string
  warrantyPeriod: number;
  purchaseAmount?: number;
  currency?: string;
  retailer?: string;
  tags: string[];
  files: File[];
  reminders: {
    enabled: boolean;
    reminderDays: number[];
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * API Response types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasMore: boolean;
  };
}

/**
 * Upload types
 */
export interface FileUploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

export interface UploadResponse {
  file: DocumentFile;
  uploadUrl?: string;
}

/**
 * Notification types
 */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export type NotificationType = 
  | 'expiry_reminder'
  | 'warranty_expired'
  | 'document_uploaded'
  | 'account_update'
  | 'system_notification';

/**
 * Error types
 */
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

/**
 * Component prop types
 */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export interface TableColumn<T> {
  key: keyof T | string;
  title: string;
  render?: (value: any, record: T) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

/**
 * Theme types
 */
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  borderRadius: 'none' | 'small' | 'medium' | 'large';
}

/**
 * Settings types
 */
export interface AppSettings {
  theme: ThemeConfig;
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  autoBackup: boolean;
  encryptionEnabled: boolean;
}

/**
 * Export and Import types
 */
export interface ExportOptions {
  format: 'json' | 'csv' | 'pdf';
  includeFiles: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  categories?: GuaranteeCategory[];
}

export interface ImportResult {
  success: boolean;
  imported: number;
  failed: number;
  errors: string[];
  warnings: string[];
}

/**
 * Utility types
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * API endpoint types
 */
export interface ApiEndpoints {
  auth: {
    login: string;
    signup: string;
    logout: string;
    refresh: string;
    forgotPassword: string;
    resetPassword: string;
  };
  guarantees: {
    list: string;
    create: string;
    get: (id: string) => string;
    update: (id: string) => string;
    delete: (id: string) => string;
  };
  files: {
    upload: string;
    download: (id: string) => string;
    delete: (id: string) => string;
  };
  user: {
    profile: string;
    updateProfile: string;
    preferences: string;
    notifications: string;
  };
}

/**
 * Event types for analytics
 */
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

export type TrackingEvents = 
  | 'document_created'
  | 'document_updated'
  | 'document_deleted'
  | 'document_viewed'
  | 'file_uploaded'
  | 'reminder_sent'
  | 'user_registered'
  | 'user_login'
  | 'search_performed'
  | 'filter_applied'
  | 'export_requested';

/**
 * Feature flag types
 */
export interface FeatureFlags {
  enableDarkMode: boolean;
  enableNotifications: boolean;
  enableFileEncryption: boolean;
  enableAdvancedSearch: boolean;
  enableAnalytics: boolean;
  enableExport: boolean;
  maxFileSize: number;
  maxFilesPerDocument: number;
}

export default {};