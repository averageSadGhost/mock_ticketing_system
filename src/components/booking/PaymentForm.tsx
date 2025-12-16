import { useState, FormEvent } from 'react';
import { Input, Button, Card, CardHeader, CardTitle, CardContent } from '../common';
import { PaymentDetails } from '../../types';
import { validatePayment } from '../../utils/validators';
import { CreditCard, Lock } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { formatCurrency } from '../../utils/formatters';

interface PaymentFormProps {
  totalAmount: number;
  onSubmit: (paymentDetails: PaymentDetails) => void;
  isProcessing: boolean;
}

export function PaymentForm({ totalAmount, onSubmit, isProcessing }: PaymentFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<PaymentDetails>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof PaymentDetails, value: string) => {
    let formattedValue = value;

    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(\d{4})/g, '$1 ')
        .trim();
    }

    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 4)
        .replace(/(\d{2})(\d{0,2})/, (_, m, y) => (y ? `${m}/${y}` : m));
    }

    // Limit CVV
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));

    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const result = validatePayment(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary-600" />
          <CardTitle>{t.payment.title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Number */}
          <Input
            label={t.payment.cardNumber}
            name="cardNumber"
            value={formData.cardNumber}
            onChange={(e) => handleChange('cardNumber', e.target.value)}
            error={errors.cardNumber}
            placeholder="1234 5678 9012 3456"
            leftIcon={<CreditCard className="w-5 h-5" />}
            required
          />

          {/* Card Holder */}
          <Input
            label={t.payment.cardHolder}
            name="cardHolder"
            value={formData.cardHolder}
            onChange={(e) => handleChange('cardHolder', e.target.value)}
            error={errors.cardHolder}
            placeholder="JOHN DOE"
            style={{ textTransform: 'uppercase' }}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <Input
              label={t.payment.expiryDate}
              name="expiryDate"
              value={formData.expiryDate}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              error={errors.expiryDate}
              placeholder="MM/YY"
              required
            />

            {/* CVV */}
            <Input
              label={t.payment.cvv}
              name="cvv"
              type="password"
              value={formData.cvv}
              onChange={(e) => handleChange('cvv', e.target.value)}
              error={errors.cvv}
              placeholder="123"
              required
            />
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
            <Lock className="w-4 h-4" />
            <span>{t.payment.secureNotice}</span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isProcessing}
          >
            {t.payment.pay} {formatCurrency(totalAmount)}
          </Button>

          {/* Test Card Info */}
          <div className="text-xs text-gray-400 text-center">
            <p>{t.payment.testCard}</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
