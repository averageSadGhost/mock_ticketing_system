/**
 * Core TypeScript interfaces for the Train Ticketing System
 */

// ============================================
// Station Types
// ============================================

export interface Station {
  id: string;
  code: string;
  name: string;
  city: string;
  state: string;
}

// ============================================
// Train Types
// ============================================

export type TrainType = 'express' | 'regional' | 'high-speed';

export type SeatClass = 'first' | 'business' | 'economy';

export interface Train {
  id: string;
  number: string;
  name: string;
  type: TrainType;
  origin: Station;
  destination: Station;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  pricing: Record<SeatClass, number>;
  coaches: Coach[];
}

export interface Coach {
  id: string;
  number: string;
  class: SeatClass;
  seats: Seat[];
}

export interface Seat {
  id: string;
  number: string;
  position: 'window' | 'aisle' | 'middle';
  isAvailable: boolean;
}

// ============================================
// Search Types
// ============================================

export interface SearchParams {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

export interface SearchResult {
  trains: Train[];
  searchParams: SearchParams;
}

// ============================================
// Booking Types
// ============================================

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
}

export interface SelectedSeat {
  coachId: string;
  coachNumber: string;
  seatId: string;
  seatNumber: string;
  class: SeatClass;
  price: number;
}

export interface Booking {
  id: string;
  pnr: string;
  train: Train;
  passengers: Passenger[];
  seats: SelectedSeat[];
  travelDate: string;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
  paymentDetails?: PaymentDetails;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

// ============================================
// Payment Types
// ============================================

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message: string;
}

// ============================================
// User & Auth Types
// ============================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

// ============================================
// Context Types
// ============================================

export interface BookingContextState {
  searchParams: SearchParams | null;
  selectedTrain: Train | null;
  selectedSeats: SelectedSeat[];
  passengers: Passenger[];
  currentBooking: Booking | null;
}

export type BookingAction =
  | { type: 'SET_SEARCH_PARAMS'; payload: SearchParams }
  | { type: 'SET_SELECTED_TRAIN'; payload: Train }
  | { type: 'ADD_SEAT'; payload: SelectedSeat }
  | { type: 'REMOVE_SEAT'; payload: string }
  | { type: 'SET_PASSENGERS'; payload: Passenger[] }
  | { type: 'SET_BOOKING'; payload: Booking }
  | { type: 'RESET_BOOKING' };
