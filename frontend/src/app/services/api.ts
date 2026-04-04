const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5278';

export interface Product {
  id: number;
  nome: string;
  preco: number;
  tipoProduto: string;
  estoque: number;
  description: string;
  image: string;
  category: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    nome: string;
    email: string;
  };
}

export interface User {
  id: number;
  nome: string;
  email: string;
}

// ========== PRODUTOS ==========

export async function fetchProducts(tipo?: string): Promise<Product[]> {
  const url = tipo
    ? `${API_BASE_URL}/api/products?tipo=${tipo}`
    : `${API_BASE_URL}/api/products`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar produtos');
  return response.json();
}

export async function fetchProduct(id: string | number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar produto');
  return response.json();
}

// ========== AUTENTICAÇÃO ==========

export async function register(
  nome: string,
  email: string,
  senha: string,
  cargo?: string
): Promise<{ message: string; userId: number }> {
  const response = await fetch(`${API_BASE_URL}/api/auth/cadastrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha, cargo: cargo || 'Cliente' }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao registrar');
  }

  return response.json();
}

export async function login(email: string, senha: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Email ou senha inválidos');
  }

  return response.json();
}

// ========== PEDIDOS ==========

export interface OrderItem {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
}

export async function createOrder(
  itens: OrderItem[],
  valorFrete: number,
  token: string
): Promise<{ message: string; orderId: number; total: number }> {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ itens, valorFrete }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao criar pedido');
  }

  return response.json();
}

export async function getMyOrders(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/orders/my`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar pedidos');
  }

  return response.json();
}
