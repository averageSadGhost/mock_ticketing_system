/**
 * Mock Data for Egypt Railways Ticketing System
 * Contains Egyptian stations, trains, schedules, and seat configurations
 */

import { Station, Train, Coach, Seat, SeatClass, TrainType } from '../types';

// ============================================
// Egyptian Train Stations
// ============================================

export const stations: Station[] = [
  { id: 'sta-1', code: 'CAI', name: 'محطة رمسيس', city: 'Cairo', state: 'القاهرة' },
  { id: 'sta-2', code: 'ALX', name: 'محطة مصر', city: 'Alexandria', state: 'الإسكندرية' },
  { id: 'sta-3', code: 'ASW', name: 'محطة أسوان', city: 'Aswan', state: 'أسوان' },
  { id: 'sta-4', code: 'LXR', name: 'محطة الأقصر', city: 'Luxor', state: 'الأقصر' },
  { id: 'sta-5', code: 'AST', name: 'محطة أسيوط', city: 'Asyut', state: 'أسيوط' },
  { id: 'sta-6', code: 'SHG', name: 'محطة سوهاج', city: 'Sohag', state: 'سوهاج' },
  { id: 'sta-7', code: 'QNA', name: 'محطة قنا', city: 'Qena', state: 'قنا' },
  { id: 'sta-8', code: 'MNF', name: 'محطة المنيا', city: 'Minya', state: 'المنيا' },
  { id: 'sta-9', code: 'TNT', name: 'محطة طنطا', city: 'Tanta', state: 'الغربية' },
  { id: 'sta-10', code: 'DMN', name: 'محطة دمنهور', city: 'Damanhur', state: 'البحيرة' },
  { id: 'sta-11', code: 'PSD', name: 'محطة بورسعيد', city: 'Port Said', state: 'بورسعيد' },
  { id: 'sta-12', code: 'ISM', name: 'محطة الإسماعيلية', city: 'Ismailia', state: 'الإسماعيلية' },
  { id: 'sta-13', code: 'SUZ', name: 'محطة السويس', city: 'Suez', state: 'السويس' },
  { id: 'sta-14', code: 'GZA', name: 'محطة الجيزة', city: 'Giza', state: 'الجيزة' },
  { id: 'sta-15', code: 'BNS', name: 'محطة بني سويف', city: 'Beni Suef', state: 'بني سويف' },
];

// ============================================
// Seat Generation Helpers
// ============================================

function generateSeats(coachClass: SeatClass, startNumber: number = 1): Seat[] {
  const seatsPerRow = coachClass === 'first' ? 4 : coachClass === 'business' ? 4 : 5;
  const rows = coachClass === 'first' ? 8 : coachClass === 'business' ? 10 : 12;
  const seats: Seat[] = [];

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= seatsPerRow; col++) {
      const seatNum = startNumber + (row - 1) * seatsPerRow + col - 1;
      let position: 'window' | 'aisle' | 'middle';

      if (seatsPerRow === 4) {
        position = col === 1 || col === 4 ? 'window' : 'aisle';
      } else {
        position = col === 1 || col === 5 ? 'window' : col === 3 ? 'middle' : 'aisle';
      }

      seats.push({
        id: `seat-${seatNum}`,
        number: `${row}${String.fromCharCode(64 + col)}`,
        position,
        isAvailable: Math.random() > 0.3, // 70% available
      });
    }
  }

  return seats;
}

function generateCoaches(trainType: TrainType): Coach[] {
  const coaches: Coach[] = [];

  if (trainType === 'high-speed') {
    // Spanish Talgo trains (VIP)
    coaches.push(
      { id: 'coach-1', number: 'VIP1', class: 'first', seats: generateSeats('first') },
      { id: 'coach-2', number: 'A1', class: 'business', seats: generateSeats('business') },
      { id: 'coach-3', number: 'A2', class: 'business', seats: generateSeats('business') },
      { id: 'coach-4', number: 'B1', class: 'economy', seats: generateSeats('economy') },
      { id: 'coach-5', number: 'B2', class: 'economy', seats: generateSeats('economy') },
    );
  } else if (trainType === 'express') {
    // Express trains
    coaches.push(
      { id: 'coach-1', number: 'A1', class: 'business', seats: generateSeats('business') },
      { id: 'coach-2', number: 'B1', class: 'economy', seats: generateSeats('economy') },
      { id: 'coach-3', number: 'B2', class: 'economy', seats: generateSeats('economy') },
      { id: 'coach-4', number: 'B3', class: 'economy', seats: generateSeats('economy') },
    );
  } else {
    // Regional trains
    coaches.push(
      { id: 'coach-1', number: 'C1', class: 'economy', seats: generateSeats('economy') },
      { id: 'coach-2', number: 'C2', class: 'economy', seats: generateSeats('economy') },
      { id: 'coach-3', number: 'C3', class: 'economy', seats: generateSeats('economy') },
    );
  }

  return coaches;
}

// ============================================
// Train Routes and Schedules
// ============================================

interface RouteSchedule {
  origin: Station;
  destination: Station;
  trains: {
    type: TrainType;
    name: string;
    departures: string[];
    duration: string;
  }[];
}

const routeSchedules: RouteSchedule[] = [
  // Cairo - Alexandria (Main Line)
  {
    origin: stations[0], // Cairo
    destination: stations[1], // Alexandria
    trains: [
      { type: 'high-speed', name: 'تالجو الإسباني', departures: ['07:00', '08:00', '10:00', '14:00', '16:00', '19:00'], duration: '2h 30m' },
      { type: 'express', name: 'القطار الفرنساوي', departures: ['06:00', '09:00', '11:00', '13:00', '15:00', '17:00', '20:00'], duration: '2h 45m' },
      { type: 'regional', name: 'قطار الضواحي', departures: ['05:30', '07:30', '12:00', '18:00'], duration: '3h 30m' },
    ],
  },
  // Cairo - Luxor
  {
    origin: stations[0], // Cairo
    destination: stations[3], // Luxor
    trains: [
      { type: 'high-speed', name: 'قطار النوم الفاخر', departures: ['20:00', '22:00'], duration: '9h 30m' },
      { type: 'express', name: 'الصعيد إكسبريس', departures: ['07:30', '08:30', '22:30'], duration: '10h 00m' },
    ],
  },
  // Cairo - Aswan
  {
    origin: stations[0], // Cairo
    destination: stations[2], // Aswan
    trains: [
      { type: 'high-speed', name: 'قطار النوم الفاخر', departures: ['19:00', '21:00'], duration: '13h 00m' },
      { type: 'express', name: 'قطار أسوان', departures: ['07:00', '18:00'], duration: '14h 00m' },
    ],
  },
  // Luxor - Aswan
  {
    origin: stations[3], // Luxor
    destination: stations[2], // Aswan
    trains: [
      { type: 'express', name: 'قطار الصعيد', departures: ['06:00', '09:00', '14:00', '17:00'], duration: '3h 00m' },
      { type: 'regional', name: 'قطار محلي', departures: ['08:00', '12:00', '16:00'], duration: '3h 30m' },
    ],
  },
  // Cairo - Asyut
  {
    origin: stations[0], // Cairo
    destination: stations[4], // Asyut
    trains: [
      { type: 'express', name: 'قطار أسيوط', departures: ['06:00', '08:00', '14:00', '20:00'], duration: '5h 30m' },
      { type: 'regional', name: 'قطار محلي', departures: ['07:00', '11:00', '16:00'], duration: '6h 30m' },
    ],
  },
  // Cairo - Port Said
  {
    origin: stations[0], // Cairo
    destination: stations[10], // Port Said
    trains: [
      { type: 'express', name: 'قطار القناة', departures: ['07:00', '10:00', '14:00', '18:00'], duration: '3h 30m' },
      { type: 'regional', name: 'قطار محلي', departures: ['06:00', '09:00', '15:00'], duration: '4h 00m' },
    ],
  },
  // Cairo - Suez
  {
    origin: stations[0], // Cairo
    destination: stations[12], // Suez
    trains: [
      { type: 'express', name: 'قطار السويس', departures: ['06:30', '09:30', '13:30', '17:30'], duration: '2h 30m' },
      { type: 'regional', name: 'قطار محلي', departures: ['08:00', '12:00', '16:00'], duration: '3h 00m' },
    ],
  },
  // Alexandria - Tanta
  {
    origin: stations[1], // Alexandria
    destination: stations[8], // Tanta
    trains: [
      { type: 'express', name: 'قطار الدلتا', departures: ['07:00', '10:00', '14:00', '17:00', '20:00'], duration: '1h 30m' },
      { type: 'regional', name: 'قطار محلي', departures: ['06:00', '08:00', '12:00', '16:00', '19:00'], duration: '2h 00m' },
    ],
  },
  // Cairo - Tanta
  {
    origin: stations[0], // Cairo
    destination: stations[8], // Tanta
    trains: [
      { type: 'express', name: 'قطار الدلتا', departures: ['06:30', '08:30', '11:30', '14:30', '17:30', '20:30'], duration: '1h 30m' },
      { type: 'regional', name: 'قطار محلي', departures: ['05:30', '09:30', '13:30', '18:30'], duration: '2h 00m' },
    ],
  },
  // Cairo - Minya
  {
    origin: stations[0], // Cairo
    destination: stations[7], // Minya
    trains: [
      { type: 'express', name: 'قطار المنيا', departures: ['06:00', '10:00', '14:00', '18:00'], duration: '4h 00m' },
      { type: 'regional', name: 'قطار محلي', departures: ['07:30', '12:30', '16:30'], duration: '5h 00m' },
    ],
  },
];

// ============================================
// Pricing (in Egyptian Pounds - EGP)
// ============================================

const basePricing: Record<TrainType, Record<SeatClass, number>> = {
  'high-speed': { first: 450, business: 280, economy: 150 },
  'express': { first: 320, business: 200, economy: 100 },
  'regional': { first: 180, business: 120, economy: 60 },
};

function calculatePricing(type: TrainType, durationMinutes: number): Record<SeatClass, number> {
  const base = basePricing[type];
  const multiplier = Math.max(1, durationMinutes / 180); // Scale with duration

  return {
    first: Math.round(base.first * multiplier),
    business: Math.round(base.business * multiplier),
    economy: Math.round(base.economy * multiplier),
  };
}

function parseDuration(duration: string): number {
  const match = duration.match(/(\d+)h\s*(\d+)?m?/);
  if (!match) return 180;
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  return hours * 60 + minutes;
}

function addTime(time: string, duration: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const durationMinutes = parseDuration(duration);

  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;

  return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
}

// ============================================
// Generate Trains for Search
// ============================================

let trainIdCounter = 1;

export function searchTrains(originCode: string, destinationCode: string, _date: string): Train[] {
  const origin = stations.find(s => s.code === originCode);
  const destination = stations.find(s => s.code === destinationCode);

  if (!origin || !destination) return [];

  const route = routeSchedules.find(
    r => r.origin.code === originCode && r.destination.code === destinationCode
  );

  if (!route) {
    // Check reverse route
    const reverseRoute = routeSchedules.find(
      r => r.origin.code === destinationCode && r.destination.code === originCode
    );

    if (reverseRoute) {
      // Generate trains for reverse route
      const trains: Train[] = [];

      for (const schedule of reverseRoute.trains) {
        for (const departure of schedule.departures) {
          const durationMinutes = parseDuration(schedule.duration);
          trains.push({
            id: `train-${trainIdCounter++}`,
            number: `${Math.floor(Math.random() * 900) + 100}`,
            name: schedule.name,
            type: schedule.type,
            origin: destination,
            destination: origin,
            departureTime: departure,
            arrivalTime: addTime(departure, schedule.duration),
            duration: schedule.duration,
            pricing: calculatePricing(schedule.type, durationMinutes),
            coaches: generateCoaches(schedule.type),
          });
        }
      }

      return trains.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }

    return [];
  }

  const trains: Train[] = [];

  for (const schedule of route.trains) {
    for (const departure of schedule.departures) {
      const durationMinutes = parseDuration(schedule.duration);
      trains.push({
        id: `train-${trainIdCounter++}`,
        number: `${Math.floor(Math.random() * 900) + 100}`,
        name: schedule.name,
        type: schedule.type,
        origin,
        destination,
        departureTime: departure,
        arrivalTime: addTime(departure, schedule.duration),
        duration: schedule.duration,
        pricing: calculatePricing(schedule.type, durationMinutes),
        coaches: generateCoaches(schedule.type),
      });
    }
  }

  return trains.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
}

// ============================================
// Mock User Data
// ============================================

export const mockUsers = [
  {
    id: 'user-1',
    email: 'demo@egypt-railways.com',
    password: 'demo123',
    firstName: 'أحمد',
    lastName: 'محمد',
    phone: '01012345678',
  },
];

// ============================================
// Mock Bookings Storage
// ============================================

const BOOKINGS_STORAGE_KEY = 'egypt_railways_bookings';

export function getStoredBookings(): import('../types').Booking[] {
  const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveBooking(booking: import('../types').Booking): void {
  const bookings = getStoredBookings();
  bookings.push(booking);
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
}

export interface RefundResult {
  success: boolean;
  refundAmount: number;
  refundPercentage: number;
  reason: string;
  estimatedDays: number;
}

export function calculateRefund(booking: import('../types').Booking): RefundResult {
  const now = new Date();
  const travelDate = new Date(booking.travelDate);
  const hoursUntilTravel = (travelDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  let refundPercentage: number;
  let reason: string;
  let estimatedDays: number;

  if (hoursUntilTravel > 48) {
    // More than 48 hours before travel: 90% refund
    refundPercentage = 90;
    reason = 'Cancelled more than 48 hours before departure';
    estimatedDays = 3;
  } else if (hoursUntilTravel > 24) {
    // 24-48 hours before travel: 75% refund
    refundPercentage = 75;
    reason = 'Cancelled 24-48 hours before departure';
    estimatedDays = 5;
  } else if (hoursUntilTravel > 6) {
    // 6-24 hours before travel: 50% refund
    refundPercentage = 50;
    reason = 'Cancelled 6-24 hours before departure';
    estimatedDays = 7;
  } else if (hoursUntilTravel > 0) {
    // Less than 6 hours before travel: 25% refund
    refundPercentage = 25;
    reason = 'Cancelled less than 6 hours before departure';
    estimatedDays = 7;
  } else {
    // After departure: No refund
    refundPercentage = 0;
    reason = 'Cancellation after scheduled departure - no refund applicable';
    estimatedDays = 0;
  }

  const refundAmount = Math.round((booking.totalAmount * refundPercentage) / 100);

  return {
    success: true,
    refundAmount,
    refundPercentage,
    reason,
    estimatedDays
  };
}

export function cancelBooking(bookingId: string): RefundResult | null {
  const bookings = getStoredBookings();
  const index = bookings.findIndex(b => b.id === bookingId);

  if (index !== -1) {
    const booking = bookings[index];
    const refundResult = calculateRefund(booking);

    bookings[index].status = 'cancelled';
    bookings[index].refund = {
      amount: refundResult.refundAmount,
      percentage: refundResult.refundPercentage,
      status: refundResult.refundPercentage > 0 ? 'processing' : 'completed',
      reason: refundResult.reason,
      requestedAt: new Date().toISOString(),
      estimatedDays: refundResult.estimatedDays
    };

    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    return refundResult;
  }

  return null;
}

// ============================================
// Generate PNR
// ============================================

export function generatePNR(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pnr = 'EGR-'; // Egypt Railways prefix
  for (let i = 0; i < 6; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
}
