import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { Button, Input, Select } from '../common';
import { useBooking } from '../../hooks/useBooking';
import { useLanguage } from '../../i18n';
import { stations } from '../../services/mockData';
import { getMinBookingDate, getMaxBookingDate } from '../../utils/formatters';

export function TrainSearch() {
  const navigate = useNavigate();
  const { setSearchParams } = useBooking();
  const { t, language } = useLanguage();

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(getMinBookingDate());
  const [passengers, setPassengers] = useState(1);

  const stationOptions = stations.map(s => ({
    value: s.code,
    label: language === 'ar' ? `${s.name} (${s.code})` : `${s.city} - ${s.name} (${s.code})`,
  }));

  const handleSwapStations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!origin || !destination || origin === destination) {
      return;
    }

    setSearchParams({
      origin,
      destination,
      date,
      passengers,
    });

    navigate('/search');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.search.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Origin */}
          <div className="relative">
            <Select
              label={t.search.from}
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              options={stationOptions}
              placeholder={t.search.selectOrigin}
              leftIcon={<MapPin className="w-5 h-5" />}
              required
            />
          </div>

          {/* Swap Button */}
          <div className="hidden lg:flex items-end justify-center pb-2">
            <button
              type="button"
              onClick={handleSwapStations}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Swap stations"
            >
              <ArrowLeftRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Destination */}
          <div className="relative">
            <Select
              label={t.search.to}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              options={stationOptions.filter(s => s.value !== origin)}
              placeholder={t.search.selectDestination}
              leftIcon={<MapPin className="w-5 h-5" />}
              required
            />
          </div>

          {/* Mobile Swap Button */}
          <div className="flex lg:hidden justify-center -my-2">
            <button
              type="button"
              onClick={handleSwapStations}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Swap stations"
            >
              <ArrowLeftRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Date */}
          <Input
            label={t.search.date}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={getMinBookingDate()}
            max={getMaxBookingDate()}
            leftIcon={<Calendar className="w-5 h-5" />}
            required
          />

          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.search.passengers}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 rtl:left-auto rtl:right-0 rtl:pr-3 rtl:pl-0">
                <Users className="w-5 h-5" />
              </div>
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white text-gray-900 rtl:pr-10 rtl:pl-10"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num} className="text-gray-900">
                    {num} {num === 1 ? t.search.passenger : t.search.passengers}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              disabled={!origin || !destination || origin === destination}
            >
              {t.search.searchBtn}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
