import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from './CartContext';
import {
  createProduct as createProductRequest,
  deleteProduct as deleteProductRequest,
  getProducts,
  updateProduct as updateProductRequest,
} from '../lib/api';

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseId: string;
  courseName: string;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'cancelled';
}

interface AdminContextType {
  products: Product[];
  students: Student[];
  isLoadingProducts: boolean;
  productsError: string | null;
  refreshProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  const refreshProducts = async () => {
    setIsLoadingProducts(true);
    setProductsError(null);

    try {
      setProducts(await getProducts());
    } catch (error) {
      setProductsError(error instanceof Error ? error.message : 'Erro ao carregar produtos.');
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    void refreshProducts();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const newProduct = await createProductRequest(product);
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id: string, productUpdate: Partial<Product>) => {
    const updatedProduct = await updateProductRequest(id, productUpdate);
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? updatedProduct : product))
    );
    return updatedProduct;
  };

  const deleteProduct = async (id: string) => {
    await deleteProductRequest(id);
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...student,
      id: Math.random().toString(36).substring(7),
    };
    setStudents((prev) => [...prev, newStudent]);
  };

  const updateStudent = (id: string, studentUpdate: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, ...studentUpdate } : student
      )
    );
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        students,
        isLoadingProducts,
        productsError,
        refreshProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        addStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
