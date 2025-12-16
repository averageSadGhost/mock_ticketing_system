import { Link, useNavigate } from 'react-router-dom';
import { Train, User, LogOut, Ticket, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../i18n';
import { Button } from '../common';

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Train className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">{t.appName}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              {t.nav.home}
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-tickets"
                className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1"
              >
                <Ticket className="w-4 h-4" />
                {t.nav.myTickets}
              </Link>
            )}
          </nav>

          {/* Desktop Auth & Language */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg hover:border-primary-300 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'العربية' : 'English'}
            </button>

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user?.firstName}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  {t.nav.logout}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    {t.nav.login}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">{t.nav.signUp}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              {isAuthenticated && (
                <Link
                  to="/my-tickets"
                  className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Ticket className="w-4 h-4" />
                  {t.nav.myTickets}
                </Link>
              )}

              {/* Mobile Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? 'العربية' : 'English'}
              </button>

              <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="w-5 h-5" />
                      <span className="font-medium">{user?.firstName} {user?.lastName}</span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      leftIcon={<LogOut className="w-4 h-4" />}
                    >
                      {t.nav.logout}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        {t.nav.login}
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full">{t.nav.signUp}</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
