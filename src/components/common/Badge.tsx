import { ReactNode } from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

// Specialized badges for train types
export function TrainTypeBadge({ type }: { type: 'high-speed' | 'express' | 'regional' }) {
  const config = {
    'high-speed': { label: 'High Speed', variant: 'primary' as const },
    express: { label: 'Express', variant: 'info' as const },
    regional: { label: 'Regional', variant: 'success' as const },
  };

  const { label, variant } = config[type];

  return (
    <Badge variant={variant} size="sm">
      {label}
    </Badge>
  );
}

// Specialized badges for seat classes
export function SeatClassBadge({ seatClass }: { seatClass: 'first' | 'business' | 'economy' }) {
  const config = {
    first: { label: 'First Class', variant: 'warning' as const },
    business: { label: 'Business', variant: 'info' as const },
    economy: { label: 'Economy', variant: 'default' as const },
  };

  const { label, variant } = config[seatClass];

  return (
    <Badge variant={variant} size="sm">
      {label}
    </Badge>
  );
}

// Booking status badge
export function BookingStatusBadge({ status }: { status: 'pending' | 'confirmed' | 'cancelled' }) {
  const config = {
    pending: { label: 'Pending', variant: 'warning' as const },
    confirmed: { label: 'Confirmed', variant: 'success' as const },
    cancelled: { label: 'Cancelled', variant: 'danger' as const },
  };

  const { label, variant } = config[status];

  return (
    <Badge variant={variant}>
      {label}
    </Badge>
  );
}
