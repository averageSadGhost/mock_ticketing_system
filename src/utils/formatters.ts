/**
 * Utility functions for formatting dates, currency, and other values
 */

import { format, parseISO } from 'date-fns';

/**
 * Format a date string to display format
 */
export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'EEE, MMM d, yyyy');
  } catch {
    return dateString;
  }
}

/**
 * Format a date for input fields (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Format time to 12-hour format
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Format currency in Egyptian Pounds (EGP)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format duration string for display
 */
export function formatDuration(duration: string): string {
  return duration.replace('h', 'h ').replace('m', 'm');
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

/**
 * Format seat class name
 */
export function formatSeatClass(seatClass: string): string {
  return seatClass.charAt(0).toUpperCase() + seatClass.slice(1) + ' Class';
}

/**
 * Format train type
 */
export function formatTrainType(type: string): string {
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get minimum date for booking (today)
 */
export function getMinBookingDate(): string {
  return formatDateForInput(new Date());
}

/**
 * Get maximum date for booking (90 days from now)
 */
export function getMaxBookingDate(): string {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);
  return formatDateForInput(maxDate);
}
