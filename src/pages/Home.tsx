import { TrainSearch } from '../components/train';
import { Train, Shield, Clock, CreditCard } from 'lucide-react';
import { useLanguage } from '../i18n';

export function Home() {
  const { t, language } = useLanguage();

  const routes = language === 'ar' ? [
    { from: 'القاهرة', to: 'الإسكندرية', duration: '2h 30m', price: 150 },
    { from: 'القاهرة', to: 'الأقصر', duration: '9h 30m', price: 450 },
    { from: 'القاهرة', to: 'أسوان', duration: '13h 00m', price: 550 },
  ] : [
    { from: 'Cairo', to: 'Alexandria', duration: '2h 30m', price: 150 },
    { from: 'Cairo', to: 'Luxor', duration: '9h 30m', price: 450 },
    { from: 'Cairo', to: 'Aswan', duration: '13h 00m', price: 550 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.home.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto">
              {t.home.heroSubtitle}
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <TrainSearch />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t.home.whyChoose}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Train className="w-8 h-8" />}
              title={t.home.features.network}
              description={t.home.features.networkDesc}
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title={t.home.features.updates}
              description={t.home.features.updatesDesc}
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title={t.home.features.secure}
              description={t.home.features.secureDesc}
            />
            <FeatureCard
              icon={<CreditCard className="w-8 h-8" />}
              title={t.home.features.payment}
              description={t.home.features.paymentDesc}
            />
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-16 px-4 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            {t.home.popularRoutes}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {t.home.popularRoutesDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RouteCard
              from={routes[0].from}
              to={routes[0].to}
              duration={routes[0].duration}
              price={routes[0].price}
              image="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400"
              startingFrom={t.home.startingFrom}
            />
            <RouteCard
              from={routes[1].from}
              to={routes[1].to}
              duration={routes[1].duration}
              price={routes[1].price}
              image="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=400"
              startingFrom={t.home.startingFrom}
            />
            <RouteCard
              from={routes[2].from}
              to={routes[2].to}
              duration={routes[2].duration}
              price={routes[2].price}
              image="https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400"
              startingFrom={t.home.startingFrom}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t.home.readyTitle}
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            {t.home.readyDesc}
          </p>
          <a
            href="#top"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            {t.home.bookNow}
          </a>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-lg dark:shadow-gray-900/30 transition-shadow">
      <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-400">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

interface RouteCardProps {
  from: string;
  to: string;
  duration: string;
  price: number;
  image: string;
  startingFrom: string;
}

function RouteCard({ from, to, duration, price, image, startingFrom }: RouteCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/40 transition-shadow">
      <div
        className="h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <div className="text-white">
            <p className="font-semibold text-lg">
              {from} → {to}
            </p>
            <p className="text-sm text-gray-200">{duration}</p>
          </div>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <span className="text-gray-600 dark:text-gray-400">{startingFrom}</span>
        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{price} EGP</span>
      </div>
    </div>
  );
}
