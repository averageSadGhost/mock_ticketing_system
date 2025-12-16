import { RegisterForm } from '../components/auth';
import { Train } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

export function Register() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      <div className="mb-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <Train className="w-10 h-10 text-primary-600" />
          <span className="text-2xl font-bold text-gray-900">{t.appName}</span>
        </Link>
      </div>

      <RegisterForm />
    </div>
  );
}
