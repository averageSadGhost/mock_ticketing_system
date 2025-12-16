import { Train, SelectedSeat, Passenger } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, Badge, SeatClassBadge, TrainTypeBadge } from '../common';
import { formatTime, formatDate, formatCurrency, formatDuration } from '../../utils/formatters';
import { MapPin, Clock, Users, CreditCard } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface BookingSummaryProps {
  train: Train;
  selectedSeats: SelectedSeat[];
  passengers?: Passenger[];
  travelDate: string;
  showPassengers?: boolean;
}

export function BookingSummary({
  train,
  selectedSeats,
  passengers,
  travelDate,
  showPassengers = false,
}: BookingSummaryProps) {
  const { t } = useLanguage();
  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  // Group seats by class
  const seatsByClass = selectedSeats.reduce((acc, seat) => {
    if (!acc[seat.class]) {
      acc[seat.class] = [];
    }
    acc[seat.class].push(seat);
    return acc;
  }, {} as Record<string, SelectedSeat[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.summary.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Train Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-900">{train.name}</h4>
            <TrainTypeBadge type={train.type} />
          </div>
          <p className="text-sm text-gray-500">{t.train.trainNumber} #{train.number}</p>
        </div>

        {/* Route */}
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-primary-500"></div>
            <div className="w-0.5 h-12 bg-gray-200"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <p className="font-semibold text-gray-900">{formatTime(train.departureTime)}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {train.origin.name}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{formatTime(train.arrivalTime)}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {train.destination.name}
              </p>
            </div>
          </div>
        </div>

        {/* Travel Date & Duration */}
        <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-100">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{t.train.duration}:</span>
            <span className="font-medium">{formatDuration(train.duration)}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">{t.search.date}:</span>
            <span className="font-medium ml-1">{formatDate(travelDate)}</span>
          </div>
        </div>

        {/* Selected Seats */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            {t.summary.selectedSeats} ({selectedSeats.length})
          </h4>

          <div className="space-y-3">
            {Object.entries(seatsByClass).map(([seatClass, seats]) => (
              <div key={seatClass} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <SeatClassBadge seatClass={seatClass as 'first' | 'business' | 'economy'} />
                  <span className="text-sm font-medium text-gray-600">
                    {formatCurrency(train.pricing[seatClass as keyof typeof train.pricing])} each
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {seats.map(seat => (
                    <Badge key={seat.seatId} variant="default" size="sm">
                      {seat.coachNumber}-{seat.seatNumber}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Passengers */}
        {showPassengers && passengers && passengers.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">{t.summary.passengers}</h4>
            <div className="space-y-2">
              {passengers.map((passenger, index) => (
                <div key={passenger.id || index} className="text-sm">
                  <p className="font-medium text-gray-800">
                    {index + 1}. {passenger.firstName} {passenger.lastName}
                  </p>
                  <p className="text-gray-500">{passenger.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-600" />
              <span className="font-semibold text-gray-900">{t.summary.total}</span>
            </div>
            <span className="text-2xl font-bold text-primary-600">
              {formatCurrency(totalAmount)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {selectedSeats.length} {t.summary.seatsVarying}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
