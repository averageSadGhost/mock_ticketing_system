import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Card, Button, Badge, TrainTypeBadge, BookingStatusBadge } from '../components/common';
import { useBooking } from '../hooks/useBooking';
import { Booking } from '../types';
import { getStoredBookings } from '../services/mockData';
import { formatTime, formatDate, formatCurrency, formatDuration } from '../utils/formatters';
import { CheckCircle, Ticket, Download, Home, MapPin, Clock, Users } from 'lucide-react';
import { useLanguage } from '../i18n';

export function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { currentBooking, resetBooking } = useBooking();

  const [booking, setBooking] = useState<Booking | null>(null);

  const bookingId = (location.state as { bookingId?: string })?.bookingId;

  useEffect(() => {
    if (currentBooking) {
      setBooking(currentBooking);
    } else if (bookingId) {
      const bookings = getStoredBookings();
      const found = bookings.find(b => b.id === bookingId);
      if (found) {
        setBooking(found);
      }
    }
  }, [currentBooking, bookingId]);

  useEffect(() => {
    // Cleanup booking context when leaving confirmation
    return () => {
      if (booking) {
        resetBooking();
      }
    };
  }, [booking, resetBooking]);

  if (!booking) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.common.bookingNotFound}
          </h2>
          <p className="text-gray-600 mb-6">
            {t.common.couldNotFind}
          </p>
          <Button onClick={() => navigate('/')}>
            {t.common.goHome}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.confirmation.title}
          </h1>
          <p className="text-gray-600">
            {t.confirmation.subtitle}
          </p>
        </div>

        {/* Ticket Card */}
        <Card className="mb-6 overflow-hidden">
          {/* Ticket Header */}
          <div className="bg-primary-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Ticket className="w-6 h-6" />
                <div>
                  <p className="text-sm text-primary-200">{t.confirmation.pnr}</p>
                  <p className="text-2xl font-bold tracking-wider">{booking.pnr}</p>
                </div>
              </div>
              <BookingStatusBadge status={booking.status} />
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 space-y-6">
            {/* Train Info */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{booking.train.name}</h3>
                  <TrainTypeBadge type={booking.train.type} />
                </div>
                <p className="text-sm text-gray-500">{t.train.trainNumber} #{booking.train.number}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{t.confirmation.travelDate}</p>
                <p className="font-semibold">{formatDate(booking.travelDate)}</p>
              </div>
            </div>

            {/* Route */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                <div className="w-0.5 h-16 bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatTime(booking.train.departureTime)}
                  </p>
                  <p className="text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {booking.train.origin.name}
                  </p>
                  <p className="text-sm text-gray-500">{booking.train.origin.city}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatTime(booking.train.arrivalTime)}
                  </p>
                  <p className="text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {booking.train.destination.name}
                  </p>
                  <p className="text-sm text-gray-500">{booking.train.destination.city}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(booking.train.duration)}</span>
                </div>
              </div>
            </div>

            {/* Seats */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">{t.summary.selectedSeats}</h4>
              <div className="flex flex-wrap gap-2">
                {booking.seats.map(seat => (
                  <Badge key={seat.seatId} variant="primary">
                    {t.seats.coach} {seat.coachNumber} - {t.seats.seatLabel} {seat.seatNumber} ({seat.class === 'first' ? t.class.first : seat.class === 'business' ? t.class.business : t.class.economy})
                  </Badge>
                ))}
              </div>
            </div>

            {/* Passengers */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                {t.summary.passengers} ({booking.passengers.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {booking.passengers.map((passenger, index) => (
                  <div
                    key={passenger.id || index}
                    className="bg-gray-50 rounded-lg p-3"
                  >
                    <p className="font-medium text-gray-900">
                      {passenger.firstName} {passenger.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{passenger.email}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{t.confirmation.totalPaid}</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(booking.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Ticket Footer - QR Code Placeholder */}
          <div className="bg-gray-50 p-6 border-t border-dashed border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t.confirmation.bookingId}</p>
                <p className="font-mono text-sm">{booking.id}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {t.confirmation.bookedOn} {formatDate(booking.createdAt)}
                </p>
              </div>
              <div className="w-24 h-24 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 bg-gray-100 rounded mb-1"></div>
                  <span className="text-xs">{t.confirmation.qrCode}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => window.print()}
          >
            {t.confirmation.downloadTicket}
          </Button>
          <Link to="/">
            <Button leftIcon={<Home className="w-4 h-4" />}>
              {t.confirmation.backToHome}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
