import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge, TrainTypeBadge, BookingStatusBadge, Modal } from '../components/common';
import { useAuth } from '../hooks/useAuth';
import { Booking } from '../types';
import { getStoredBookings, cancelBooking } from '../services/mockData';
import { formatTime, formatDate, formatCurrency } from '../utils/formatters';
import { Ticket, MapPin, Calendar, Users, X, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../i18n';

export function MyTickets() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Get all bookings - in a real app, this would filter by user
      const allBookings = getStoredBookings();
      // Sort by created date, newest first
      allBookings.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setBookings(allBookings);
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.common.pleaseLogin}
          </h2>
          <p className="text-gray-600 mb-6">
            {t.common.needLogin}
          </p>
          <Button onClick={() => navigate('/login', { state: { from: { pathname: '/my-tickets' } } })}>
            {t.nav.login}
          </Button>
        </div>
      </div>
    );
  }

  const handleCancelClick = (booking: Booking) => {
    setBookingToCancel(booking);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    if (bookingToCancel) {
      cancelBooking(bookingToCancel.id);
      setBookings(prev =>
        prev.map(b =>
          b.id === bookingToCancel.id ? { ...b, status: 'cancelled' as const } : b
        )
      );
      setCancelModalOpen(false);
      setBookingToCancel(null);
    }
  };

  const activeBookings = bookings.filter(b => b.status !== 'cancelled');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t.myTickets.title}</h1>
            <p className="text-gray-600">{t.myTickets.subtitle}</p>
          </div>
          <Link to="/">
            <Button>{t.myTickets.bookNew}</Button>
          </Link>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center py-12">
            <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t.myTickets.noBookings}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.myTickets.noBookingsDesc}
            </p>
            <Link to="/">
              <Button>{t.myTickets.searchTrains}</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Active Bookings */}
            {activeBookings.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t.myTickets.activeBookings} ({activeBookings.length})
                </h2>
                <div className="space-y-4">
                  {activeBookings.map(booking => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={() => handleCancelClick(booking)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Cancelled Bookings */}
            {cancelledBookings.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-500 mb-4">
                  {t.myTickets.cancelledBookings} ({cancelledBookings.length})
                </h2>
                <div className="space-y-4 opacity-75">
                  {cancelledBookings.map(booking => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={() => {}}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        <Modal
          isOpen={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          title={t.myTickets.cancelBooking}
          size="sm"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-gray-600 mb-6">
              {t.myTickets.cancelConfirm}
            </p>
            {bookingToCancel && (
              <div className="bg-gray-50 rounded-lg p-3 mb-6 text-left">
                <p className="font-medium">{bookingToCancel.train.name}</p>
                <p className="text-sm text-gray-500">
                  {t.confirmation.pnr}: {bookingToCancel.pnr}
                </p>
              </div>
            )}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setCancelModalOpen(false)}
              >
                {t.myTickets.keepBooking}
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                onClick={handleConfirmCancel}
              >
                {t.myTickets.cancelBooking}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

interface BookingCardProps {
  booking: Booking;
  onCancel: () => void;
}

function BookingCard({ booking, onCancel }: BookingCardProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const isCancelled = booking.status === 'cancelled';

  return (
    <Card hover={!isCancelled} onClick={() => !isCancelled && navigate('/confirmation', { state: { bookingId: booking.id } })}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Train Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-gray-900">{booking.train.name}</h3>
            <TrainTypeBadge type={booking.train.type} />
            <BookingStatusBadge status={booking.status} />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Ticket className="w-4 h-4" />
              PNR: {booking.pnr}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(booking.travelDate)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {booking.passengers.length} {booking.passengers.length !== 1 ? t.search.passengers : t.search.passenger}
            </span>
          </div>

          {/* Route */}
          <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="font-medium">{formatTime(booking.train.departureTime)}</span>
            <MapPin className="w-3 h-3 text-gray-400" />
            <span>{booking.train.origin.code}</span>
            <span className="text-gray-400">→</span>
            <span>{booking.train.destination.code}</span>
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="font-medium">{formatTime(booking.train.arrivalTime)}</span>
          </div>

          {/* Seats */}
          <div className="flex flex-wrap gap-1 mt-2">
            {booking.seats.map(seat => (
              <Badge key={seat.seatId} variant="default" size="sm">
                {seat.coachNumber}-{seat.seatNumber}
              </Badge>
            ))}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex flex-col items-end gap-2">
          <p className="text-xl font-bold text-primary-600">
            {formatCurrency(booking.totalAmount)}
          </p>

          {!isCancelled && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<X className="w-4 h-4" />}
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
            >
              {t.myTickets.cancel}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
