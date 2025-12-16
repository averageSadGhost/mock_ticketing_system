import { useState } from 'react';
import { Input, Button, Card } from '../common';
import { Passenger } from '../../types';
import { validatePassenger } from '../../utils/validators';
import { User, X } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface PassengerFormProps {
  index: number;
  passenger: Partial<Passenger>;
  onChange: (passenger: Partial<Passenger>) => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

export function PassengerForm({
  index,
  passenger,
  onChange,
  onRemove,
  showRemove = false,
}: PassengerFormProps) {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof Passenger, value: string | number) => {
    const updatedPassenger = { ...passenger, [field]: value };
    onChange(updatedPassenger);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = () => {
    const result = validatePassenger({
      firstName: passenger.firstName || '',
      lastName: passenger.lastName || '',
      email: passenger.email || '',
      phone: passenger.phone || '',
      age: passenger.age || 0,
    });

    if (!result.isValid) {
      setErrors(result.errors);
    }
  };

  return (
    <Card className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="w-4 h-4 text-primary-600" />
          </div>
          <h3 className="font-semibold text-gray-900">{t.passenger.title} {index + 1}</h3>
        </div>
        {showRemove && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove passenger"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t.passenger.firstName}
          name={`passenger-${index}-firstName`}
          value={passenger.firstName || ''}
          onChange={(e) => handleChange('firstName', e.target.value)}
          onBlur={handleBlur}
          error={errors.firstName}
          required
        />

        <Input
          label={t.passenger.lastName}
          name={`passenger-${index}-lastName`}
          value={passenger.lastName || ''}
          onChange={(e) => handleChange('lastName', e.target.value)}
          onBlur={handleBlur}
          error={errors.lastName}
          required
        />

        <Input
          label={t.passenger.email}
          type="email"
          name={`passenger-${index}-email`}
          value={passenger.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={handleBlur}
          error={errors.email}
          placeholder="john@example.com"
          required
        />

        <Input
          label={t.passenger.phone}
          type="tel"
          name={`passenger-${index}-phone`}
          value={passenger.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          onBlur={handleBlur}
          error={errors.phone}
          placeholder="01xxxxxxxxx"
          required
        />

        <Input
          label={t.passenger.age}
          type="number"
          name={`passenger-${index}-age`}
          value={passenger.age || ''}
          onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
          onBlur={handleBlur}
          error={errors.age}
          placeholder="25"
          min={1}
          max={120}
          required
        />
      </div>
    </Card>
  );
}

interface PassengerListFormProps {
  passengers: Partial<Passenger>[];
  onChange: (passengers: Partial<Passenger>[]) => void;
  requiredCount: number;
}

export function PassengerListForm({
  passengers,
  onChange,
  requiredCount,
}: PassengerListFormProps) {
  const { t } = useLanguage();

  const handlePassengerChange = (index: number, passenger: Partial<Passenger>) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], ...passenger, id: `passenger-${index}` };
    onChange(updated);
  };

  const addPassenger = () => {
    if (passengers.length < requiredCount) {
      onChange([
        ...passengers,
        { id: `passenger-${passengers.length}`, firstName: '', lastName: '', email: '', phone: '', age: 0 },
      ]);
    }
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      const updated = passengers.filter((_, i) => i !== index);
      onChange(updated);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{t.booking.title}</h2>
        <p className="text-sm text-gray-500">
          {passengers.length} / {requiredCount} {t.summary.passengers}
        </p>
      </div>

      {passengers.map((passenger, index) => (
        <PassengerForm
          key={index}
          index={index}
          passenger={passenger}
          onChange={(p) => handlePassengerChange(index, p)}
          onRemove={() => removePassenger(index)}
          showRemove={passengers.length > 1}
        />
      ))}

      {passengers.length < requiredCount && (
        <Button variant="outline" onClick={addPassenger} className="w-full">
          {t.booking.addPassenger} ({passengers.length}/{requiredCount})
        </Button>
      )}
    </div>
  );
}
