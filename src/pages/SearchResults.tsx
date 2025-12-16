import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrainList, TrainSearch } from '../components/train';
import { useBooking } from '../hooks/useBooking';
import { useTrains } from '../hooks/useTrains';
import { Train } from '../types';
import { formatDate } from '../utils/formatters';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/common';
import { useLanguage } from '../i18n';

export function SearchResults() {
  const navigate = useNavigate();
  const { searchParams, setSelectedTrain } = useBooking();
  const { trains, isLoading, error, search, getStations } = useTrains();
  const { t } = useLanguage();

  const stations = getStations();

  useEffect(() => {
    if (searchParams) {
      search(searchParams);
    }
  }, [searchParams, search]);

  const handleSelectTrain = (train: Train) => {
    setSelectedTrain(train);
    navigate('/seats');
  };

  const originStation = stations.find(s => s.code === searchParams?.origin);
  const destinationStation = stations.find(s => s.code === searchParams?.destination);

  if (!searchParams) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.search.searchForTrains}
          </h2>
          <p className="text-gray-600 mb-6">
            {t.search.enterOriginDest}
          </p>
          <Button onClick={() => navigate('/')}>
            {t.common.goHome}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.search.backToSearch}
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {originStation?.city || searchParams.origin} → {destinationStation?.city || searchParams.destination}
              </h1>
              <p className="text-gray-600">
                {formatDate(searchParams.date)} • {searchParams.passengers} {searchParams.passengers !== 1 ? t.search.passengers : t.search.passenger}
              </p>
            </div>

            <Button variant="outline" onClick={() => navigate('/')}>
              {t.search.modifySearch}
            </Button>
          </div>
        </div>
      </div>

      {/* Collapsible Search Form */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <details className="bg-white rounded-xl shadow-sm">
          <summary className="px-4 py-3 cursor-pointer text-primary-600 font-medium hover:bg-gray-50 rounded-xl">
            {t.search.quickSearch}
          </summary>
          <div className="p-4 border-t border-gray-100">
            <TrainSearch />
          </div>
        </details>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <TrainList
          trains={trains}
          isLoading={isLoading}
          error={error}
          onSelectTrain={handleSelectTrain}
        />
      </div>
    </div>
  );
}
