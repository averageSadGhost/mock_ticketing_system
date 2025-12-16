import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentForm, BookingSummary } from '../components/booking';
import { Button } from '../components/common';
import { useBooking } from '../hooks/useBooking';
import { PaymentDetails } from '../types';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n';

export function Payment() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    selectedTrain,
    selectedSeats,
    searchParams,
    passengers,
    getTotalAmount,
    completeBooking,
  } = useBooking();

  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedTrain || !searchParams || selectedSeats.length === 0 || passengers.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.common.missingInfo}
          </h2>
          <p className="text-gray-600 mb-6">
            {t.common.completeSteps}
          </p>
          <Button onClick={() => navigate('/')}>
            {t.common.startNewSearch}
          </Button>
        </div>
      </div>
    );
  }

  const handlePayment = async (_paymentDetails: PaymentDetails) => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const booking = completeBooking(searchParams.date);
      navigate('/confirmation', { state: { bookingId: booking.id } });
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/booking')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.payment.backToPassengers}
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            {t.payment.title}
          </h1>
          <p className="text-gray-600">
            {t.payment.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <PaymentForm
              totalAmount={getTotalAmount()}
              onSubmit={handlePayment}
              isProcessing={isProcessing}
            />
          </div>

          {/* Sidebar */}
          <div>
            <BookingSummary
              train={selectedTrain}
              selectedSeats={selectedSeats}
              passengers={passengers}
              travelDate={searchParams.date}
              showPassengers
            />
          </div>
        </div>
      </div>
    </div>
  );
}
