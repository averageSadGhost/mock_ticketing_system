import { Train } from '../../types';
import { Clock, ArrowRight } from 'lucide-react';
import { Card, Button, TrainTypeBadge } from '../common';
import { formatTime, formatCurrency, formatDuration } from '../../utils/formatters';
import { useLanguage } from '../../i18n';

interface TrainCardProps {
  train: Train;
  onSelect: (train: Train) => void;
}

export function TrainCard({ train, onSelect }: TrainCardProps) {
  const { t } = useLanguage();
  const lowestPrice = Math.min(...Object.values(train.pricing));

  return (
    <Card hover className="fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Train Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{train.name}</h3>
            <TrainTypeBadge type={train.type} />
          </div>
          <p className="text-sm text-gray-500 mb-3">{t.train.trainNumber} #{train.number}</p>

          {/* Route & Time */}
          <div className="flex items-center gap-4">
            {/* Departure */}
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {formatTime(train.departureTime)}
              </p>
              <p className="text-sm text-gray-600">{train.origin.code}</p>
            </div>

            {/* Duration */}
            <div className="flex-1 flex flex-col items-center px-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{formatDuration(train.duration)}</span>
              </div>
              <div className="w-full flex items-center">
                <div className="flex-1 h-px bg-gray-300"></div>
                <ArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {formatTime(train.arrivalTime)}
              </p>
              <p className="text-sm text-gray-600">{train.destination.code}</p>
            </div>
          </div>
        </div>

        {/* Pricing & Action */}
        <div className="flex flex-col items-end gap-3 md:min-w-[200px]">
          {/* Prices by class */}
          <div className="flex flex-wrap gap-2 justify-end">
            {train.coaches.some(c => c.class === 'first') && (
              <div className="text-center px-3 py-1 bg-amber-50 rounded-lg">
                <p className="text-xs text-amber-600 font-medium">{t.class.first}</p>
                <p className="text-sm font-bold text-amber-700">
                  {formatCurrency(train.pricing.first)}
                </p>
              </div>
            )}
            {train.coaches.some(c => c.class === 'business') && (
              <div className="text-center px-3 py-1 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 font-medium">{t.class.business}</p>
                <p className="text-sm font-bold text-blue-700">
                  {formatCurrency(train.pricing.business)}
                </p>
              </div>
            )}
            {train.coaches.some(c => c.class === 'economy') && (
              <div className="text-center px-3 py-1 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 font-medium">{t.class.economy}</p>
                <p className="text-sm font-bold text-gray-700">
                  {formatCurrency(train.pricing.economy)}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">
              {t.train.from} <span className="text-lg font-bold text-primary-600">{formatCurrency(lowestPrice)}</span>
            </p>
            <Button onClick={() => onSelect(train)}>
              {t.train.select}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
