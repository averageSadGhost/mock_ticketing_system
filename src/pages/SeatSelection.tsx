import { useNavigate } from 'react-router-dom';
import { SeatSelector } from '../components/train';
import { BookingSummary } from '../components/booking';
import { Button, Card } from '../components/common';
import { useBooking } from '../hooks/useBooking';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { useLanguage } from '../i18n';

export function SeatSelection() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    selectedTrain,
    selectedSeats,
    searchParams,
    addSeat,
    removeSeat,
    getTotalAmount,
  } = useBooking();

  if (!selectedTrain || !searchParams) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.common.noTrainSelected}
          </h2>
          <p className="text-gray-600 mb-6">
            {t.common.selectTrainFirst}
          </p>
          <Button onClick={() => navigate('/search')}>
            {t.search.backToSearch}
          </Button>
        </div>
      </div>
    );
  }

  const maxSeats = searchParams.passengers;
  const canProceed = selectedSeats.length === maxSeats;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/search')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.seats.backToResults}
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            {t.seats.title}
          </h1>
          <p className="text-gray-600">
            {t.seats.chooseSeat} {maxSeats} {maxSeats !== 1 ? t.seats.seats : t.seats.seat} {t.seats.forJourney}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seat Selector */}
          <div className="lg:col-span-2">
            <SeatSelector
              train={selectedTrain}
              selectedSeats={selectedSeats}
              maxSeats={maxSeats}
              onSeatSelect={addSeat}
              onSeatDeselect={removeSeat}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BookingSummary
              train={selectedTrain}
              selectedSeats={selectedSeats}
              travelDate={searchParams.date}
            />

            {/* Action Buttons */}
            <Card padding="md">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-medium">{t.summary.total}</span>
                  <span className="font-bold text-primary-600">
                    {formatCurrency(getTotalAmount())}
                  </span>
                </div>

                {!canProceed && (
                  <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
                    {t.seats.selectMore} {maxSeats - selectedSeats.length} {maxSeats - selectedSeats.length !== 1 ? t.seats.moreSeats : t.seats.moreSeat}
                  </p>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!canProceed}
                  onClick={() => navigate('/booking')}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {t.seats.continueBooking}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
