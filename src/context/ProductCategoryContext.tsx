import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ProductCategory {
  id: string;
  name: string;
  description: string;
}

interface ProductCategoryContextType {
  categories: ProductCategory[];
  addCategory: (category: Omit<ProductCategory, 'id'>) => void;
  updateCategory: (category: ProductCategory) => void;
  deleteCategory: (id: string) => void;
  loading: boolean;
}

const ProductCategoryContext = createContext<ProductCategoryContextType | undefined>(undefined);

export const ProductCategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const storedCategories = localStorage.getItem('productCategories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('productCategories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (category: Omit<ProductCategory, 'id'>) => {
    setLoading(true);
    const newCategory = { id: uuidv4(), ...category };
    setCategories(prev => [...prev, newCategory]);
    setLoading(false);
  };

  const updateCategory = (updatedCategory: ProductCategory) => {
    setLoading(true);
    setCategories(prev =>
      prev.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat))
    );
    setLoading(false);
  };

  const deleteCategory = (id: string) => {
    setLoading(true);
    setCategories(prev => prev.filter(cat => cat.id !== id));
    setLoading(false);
  };

  return (
    <ProductCategoryContext.Provider value={{
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      loading
    }}>
      {children}
    </ProductCategoryContext.Provider>
  );
};

export const useProductCategories = () => {
  const context = useContext(ProductCategoryContext);
  if (context === undefined) {
    throw new Error('useProductCategories must be used within a ProductCategoryProvider');
  }
  return context;
}; 