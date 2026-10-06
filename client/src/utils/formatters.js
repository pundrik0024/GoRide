import { format, parseISO } from 'date-fns';

export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const localDateInputValue = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, 'dd MMM yyyy');
  } catch (error) {
    return dateString;
  }
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  try {
    // If it's a date object or full ISO string
    if (timeString.includes('T')) {
      return format(parseISO(timeString), 'hh:mm a');
    }
    // If it's just 'HH:mm' or 'HH:mm:ss'
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return format(date, 'hh:mm a');
  } catch (error) {
    return timeString;
  }
};

export const formatDuration = (minutes) => {
  if (!minutes) return '';
  if (typeof minutes === 'string' && minutes.includes('h')) return minutes; // Already formatted
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export const formatBookingId = (id) => {
  return id ? id.toUpperCase() : '';
};
