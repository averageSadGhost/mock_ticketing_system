import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Card, CardHeader, CardTitle, CardContent } from '../common';
import { useAuth } from '../../hooks/useAuth';
import { validateRegistration } from '../../utils/validators';
import { Mail, Lock, User, Phone, UserPlus } from 'lucide-react';
import { useLanguage } from '../../i18n';

export function RegisterForm() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const result = validateRegistration(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (response.success) {
        navigate('/');
      } else {
        setAuthError(response.message);
      }
    } catch {
      setAuthError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-6 h-6 text-primary-600" />
        </div>
        <CardTitle>{t.auth.createAccount}</CardTitle>
        <p className="text-gray-500 mt-1">{t.auth.joinToday}</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {authError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {authError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t.passenger.firstName}
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              error={errors.firstName}
              leftIcon={<User className="w-5 h-5" />}
              required
            />

            <Input
              label={t.passenger.lastName}
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              error={errors.lastName}
              required
            />
          </div>

          <Input
            label={t.passenger.email}
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            placeholder="you@example.com"
            leftIcon={<Mail className="w-5 h-5" />}
            required
          />

          <Input
            label={t.passenger.phone}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone}
            placeholder="01xxxxxxxxx"
            leftIcon={<Phone className="w-5 h-5" />}
            required
          />

          <Input
            label={t.auth.password}
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
            leftIcon={<Lock className="w-5 h-5" />}
            required
          />

          <Input
            label={t.auth.confirmPassword}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            leftIcon={<Lock className="w-5 h-5" />}
            required
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
          >
            {t.auth.createAccount}
          </Button>

          <p className="text-center text-sm text-gray-500">
            {t.auth.haveAccount}{' '}
            <Link to="/login" className="text-primary-600 hover:underline font-medium">
              {t.auth.signIn}
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
