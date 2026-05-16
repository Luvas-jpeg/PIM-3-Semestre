import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi, clearAuthToken, ordersApi, setAuthToken } from '../lib/api';

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
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addOrder: (order: Omit<Order, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  refreshOrders: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const USER_KEY = 'medishop_user';

const emptyAddress: UserProfile['address'] = {
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  zipCode: '',
};

function getStoredUser(): UserProfile | null {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
}

function toUserProfile(user: { id: number; nome: string; email: string }): UserProfile {
  return {
    id: user.id.toString(),
    name: user.nome,
    email: user.email,
    cpf: '',
    phone: '',
    address: emptyAddress,
  };
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => getStoredUser());
  const [orders, setOrders] = useState<Order[]>([]);

  const refreshOrders = useCallback(async () => {
    if (!user) {
      setOrders([]);
      return;
    }

    const apiOrders = await ordersApi.listMine();
    setOrders(apiOrders.map((order) => ({ ...order, userId: user.id })));
  }, [user]);

  useEffect(() => {
    if (user) {
      refreshOrders().catch(() => setOrders([]));
    }
  }, [refreshOrders, user]);

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    const profile = toUserProfile(response.user);

    setAuthToken(response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
    setUser(profile);
  };

  const register = async (name: string, email: string, password: string) => {
    await authApi.register(name, email, password);
    await login(email, password);
  };

  const logout = () => {
    clearAuthToken();
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setOrders([]);
  };

  const updateProfile = (profileUpdate: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...profileUpdate };
      setUser(updated);
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
    }
  };

  const addOrder = async (orderData: Omit<Order, 'id' | 'userId' | 'createdAt'>) => {
    await ordersApi.create(
      orderData.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
      }))
    );

    await refreshOrders();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        orders,
        login,
        register,
        logout,
        updateProfile,
        addOrder,
        refreshOrders,
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
