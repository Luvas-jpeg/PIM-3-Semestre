import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Plus, Edit, Trash2, Calendar, MapPin, User } from 'lucide-react';
import { Product } from '../../context/CartContext';
import { toast } from 'sonner';

export function CoursesManager() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    date: '',
    location: '',
    instructor: '',
    stock: '',
    image: ''
  });

  const courses = products.filter(p => p.type === 'course');

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      date: '',
      location: '',
      instructor: '',
      stock: '',
      image: ''
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.price || !formData.description || !formData.date) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    addProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      date: formData.date,
      location: formData.location,
      instructor: formData.instructor,
      stock: parseInt(formData.stock) || 0,
      image: formData.image || 'https://images.unsplash.com/photo-1622115585848-1d5b6e8af4e4',
      type: 'course'
    });

    toast.success('Curso adicionado com sucesso!');
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = (course: Product) => {
    setSelectedCourse(course);
    setFormData({
      name: course.name,
      price: course.price.toString(),
      description: course.description,
      date: course.date || '',
      location: course.location || '',
      instructor: course.instructor || '',
      stock: course.stock?.toString() || '',
      image: course.image
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedCourse) return;

    if (!formData.name || !formData.price || !formData.description || !formData.date) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    updateProduct(selectedCourse.id, {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      date: formData.date,
      location: formData.location,
      instructor: formData.instructor,
      stock: parseInt(formData.stock) || 0,
      image: formData.image
    });

    toast.success('Curso atualizado com sucesso!');
    setIsEditDialogOpen(false);
    setSelectedCourse(null);
    resetForm();
  };

  const handleDeleteConfirm = () => {
    if (!selectedCourse) return;
    deleteProduct(selectedCourse.id);
    toast.success('Curso excluído com sucesso!');
    setIsDeleteDialogOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Gerenciar Cursos
          </h2>
          <p className="text-gray-600 mt-1">{courses.length} cursos cadastrados</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="size-4 mr-2" />
              Adicionar Curso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Curso</DialogTitle>
              <DialogDescription>
                Preencha as informações do curso presencial
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Curso *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Curso de Primeiros Socorros"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Valor (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="stock">Vagas Disponíveis</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date">Data do Curso *</Label>
                <Input
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="Ex: 15/04/2026 - 16/04/2026"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Local</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: São Paulo - SP"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="instructor">Instrutor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  placeholder="Ex: Dr. João Silva"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva o conteúdo e os objetivos do curso"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image">URL da Imagem</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleAdd}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Curso</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vagas</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{course.name}</div>
                    {course.instructor && (
                      <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <User className="size-3" />
                        {course.instructor}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="size-3 text-purple-600" />
                    {course.date}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="size-3 text-pink-600" />
                    {course.location}
                  </div>
                </TableCell>
                <TableCell className="text-purple-600 font-semibold">
                  R$ {course.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span className={course.stock && course.stock < 5 ? 'text-red-600' : 'text-green-600'}>
                    {course.stock} vagas
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(course)}
                    >
                      <Edit className="size-4 text-purple-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedCourse(course);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="size-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Curso</DialogTitle>
            <DialogDescription>
              Atualize as informações do curso
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nome do Curso *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Valor (R$) *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-stock">Vagas Disponíveis</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-date">Data do Curso *</Label>
              <Input
                id="edit-date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-location">Local</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-instructor">Instrutor</Label>
              <Input
                id="edit-instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description">Descrição *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-image">URL da Imagem</Label>
              <Input
                id="edit-image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleUpdate}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Atualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o curso <strong>{selectedCourse?.name}</strong>?
              Esta ação não pode ser desfeita e afetará os alunos inscritos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
