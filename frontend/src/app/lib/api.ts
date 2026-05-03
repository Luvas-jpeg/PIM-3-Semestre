import { Product } from '../context/CartContext';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5278/api'
).replace(/\/$/, '');

const TOKEN_KEY = 'medishop_token';
const USER_KEY = 'medishop_user';

export interface AuthUser {
  id: number;
  nome: string;
  email: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

interface BackendProduct {
  id?: number;
  Id?: number;
  nome?: string;
  Nome?: string;
  preco?: number;
  Preco?: number;
  tipoProduto?: string;
  TipoProduto?: string;
  estoque?: number;
  Estoque?: number;
  description?: string;
  Description?: string;
  image?: string;
  Image?: string;
  category?: string;
  Category?: string;
  date?: string;
  Date?: string;
  location?: string;
  Location?: string;
  instructor?: string;
  Instructor?: string;
}

interface RequestOptions extends RequestInit {
  token?: string | null;
  body?: BodyInit | object | null;
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  const rawUser = localStorage.getItem(USER_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function storeSession(session: AuthSession) {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  const token = options.token ?? getStoredToken();

  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body:
      options.body && !(options.body instanceof FormData)
        ? JSON.stringify(options.body)
        : options.body,
  });

  if (!response.ok) {
    let message = 'Não foi possível concluir a operação.';

    try {
      const error = await response.json();
      message = error.message || message;
    } catch {
      if (response.status === 401) {
        message = 'Faça login para continuar.';
      }
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function mapProduct(product: BackendProduct): Product {
  return {
    id: String(product.id ?? product.Id),
    name: product.nome ?? product.Nome ?? '',
    price: Number(product.preco ?? product.Preco ?? 0),
    type: (product.tipoProduto ?? product.TipoProduto ?? 'equipment') as Product['type'],
    stock: product.estoque ?? product.Estoque ?? 0,
    description: product.description ?? product.Description ?? '',
    image: product.image ?? product.Image ?? '',
    category: product.category ?? product.Category ?? '',
    date: product.date ?? product.Date ?? '',
    location: product.location ?? product.Location ?? '',
    instructor: product.instructor ?? product.Instructor ?? '',
  };
}

function toBackendProduct(product: Omit<Product, 'id'> | Product) {
  return {
    Nome: product.name,
    Preco: product.price,
    TipoProduto: product.type,
    Estoque: product.stock ?? 0,
    Description: product.description,
    Image: product.image,
    Category: product.category ?? '',
    Date: product.date ?? '',
    Location: product.location ?? '',
    Instructor: product.instructor ?? '',
  };
}

export async function getProducts(tipo?: Product['type']) {
  const query = tipo ? `?tipo=${encodeURIComponent(tipo)}` : '';
  const products = await apiRequest<BackendProduct[]>(`/Products${query}`);
  return products.map(mapProduct);
}

export async function createProduct(product: Omit<Product, 'id'>) {
  const created = await apiRequest<BackendProduct>('/Products', {
    method: 'POST',
    body: toBackendProduct(product),
  });

  return mapProduct(created);
}

export async function updateProduct(productId: string, product: Partial<Product>) {
  const current = await getProduct(productId);
  const updated = await apiRequest<BackendProduct>(`/Products/${productId}`, {
    method: 'PUT',
    body: toBackendProduct({ ...current, ...product }),
  });

  return mapProduct(updated);
}

export async function deleteProduct(productId: string) {
  await apiRequest<void>(`/Products/${productId}`, {
    method: 'DELETE',
  });
}

export async function getProduct(productId: string) {
  const product = await apiRequest<BackendProduct>(`/Products/${productId}`);
  return mapProduct(product);
}

export async function login(email: string, senha: string) {
  const session = await apiRequest<AuthSession>('/Auth/login', {
    method: 'POST',
    body: { Email: email, Senha: senha },
    token: null,
  });

  storeSession(session);
  return session;
}

export async function register(nome: string, email: string, senha: string) {
  await apiRequest('/Auth/cadastrar', {
    method: 'POST',
    body: { Nome: nome, Email: email, Senha: senha },
    token: null,
  });

  return login(email, senha);
}

export async function createOrder(cart: Array<Product & { quantity: number }>) {
  return apiRequest<{ orderId: number; total: number; message: string }>('/Orders', {
    method: 'POST',
    body: {
      ValorFrete: 0,
      Itens: cart.map((item) => ({
        ProdutoId: Number(item.id),
        Quantidade: item.quantity,
        PrecoUnitario: item.price,
      })),
    },
  });
}
