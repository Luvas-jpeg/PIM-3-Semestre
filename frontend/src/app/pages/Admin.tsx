import { useState } from 'react';
import { Header } from '../components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ProductsManager } from '../components/admin/ProductsManager';
import { CoursesManager } from '../components/admin/CoursesManager';
import { LayoutDashboard, Package, GraduationCap } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Admin Header */}
      <div className="bg-gradient-to-br from-red-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="size-8" />
            <h1 className="text-4xl font-bold">Painel Administrativo</h1>
          </div>
          <p className="text-pink-100 text-lg">
            Gerencie equipamentos e cursos da plataforma
          </p>
        </div>
      </div>

      {/* Admin Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-xl mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="size-4" />
              Equipamentos
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <GraduationCap className="size-4" />
              Cursos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductsManager />
          </TabsContent>

          <TabsContent value="courses">
            <CoursesManager />
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
