import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PassengerListForm, BookingSummary } from '../components/booking';
import { Button, Card } from '../components/common';
import { useBooking } from '../hooks/useBooking';
import { useAuth } from '../hooks/useAuth';
import { Passenger } from '../types';
import { validatePassenger } from '../utils/validators';
import { ArrowLeft, ArrowRight, LogIn } from 'lucide-react';
import { useLanguage } from '../i18n';

export function Booking() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const {
    selectedTrain,
    selectedSeats,
    searchParams,
    setPassengers,
  } = useBooking();

  const [passengerList, setPassengerList] = useState<Partial<Passenger>[]>(() => {
    // Pre-fill first passenger with logged-in user data
    if (isAuthenticated && user && searchParams) {
      const initialPassengers: Partial<Passenger>[] = [
        {
          id: 'passenger-0',
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          age: 30,
        },
      ];

      // Add empty slots for additional passengers
      for (let i = 1; i < searchParams.passengers; i++) {
        initialPassengers.push({
          id: `passenger-${i}`,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          age: 0,
        });
      }

      return initialPassengers;
    }

    // Initialize empty passenger forms
    return searchParams
      ? Array.from({ length: searchParams.passengers }, (_, i) => ({
          id: `passenger-${i}`,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          age: 0,
        }))
      : [];
  });

  if (!selectedTrain || !searchParams || selectedSeats.length === 0) {
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

  const validateAllPassengers = (): boolean => {
    for (const passenger of passengerList) {
      const result = validatePassenger({
        firstName: passenger.firstName || '',
        lastName: passenger.lastName || '',
        email: passenger.email || '',
        phone: passenger.phone || '',
        age: passenger.age || 0,
      });

      if (!result.isValid) {
        return false;
      }
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateAllPassengers()) {
      alert('Please fill in all passenger details correctly.');
      return;
    }

    setPassengers(passengerList as Passenger[]);
    navigate('/payment');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/seats')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.booking.backToSeats}
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            {t.booking.title}
          </h1>
          <p className="text-gray-600">
            {t.booking.enterDetails} {searchParams.passengers} {t.booking.passengers}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Passenger Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Login Prompt */}
            {!isAuthenticated && (
              <Card className="bg-primary-50 border border-primary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-primary-900">
                      {t.booking.alreadyAccount}
                    </h3>
                    <p className="text-sm text-primary-700">
                      {t.booking.loginToAutofill}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/login', { state: { from: { pathname: '/booking' } } })}
                    leftIcon={<LogIn className="w-4 h-4" />}
                  >
                    {t.nav.login}
                  </Button>
                </div>
              </Card>
            )}

            <PassengerListForm
              passengers={passengerList}
              onChange={setPassengerList}
              requiredCount={searchParams.passengers}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BookingSummary
              train={selectedTrain}
              selectedSeats={selectedSeats}
              travelDate={searchParams.date}
            />

            {/* Action Button */}
            <Card padding="md">
              <Button
                className="w-full"
                size="lg"
                onClick={handleContinue}
                disabled={passengerList.length !== searchParams.passengers}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                {t.booking.continuePayment}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
