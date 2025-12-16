import { Train, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../i18n';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Train className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-bold text-white">{t.appName}</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {t.footer.description}
            </p>
            <p className="text-sm text-gray-500">
              {t.appTagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-primary-400 transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="/my-tickets" className="hover:text-primary-400 transition-colors">
                  {t.nav.myTickets}
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-primary-400 transition-colors">
                  {t.nav.login}
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-primary-400 transition-colors">
                  {t.nav.signUp}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>info@enr.gov.eg</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span dir="ltr">1661</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>{language === 'ar' ? 'محطة رمسيس، القاهرة' : 'Ramses Station, Cairo'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} {t.footer.copyright}
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
              {t.footer.terms}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
              {t.footer.faq}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
