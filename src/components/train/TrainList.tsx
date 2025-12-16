import { Train } from '../../types';
import { TrainCard } from './TrainCard';
import { Loading } from '../common';
import { AlertCircle, Train as TrainIcon } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface TrainListProps {
  trains: Train[];
  isLoading: boolean;
  error: string | null;
  onSelectTrain: (train: Train) => void;
}

export function TrainList({ trains, isLoading, error, onSelectTrain }: TrainListProps) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="py-12">
        <Loading size="lg" text={t.common.loading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">{t.search.noResults}</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (trains.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
        <TrainIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {t.search.searchForTrains}
        </h3>
        <p className="text-gray-500">
          {t.search.enterOriginDest}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {trains.length} {t.search.results}
        </h2>
        <p className="text-sm text-gray-500">
          {t.search.pricesPerPerson}
        </p>
      </div>

      <div className="space-y-4">
        {trains.map(train => (
          <TrainCard
            key={train.id}
            train={train}
            onSelect={onSelectTrain}
          />
        ))}
      </div>
    </div>
  );
}
