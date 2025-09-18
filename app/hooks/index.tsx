import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";

// ---------- useLocalStorage ----------
export function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch {
        // ignore
      }
    },
    [key, storedValue]
  );

  const remove = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch {
      // ignore
    }
  }, [key, initialValue]);

  return [storedValue, setValue, remove] as const;
}

// ---------- useForm ----------
export function useForm<T extends Record<string, any>>(initialValues: T, validate: (values: T) => Partial<Record<keyof T, string>>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  const setError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const clearError = useCallback((field: keyof T) => {
  setErrors((prev) => {
    const { [field]: _, ...rest } = prev;
    return rest as Partial<Record<keyof T, string>>;
  });
    }, []);

  const setFieldTouched = useCallback((name: keyof T, isTouched = true) => {
    setTouchedState(prev => ({ ...prev, [name]: isTouched }));
  }, []);

  const validateField = useCallback((field: keyof T, value: T[keyof T]) => {
    const validationErrors = validate({ ...values, [field]: value });
    return validationErrors[field] || "";
  }, [validate, values]);

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;
    (Object.keys(values) as Array<keyof T>).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    return isValid;
  }, [validateField, values]);

  const handleSubmit = useCallback(async (onSubmit: (values: T) => Promise<void> | void) => {
    setIsSubmitting(true);
    if (validateForm()) {
      await onSubmit(values);
    }
    setIsSubmitting(false);
  }, [validateForm, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouchedState({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    setError,
    clearError,
    setFieldTouched,
    validateField,
    validateForm,
    handleSubmit,
    reset,
  };
}

// ---------- useTheme ----------
export function useTheme() {
  const [theme, setStoredTheme] = useLocalStorage<"light" | "dark" | "system">("dgl_theme", "system");

  const toggleTheme = useCallback(() => {
    setStoredTheme((current) => (current === "light" ? "dark" : "light"));
  }, [setStoredTheme]);

  const setLightTheme = useCallback(() => setStoredTheme("light"), [setStoredTheme]);
  const setDarkTheme = useCallback(() => setStoredTheme("dark"), [setStoredTheme]);
  const setSystemTheme = useCallback(() => setStoredTheme("system"), [setStoredTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    root.classList.remove("light", "dark");
    root.classList.add(isDark ? "dark" : "light");
  }, [theme]);

  return { theme, toggleTheme, setLightTheme, setDarkTheme, setSystemTheme };
}

// ---------- useGuarantees ----------
export interface GuaranteeDocument {
  id: string;
  title: string;
  description: string;
  expiryDate: string;
  tags?: string[];
}

export function useGuarantees() {
  const [documents, setDocuments] = useState<GuaranteeDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addDocument = useCallback((doc: GuaranteeDocument) => {
    setDocuments(prev => [...prev, doc]);
  }, []);

  const removeDocument = useCallback((id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  }, []);

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return {
    documents: filteredDocuments,
    addDocument,
    removeDocument,
    setSearchQuery,
  };
}
