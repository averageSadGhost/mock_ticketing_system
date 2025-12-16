import { createContext, useReducer, ReactNode } from 'react';
import {
  SearchParams,
  Train,
  SelectedSeat,
  Passenger,
  Booking,
  BookingContextState,
  BookingAction,
} from '../types';
import { generatePNR, saveBooking } from '../services/mockData';

interface BookingContextType extends BookingContextState {
  setSearchParams: (params: SearchParams) => void;
  setSelectedTrain: (train: Train) => void;
  addSeat: (seat: SelectedSeat) => void;
  removeSeat: (seatId: string) => void;
  clearSeats: () => void;
  setPassengers: (passengers: Passenger[]) => void;
  completeBooking: (travelDate: string) => Booking;
  resetBooking: () => void;
  getTotalAmount: () => number;
}

const initialState: BookingContextState = {
  searchParams: null,
  selectedTrain: null,
  selectedSeats: [],
  passengers: [],
  currentBooking: null,
};

function bookingReducer(state: BookingContextState, action: BookingAction): BookingContextState {
  switch (action.type) {
    case 'SET_SEARCH_PARAMS':
      return {
        ...state,
        searchParams: action.payload,
      };
    case 'SET_SELECTED_TRAIN':
      return {
        ...state,
        selectedTrain: action.payload,
        selectedSeats: [],
      };
    case 'ADD_SEAT':
      return {
        ...state,
        selectedSeats: [...state.selectedSeats, action.payload],
      };
    case 'REMOVE_SEAT':
      return {
        ...state,
        selectedSeats: state.selectedSeats.filter(s => s.seatId !== action.payload),
      };
    case 'SET_PASSENGERS':
      return {
        ...state,
        passengers: action.payload,
      };
    case 'SET_BOOKING':
      return {
        ...state,
        currentBooking: action.payload,
      };
    case 'RESET_BOOKING':
      return initialState;
    default:
      return state;
  }
}

export const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
  children: ReactNode;
}

export function BookingProvider({ children }: BookingProviderProps) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const setSearchParams = (params: SearchParams) => {
    dispatch({ type: 'SET_SEARCH_PARAMS', payload: params });
  };

  const setSelectedTrain = (train: Train) => {
    dispatch({ type: 'SET_SELECTED_TRAIN', payload: train });
  };

  const addSeat = (seat: SelectedSeat) => {
    dispatch({ type: 'ADD_SEAT', payload: seat });
  };

  const removeSeat = (seatId: string) => {
    dispatch({ type: 'REMOVE_SEAT', payload: seatId });
  };

  const clearSeats = () => {
    state.selectedSeats.forEach(seat => {
      dispatch({ type: 'REMOVE_SEAT', payload: seat.seatId });
    });
  };

  const setPassengers = (passengers: Passenger[]) => {
    dispatch({ type: 'SET_PASSENGERS', payload: passengers });
  };

  const getTotalAmount = () => {
    return state.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  };

  const completeBooking = (travelDate: string): Booking => {
    if (!state.selectedTrain || state.selectedSeats.length === 0) {
      throw new Error('Invalid booking state');
    }

    const booking: Booking = {
      id: `booking-${Date.now()}`,
      pnr: generatePNR(),
      train: state.selectedTrain,
      passengers: state.passengers,
      seats: state.selectedSeats,
      travelDate,
      totalAmount: getTotalAmount(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    saveBooking(booking);
    dispatch({ type: 'SET_BOOKING', payload: booking });

    return booking;
  };

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
  };

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setSearchParams,
        setSelectedTrain,
        addSeat,
        removeSeat,
        clearSeats,
        setPassengers,
        completeBooking,
        resetBooking,
        getTotalAmount,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
