import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge, TrainTypeBadge, BookingStatusBadge, Modal } from '../components/common';
import { useAuth } from '../hooks/useAuth';
import { Booking } from '../types';
import { getStoredBookings, cancelBooking, calculateRefund, RefundResult } from '../services/mockData';
import { formatTime, formatDate, formatCurrency } from '../utils/formatters';
import { Ticket, MapPin, Calendar, Users, X, AlertTriangle, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../i18n';

export function MyTickets() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [refundPreview, setRefundPreview] = useState<RefundResult | null>(null);

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
          <Ticket className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t.common.pleaseLogin}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
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
    const preview = calculateRefund(booking);
    setRefundPreview(preview);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    if (bookingToCancel) {
      const refundResult = cancelBooking(bookingToCancel.id);
      if (refundResult) {
        setBookings(prev =>
          prev.map(b =>
            b.id === bookingToCancel.id ? {
              ...b,
              status: 'cancelled' as const,
              refund: {
                amount: refundResult.refundAmount,
                percentage: refundResult.refundPercentage,
                status: refundResult.refundPercentage > 0 ? 'processing' as const : 'completed' as const,
                reason: refundResult.reason,
                requestedAt: new Date().toISOString(),
                estimatedDays: refundResult.estimatedDays
              }
            } : b
          )
        );
      }
      setCancelModalOpen(false);
      setBookingToCancel(null);
      setRefundPreview(null);
    }
  };

  const activeBookings = bookings.filter(b => b.status !== 'cancelled');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.myTickets.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t.myTickets.subtitle}</p>
          </div>
          <Link to="/">
            <Button>{t.myTickets.bookNew}</Button>
          </Link>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center py-12">
            <Ticket className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t.myTickets.noBookings}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
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
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
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
                <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">
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
          onClose={() => { setCancelModalOpen(false); setRefundPreview(null); }}
          title={t.myTickets.cancelBooking}
          size="md"
        >
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {t.myTickets.cancelConfirm}
              </p>
            </div>

            {bookingToCancel && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="font-medium dark:text-white">{bookingToCancel.train.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.confirmation.pnr}: {bookingToCancel.pnr}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(bookingToCancel.travelDate)} - {formatCurrency(bookingToCancel.totalAmount)}
                </p>
              </div>
            )}

            {/* Refund Preview */}
            {refundPreview && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  {t.refund.title}
                </h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.refund.percentage}:</span>
                    <span className={`font-semibold ${refundPreview.refundPercentage > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {refundPreview.refundPercentage}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.refund.amount}:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(refundPreview.refundAmount)}
                    </span>
                  </div>
                  {refundPreview.estimatedDays > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{t.refund.estimatedDays}:</span>
                      <span className="text-gray-900 dark:text-white">{refundPreview.estimatedDays} {t.refund.days}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {refundPreview.reason}
                  </p>
                </div>
              </div>
            )}

            {/* Refund Policy Note */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                <strong>{t.refund.refundPolicy}:</strong> {t.refund.policyDetails}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => { setCancelModalOpen(false); setRefundPreview(null); }}
              >
                {t.myTickets.keepBooking}
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                onClick={handleConfirmCancel}
              >
                {t.myTickets.confirmCancel}
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
            <h3 className="font-semibold text-gray-900 dark:text-white">{booking.train.name}</h3>
            <TrainTypeBadge type={booking.train.type} />
            <BookingStatusBadge status={booking.status} />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
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
          <div className="flex items-center gap-2 mt-3 text-sm dark:text-gray-300">
            <span className="font-medium">{formatTime(booking.train.departureTime)}</span>
            <MapPin className="w-3 h-3 text-gray-400 dark:text-gray-500" />
            <span>{booking.train.origin.code}</span>
            <span className="text-gray-400 dark:text-gray-500">→</span>
            <span>{booking.train.destination.code}</span>
            <MapPin className="w-3 h-3 text-gray-400 dark:text-gray-500" />
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
          <p className={`text-xl font-bold ${isCancelled ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-primary-600 dark:text-primary-400'}`}>
            {formatCurrency(booking.totalAmount)}
          </p>

          {/* Refund Info for Cancelled Bookings */}
          {isCancelled && booking.refund && (
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm">
                {booking.refund.status === 'processing' ? (
                  <Clock className="w-3 h-3 text-yellow-500" />
                ) : booking.refund.status === 'completed' ? (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                ) : (
                  <RefreshCw className="w-3 h-3 text-gray-400" />
                )}
                <span className={`text-xs ${
                  booking.refund.status === 'processing' ? 'text-yellow-600 dark:text-yellow-400' :
                  booking.refund.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                  'text-gray-500'
                }`}>
                  {booking.refund.status === 'processing' ? t.refund.processing :
                   booking.refund.status === 'completed' ? t.refund.completed :
                   booking.refund.status === 'pending' ? t.refund.pending : t.refund.failed}
                </span>
              </div>
              {booking.refund.amount > 0 && (
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {t.refund.amount}: {formatCurrency(booking.refund.amount)}
                </p>
              )}
              {booking.refund.amount === 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t.refund.noRefund}
                </p>
              )}
            </div>
          )}

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
