import { RouterProvider } from 'react-router';
import { CartProvider } from './context/CartContext';
import { Toaster } from './components/ui/sonner';
import { router } from './routes';

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      <Toaster />
    </CartProvider>
  );
}