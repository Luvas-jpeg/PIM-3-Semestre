import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'equipment' | 'course';
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  discount: number;
  finalTotal: number;
  paymentMethod: 'debit' | 'credit' | 'pix';
  installments?: number;
  promoCode?: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

interface UserContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  orders: Order[];
  login: (email: string, password: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addOrder: (order: Omit<Order, 'id' | 'userId' | 'createdAt'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>({
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    }
  });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      userId: '1',
      items: [
        {
          id: '5',
          name: 'Curso de Primeiros Socorros Básico',
          price: 450.00,
          quantity: 1,
          type: 'course'
        }
      ],
      total: 450.00,
      discount: 0,
      finalTotal: 450.00,
      paymentMethod: 'credit',
      installments: 3,
      status: 'completed',
      createdAt: '2026-04-10T10:30:00'
    },
    {
      id: '2',
      userId: '1',
      items: [
        {
          id: '1',
          name: 'Estetoscópio Profissional',
          price: 289.90,
          quantity: 1,
          type: 'equipment'
        }
      ],
      total: 289.90,
      discount: 28.99,
      finalTotal: 260.91,
      paymentMethod: 'pix',
      promoCode: 'MEDICO10',
      status: 'processing',
      createdAt: '2026-04-20T14:15:00'
    }
  ]);

  const login = (email: string, password: string) => {
    setUser({
      id: '1',
      name: 'João Silva',
      email: email,
      cpf: '123.456.789-00',
      phone: '(11) 98765-4321',
      address: {
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (profileUpdate: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...profileUpdate });
    }
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'userId' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substring(7),
      userId: user?.id || '1',
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        orders,
        login,
        logout,
        updateProfile,
        addOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
