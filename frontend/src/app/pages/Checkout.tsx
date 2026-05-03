import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useAdmin } from '../context/AdminContext';
import { CreditCard, Smartphone, Tag, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const { addOrder } = useUser();
  const { validatePromoCode, updatePromoCode } = useAdmin();

  const [paymentMethod, setPaymentMethod] = useState<'debit' | 'credit' | 'pix'>('credit');
  const [installments, setInstallments] = useState('1');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; type: 'percentage' | 'fixed' } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  const handleApplyPromo = () => {
    setPromoError('');
    const validated = validatePromoCode(promoCode);

    if (validated) {
      setAppliedPromo({
        code: validated.code,
        discount: validated.discount,
        type: validated.discountType
      });
      toast.success('Código promocional aplicado!');
    } else {
      setPromoError('Código inválido, expirado ou já utilizado');
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;

    if (appliedPromo.type === 'percentage') {
      return total * (appliedPromo.discount / 100);
    } else {
      return appliedPromo.discount;
    }
  };

  const discount = calculateDiscount();
  const finalTotal = total - discount;
  const installmentValue = finalTotal / parseInt(installments);

  const handleFinishOrder = () => {
    // Incrementar uso do código promocional
    if (appliedPromo) {
      const validatedPromo = validatePromoCode(appliedPromo.code);
      if (validatedPromo) {
        updatePromoCode(validatedPromo.id, {
          usageCount: validatedPromo.usageCount + 1
        });
      }
    }

    addOrder({
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        type: item.type
      })),
      total,
      discount,
      finalTotal,
      paymentMethod,
      installments: paymentMethod === 'credit' ? parseInt(installments) : undefined,
      promoCode: appliedPromo?.code,
      status: 'pending'
    });

    clearCart();
    toast.success('Pedido realizado com sucesso!');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Finalizar Pedido
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resumo do Pedido */}
          <div className="lg:col-span-2 space-y-6">
            {/* Itens */}
            <Card>
              <CardHeader>
                <CardTitle>Itens do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-purple-600">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Código Promocional */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="size-5 text-pink-600" />
                  Código Promocional
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!appliedPromo ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Digite o código"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        className="flex-1"
                      />
                      <Button onClick={handleApplyPromo} variant="outline">
                        Aplicar
                      </Button>
                    </div>
                    {promoError && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <X className="size-4" />
                        {promoError}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <Check className="size-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">{appliedPromo.code}</p>
                        <p className="text-sm text-green-600">
                          {appliedPromo.type === 'percentage'
                            ? `${appliedPromo.discount}% de desconto`
                            : `R$ ${appliedPromo.discount.toFixed(2)} de desconto`}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={handleRemovePromo}>
                      <X className="size-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Forma de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="size-5 text-purple-600" />
                      Cartão de Crédito
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="debit" id="debit" />
                    <Label htmlFor="debit" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="size-5 text-red-600" />
                      Cartão de Débito
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Smartphone className="size-5 text-pink-600" />
                      PIX
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'credit' && (
                  <div className="pt-4 border-t">
                    <Label htmlFor="installments">Número de Parcelas</Label>
                    <Select value={installments} onValueChange={setInstallments}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 10, 12].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}x de R$ {(finalTotal / num).toFixed(2)}
                            {num === 1 ? ' à vista' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Resumo de Valores */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">R$ {total.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({appliedPromo.code})</span>
                    <span className="font-medium">- R$ {discount.toFixed(2)}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-purple-600">
                    R$ {finalTotal.toFixed(2)}
                  </span>
                </div>

                {paymentMethod === 'credit' && parseInt(installments) > 1 && (
                  <p className="text-sm text-gray-600 text-center">
                    {installments}x de R$ {installmentValue.toFixed(2)}
                  </p>
                )}

                <Button
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                  size="lg"
                  onClick={handleFinishOrder}
                >
                  Finalizar Pedido
                </Button>

                <p className="text-xs text-center text-gray-500">
                  Ao finalizar, você concorda com nossos termos de serviço
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
