import { RouterProvider } from 'react-router';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { Toaster } from './components/ui/sonner';
import { router } from './routes';

export default function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster />
      </CartProvider>
    </AdminProvider>
  );
}