import { useState, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input, Button, Card, CardHeader, CardTitle, CardContent } from '../common';
import { useAuth } from '../../hooks/useAuth';
import { validateLogin } from '../../utils/validators';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useLanguage } from '../../i18n';

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const result = validateLogin({ email, password });
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({ email, password });

      if (response.success) {
        navigate(from, { replace: true });
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
          <LogIn className="w-6 h-6 text-primary-600" />
        </div>
        <CardTitle>{t.auth.welcomeBack}</CardTitle>
        <p className="text-gray-500 mt-1">{t.auth.signInAccount}</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {authError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {authError}
            </div>
          )}

          <Input
            label={t.passenger.email}
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: '' }));
            }}
            error={errors.email}
            placeholder="you@example.com"
            leftIcon={<Mail className="w-5 h-5" />}
            required
          />

          <Input
            label={t.auth.password}
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors(prev => ({ ...prev, password: '' }));
            }}
            error={errors.password}
            leftIcon={<Lock className="w-5 h-5" />}
            required
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
          >
            {t.auth.signIn}
          </Button>

          <p className="text-center text-sm text-gray-500">
            {t.auth.noAccount}{' '}
            <Link to="/register" className="text-primary-600 hover:underline font-medium">
              {t.nav.signUp}
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="border-t border-gray-100 pt-4 mt-4">
            <p className="text-xs text-gray-400 text-center mb-2">{t.auth.demoCredentials}</p>
            <p className="text-xs text-gray-400 text-center">
              Email: demo@egypt-railways.com | Password: demo123
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
