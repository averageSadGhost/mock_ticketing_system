import { useState } from 'react';
import { Train, Coach, Seat, SeatClass, SelectedSeat } from '../../types';
import { Card, Badge, Button } from '../common';
import { formatCurrency } from '../../utils/formatters';
import { useLanguage } from '../../i18n';

interface SeatSelectorProps {
  train: Train;
  selectedSeats: SelectedSeat[];
  maxSeats: number;
  onSeatSelect: (seat: SelectedSeat) => void;
  onSeatDeselect: (seatId: string) => void;
}

export function SeatSelector({
  train,
  selectedSeats,
  maxSeats,
  onSeatSelect,
  onSeatDeselect,
}: SeatSelectorProps) {
  const { t } = useLanguage();
  const [activeCoach, setActiveCoach] = useState<string>(train.coaches[0]?.id || '');

  const currentCoach = train.coaches.find(c => c.id === activeCoach);

  const isSeatSelected = (seatId: string) =>
    selectedSeats.some(s => s.seatId === seatId);

  const handleSeatClick = (coach: Coach, seat: Seat) => {
    if (!seat.isAvailable) return;

    if (isSeatSelected(seat.id)) {
      onSeatDeselect(seat.id);
    } else if (selectedSeats.length < maxSeats) {
      onSeatSelect({
        coachId: coach.id,
        coachNumber: coach.number,
        seatId: seat.id,
        seatNumber: seat.number,
        class: coach.class,
        price: train.pricing[coach.class],
      });
    }
  };

  const getClassStyles = (seatClass: SeatClass) => {
    switch (seatClass) {
      case 'first':
        return 'bg-amber-50 border-amber-200';
      case 'business':
        return 'bg-blue-50 border-blue-200';
      case 'economy':
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getSeatStyles = (seat: Seat, coach: Coach) => {
    if (!seat.isAvailable) {
      return 'bg-gray-200 text-gray-400 cursor-not-allowed';
    }
    if (isSeatSelected(seat.id)) {
      return 'bg-primary-600 text-white border-primary-700';
    }
    return `bg-green-100 text-green-800 hover:bg-green-200 border border-green-300 ${
      seat.position === 'window' ? 'ring-2 ring-offset-1 ring-amber-400' : ''
    }`;
  };

  // Organize seats into rows
  const organizeSeats = (seats: Seat[], coachClass: SeatClass) => {
    const seatsPerRow = coachClass === 'first' ? 4 : coachClass === 'business' ? 4 : 5;
    const rows: Seat[][] = [];

    for (let i = 0; i < seats.length; i += seatsPerRow) {
      rows.push(seats.slice(i, i + seatsPerRow));
    }

    return rows;
  };

  return (
    <div className="space-y-6">
      {/* Coach Selection */}
      <Card padding="sm">
        <div className="flex flex-wrap gap-2">
          {train.coaches.map(coach => (
            <Button
              key={coach.id}
              variant={activeCoach === coach.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveCoach(coach.id)}
            >
              {t.seats.coach} {coach.number}
              <Badge
                variant={
                  coach.class === 'first'
                    ? 'warning'
                    : coach.class === 'business'
                    ? 'info'
                    : 'default'
                }
                size="sm"
                className="ml-2"
              >
                {coach.class === 'first' ? t.class.first : coach.class === 'business' ? t.class.business : t.class.economy}
              </Badge>
            </Button>
          ))}
        </div>
      </Card>

      {/* Seat Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-green-100 border border-green-300"></div>
          <span>{t.seats.available}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary-600"></div>
          <span>{t.seats.selected}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gray-200"></div>
          <span>{t.seats.unavailable}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-green-100 border border-green-300 ring-2 ring-offset-1 ring-amber-400"></div>
          <span>{t.seats.window}</span>
        </div>
      </div>

      {/* Seat Map */}
      {currentCoach && (
        <Card className={`${getClassStyles(currentCoach.class)} border`}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                {t.seats.coach} {currentCoach.number}
              </h3>
              <p className="text-sm text-gray-600">
                {currentCoach.class === 'first' ? t.class.first : currentCoach.class === 'business' ? t.class.business : t.class.economy} - {formatCurrency(train.pricing[currentCoach.class])} {t.seats.perSeat}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {currentCoach.seats.filter(s => s.isAvailable).length} {t.seats.seatsAvailable}
            </div>
          </div>

          {/* Coach Layout */}
          <div className="bg-white rounded-lg p-4 overflow-x-auto">
            {/* Front of train indicator */}
            <div className="text-center text-xs text-gray-400 mb-4">
              ← {t.seats.frontOfTrain}
            </div>

            <div className="flex flex-col items-center gap-2 min-w-fit">
              {organizeSeats(currentCoach.seats, currentCoach.class).map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-1">
                  {/* Row number */}
                  <span className="w-6 text-xs text-gray-400 text-right pr-2">
                    {rowIndex + 1}
                  </span>

                  {/* Seats */}
                  {row.map((seat, seatIndex) => (
                    <div key={seat.id} className="flex items-center">
                      <button
                        onClick={() => handleSeatClick(currentCoach, seat)}
                        disabled={!seat.isAvailable || (selectedSeats.length >= maxSeats && !isSeatSelected(seat.id))}
                        className={`
                          w-9 h-9 rounded-md flex items-center justify-center text-xs font-medium
                          transition-all duration-150
                          ${getSeatStyles(seat, currentCoach)}
                        `}
                        title={`Seat ${seat.number} - ${seat.position}`}
                      >
                        {seat.number}
                      </button>

                      {/* Aisle space */}
                      {currentCoach.class === 'economy' && seatIndex === 1 && (
                        <div className="w-6"></div>
                      )}
                      {currentCoach.class !== 'economy' && seatIndex === 1 && (
                        <div className="w-8"></div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Back of train indicator */}
            <div className="text-center text-xs text-gray-400 mt-4">
              {t.seats.backOfTrain} →
            </div>
          </div>
        </Card>
      )}

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <Card className="bg-primary-50 border border-primary-200">
          <h4 className="font-semibold text-primary-900 mb-3">
            {t.seats.selectedSeats} ({selectedSeats.length}/{maxSeats})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map(seat => (
              <div
                key={seat.seatId}
                className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-primary-200"
              >
                <span className="font-medium">
                  {t.seats.coach} {seat.coachNumber} - {t.seats.seatLabel} {seat.seatNumber}
                </span>
                <span className="text-sm text-gray-500">
                  ({seat.class === 'first' ? t.class.first : seat.class === 'business' ? t.class.business : t.class.economy})
                </span>
                <span className="text-primary-600 font-semibold">
                  {formatCurrency(seat.price)}
                </span>
                <button
                  onClick={() => onSeatDeselect(seat.seatId)}
                  className="text-red-500 hover:text-red-700 ml-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
