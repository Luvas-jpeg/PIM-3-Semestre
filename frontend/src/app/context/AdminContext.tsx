import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './CartContext';
import { products as initialProducts } from '../data/products';

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
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 98765-4321',
      courseId: '5',
      courseName: 'Curso de Primeiros Socorros Básico',
      enrollmentDate: '10/04/2026',
      status: 'active'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '(21) 99876-5432',
      courseId: '6',
      courseName: 'Curso de Suporte Avançado de Vida (ACLS)',
      enrollmentDate: '05/04/2026',
      status: 'active'
    },
    {
      id: '3',
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      phone: '(31) 97654-3210',
      courseId: '7',
      courseName: 'Workshop de Técnicas de Sutura',
      enrollmentDate: '28/03/2026',
      status: 'completed'
    }
  ]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substring(7),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productUpdate: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...productUpdate } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
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
